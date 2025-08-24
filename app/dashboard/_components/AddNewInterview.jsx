"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/Utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import {  useUser } from '@clerk/nextjs';
import { db } from '@/Utils/db';
import { MockInterview } from '@/Utils/schema';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useRouter } from 'next/navigation';



function AddNewInterview() {
    const [opendialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonRes, setJsonRes] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();
        
        const InputPrompt = "Job Position: "+jobPosition+" Job Desciption: "+jobDesc+" Year of Experience: "+jobExperience+". Depends on this job description and year of experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question with answer in JSON format. Give question and answer field in JSON"; 
    
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonRes = (result.response.text()).replace('```json', '').replace('```', '');
        setJsonRes(MockJsonRes);


        if(MockJsonRes){
            const resp = await db.insert(MockInterview).values({
                mockId:uuidv4(),
                jsonMockResp: MockJsonRes,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({mockId:MockInterview.mockId});
    

            if(resp){
                await router.push('/dashboard/interview/'+resp[0]?.mockId);   
                setOpenDialog(false);
            }
        }else{
            console.log("Error");
            setLoading(false);
        }
    }

  return (
    <div>
        <div 
            className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all'
            onClick={()=>{setOpenDialog(true)}}    
        >
            <h2 className='text-lg'>+ Add New</h2>
        </div>
        <Dialog open={opendialog}>
            <DialogContent className='max-w-xl'>
                <DialogHeader>
                <DialogTitle className='font-bold text-2xl'>Tell us more about your interview.</DialogTitle>
                <DialogDescription>
                    <form onSubmit={onSubmit}>
                        <div className=''>
                            <h2>Add details about your job position, job description and year of experience.</h2>
                            <div className=' mt-5 my-2 flex flex-col gap-1'>
                                <label>Job Description</label>
                                <Input placeholder="Eg. Full stack Developer" required 
                                    onChange={(event)=>setJobPosition(event.target.value)}
                                />
                                <label>Job Role</label>
                                <Textarea placeholder="Tectstack i.e ReactJS, NodeJS, ExpressJS, MongoDB" required
                                    onChange={(event)=>setJobDesc(event.target.value)}
                                />
                                <label>Year of Experince</label>
                                <Input placeholder="Your Experience" type="number" max="60" required
                                    onChange={(event)=>setJobExperience(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='p-5 flex gap-5 items-end justify-end'>
                            <Button className='cursor-pointer' type='button' onClick={()=>{setOpenDialog(false)}} variant={'ghost'}>Cancel</Button>
                            <Button 
                                className='cursor-pointer'
                                type='submit'
                                disabled={loading} 
                            >
                                {loading?
                                <><LoaderCircle className='animate-spin' />Generating</>
                                 :"Start Interview"
                                }
                                
                            </Button>
                        </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewInterview