'use client'

import { db } from '@/Utils/db';
import { MockInterview } from '@/Utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, use } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';


function StartInterview({params}) {

    const { interviewId } = use(params);
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [redirecting ,setRedirecting] = useState(false);

    useEffect(()=>{
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);        
        setMockInterviewQuestion(jsonMockResp.interviewQuestions);
        setInterviewData(result[0]);
    }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            
            {/* Questions */}
                <QuestionsSection
                    activeQuestion = {activeQuestion} 
                    mockInterviewQuestion={mockInterviewQuestion} />
            
            {/* {video}  */}
            <RecordAnswerSection 
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestion = {activeQuestion} 
                interviewData = {interviewData}
            />
        </div>
    <div className='flex justify-end gap-6'>
        {activeQuestion>0&& <Button className='cursor-pointer' onClick={()=>{setActiveQuestion(activeQuestion-1)}}>Previous Question</Button>}
        {activeQuestion != mockInterviewQuestion?.length-1&& <Button className='cursor-pointer' onClick={()=>{setActiveQuestion(activeQuestion+1)}}>Next Question</Button>}
        {activeQuestion == mockInterviewQuestion?.length-1&& 
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button className='cursor-pointer' onClick={setRedirecting(true)}>
                    {redirecting ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Redirecting...
                        </span>
                        ) : (
                        "Finish Interview"
                    )}
                </Button>
            </Link>
        }
    </div>
    </div>
  )
}

export default StartInterview