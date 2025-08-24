import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestion}) {
  
  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }else{
      alert("Sorry, Your browser doesn't suppport text to speech")
    }
  }

  return mockInterviewQuestion&&(
    <div className='my-10 p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-4'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question, index)=>(
                // <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestion===index&&'shadow-lg text-blue-800'}`} key={index}>Question #{index+1}</h2>
                <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                    activeQuestion === index ? 'bg-white shadow-lg font-semibold text-blue-400' : ''
                  }`} key={index}>Question #{index+1}</h2>
            ))}

        </div>
        <h2 className='my-5 text-md md:text-lg '>{mockInterviewQuestion[activeQuestion]?.question}</h2>
        {/* <Volume2 onClick={()=>textToSpeach({mockInterviewQuestion[activeQuestion]?.question})} /> */}
        <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeach(mockInterviewQuestion[activeQuestion]?.question)
        }
      />
        <div className='border rounded-lg p-5 bg-blue-100 mt-5'>
          <h2 className='flex gap-2 items-center text-blue-600'>
            <Lightbulb/>
            <strong>Note</strong>
          </h2>
          <h2 className='text-sm text-blue-400 my-5'>When you are ready, click on the “Record Answer” button to begin speaking your response. Make sure you are in a quiet place, your microphone is working properly, and you have gathered your thoughts. Speak clearly and confidently — you’ll have a chance to review your answer after recording.</h2>
        </div>
    </div>
  )
}

export default QuestionsSection