import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function Itemcard({card}) {

    const router = useRouter();
    const  onStart=()=>{
        router.push('/dashboard/interview/'+card.mockId);
    }
    const onFeedback=()=>{
        router.push('/dashboard/interview/'+card.mockId+"/feedback");
    }

  return (
    <div className='border rounded-lg flex flex-col justify-between h-full shadow-lg p-5 bg-secondary'>
        <div className='flex flex-col'>
            <h2 className='font-bold text-primary'>Job Role/Position: {card?.jobPosition}</h2>        
            <h2 className='font-sm text-gray-600' >Year of Experience: {card?.jobExperience}</h2>        
            <h2 className='font-sm text-gray-600' >Date: {card?.createdAt}</h2>
        </div>
        <div className='flex justify-between w-full gap-5 mt-3'>
            <Button onClick={onFeedback} className='flex-1 bg-secondary text-black cursor-pointer hover:bg-white'>Feedback</Button>
            <Button onClick={onStart} className='flex-1 cursor-pointer hover:bg-gray-600'>Start</Button>
        </div>
    </div>
  )
}

export default Itemcard