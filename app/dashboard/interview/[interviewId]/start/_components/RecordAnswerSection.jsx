'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/Utils/GeminiAiModel'
import { db } from '@/Utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UserAnswer } from '@/Utils/schema'


function RecordAnswerSection({mockInterviewQuestion, activeQuestion, interviewData}) {

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>{
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    })
  }, [results])

  useEffect(()=>{
    if(!isRecording&&userAnswer?.length>10){
      UpdateUserAnswer();
    }
  }, [userAnswer])

  const StartAndStopRecording=async()=>{
    if(isRecording){
        stopSpeechToText();
    }else{
      startSpeechToText();
    }
  }

  const UpdateUserAnswer=async()=>{
    
    setLoading(true);

    const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestion]?.question+", User Answer:"+userAnswer+", Depends on the question and userAnswer for given interview answer provide a proper rating as well as feedback as area of improvement if needed"+"in just 3-5 line to inprove it in JSON fromat with rating field and feedback field";
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonRes = (result.response.text()).replace('```json', '').replace('```', '');
    const JsonFeedbackRes = JSON.parse(mockJsonRes);
  
    const resp = await db.insert(UserAnswer)
    .values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestion]?.question,
      correctAns: mockInterviewQuestion[activeQuestion]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackRes?.feedback,
      rating: JsonFeedbackRes?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    })
    if(resp){
      toast('Answer Recorded.')
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 my-16 '>
          <Image className='absolute' src={'/webcam.png'} alt='CamIcon' width={200} height={200} /> 
          <Webcam 
            mirrored={true}
            style={{
              height: 300,
              width: '100%',
              zIndex: 10,
            }}
          />
      </div>
      {/* <Button
        disabled={loading}
        onClick={StartAndStopRecording} 
        className='cursor-pointer mt-5' variant={'outline'} >
        {isRecording?
        <h2 className='flex gap-2 items-center justify-center text-red-600'><Mic />Stop Recording</h2>

        :'Record Answer'}
      </Button> */}
      <Button
        disabled={loading}
        onClick={StartAndStopRecording} 
        className="cursor-pointer mt-5" 
        variant={"outline"}
      >
        {loading ? (
          <h2 className="flex gap-2 items-center justify-center text-blue-600">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Saving Answer...
          </h2>
        ) : isRecording ? (
          <h2 className="flex gap-2 items-center justify-center text-red-600">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

    </div>
  )
}

export default RecordAnswerSection
