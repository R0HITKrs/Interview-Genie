"use client"

import { Button } from '@/components/ui/button'
import { db } from '@/Utils/db'
import { MockInterview } from '@/Utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, use, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {
    const { interviewId } = use(params);
    const [interviewData, setInterviewData] = useState();
    const [webcamEnable, setWebCamEnable] = useState(false);

    useEffect(()=>{
        GetInterviewDetails();
    },[])

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
        setInterviewData(result[0]);
    }
  return (
    <div className='my-10'>
        <h2 className='text-2xl'>Let's get started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

            
            <div className='flex flex-col my-5 gap-5'>
                <div className='flex flex-col gap-5 p-5 rounded-lg border'>
                    <h2><strong>Job Role/Position: </strong>{interviewData?.jobPosition}</h2>
                    <h2><strong>Techstack: </strong>{interviewData?.jobDesc}</h2>
                    <h2><strong>Year of experience: </strong>{interviewData?.jobExperience}</h2>
                </div>
                <div className='p-5 border rounded-lg border-amber-300 bg-amber-100'>
                    <h2 className='flex gap-2 text-amber-500 items-center'><Lightbulb /> <strong>Information</strong></h2>
                    <h2 className='mt-3 text-amber-400'>Your interview is about to begin!
                        Please ensure you are in a quiet environment with a stable internet connection.
                        Keep your camera and microphone ready, and have any required documents or notes accessible.
                        Click Start Interview when you’re ready to proceed."
                    </h2>
                </div>
            </div>
            <div className=''>
                {webcamEnable? 
                    <Webcam 
                    mirrored={true}
                    onUserMedia={()=>setWebCamEnable(true)}
                    onUserMediaError={()=>setWebCamEnable(false)}
                    style={{
                        height: 300,
                        width: 300
                    }}
                    />
                    :
                    <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                }
                <Button onClick={()=>setWebCamEnable(true)} className='w-full bg-gray-400 hover:bg-gray-200 hover:text-black'>Enable Webcam and Microphone</Button>
            </div>
        </div>
        <div className='flex items-end justify-end'>
            <Link href={'/dashboard/interview/'+interviewId+'/start'}>
                <Button className='cursor-pointer p-5 sm:w-auto md:w-30 lg:w-34  bg-blue-600 hover:bg-secondary hover:text-blue-500 border hover:border-blue-500'>Start Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview