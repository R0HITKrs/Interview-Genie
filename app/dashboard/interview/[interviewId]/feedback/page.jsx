// 'use client'
// import { db } from '@/Utils/db'
// import { UserAnswer } from '@/Utils/schema'
// import { eq } from 'drizzle-orm'
// import React, { use, useEffect, useState } from 'react'
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import { ChevronsUpDown,Loader2 } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'

// function feedback({params}) {

//     const router = useRouter();
//     const {interviewId} = use(params);
//     const [feedbackList, setFeedbackList] = useState([]);
//     const [loading, setLoading] = useState(false);


//     useEffect(()=>{
//         GetFeedback();
//     }, [])

//     const GetFeedback=async()=>{
//         const result = await db.select()
//         .from(UserAnswer)
//         .where(eq(UserAnswer.mockIdRef,interviewId))
//         .orderBy(UserAnswer.id);
//         setFeedbackList(result);  
//     };

//     const handleGoHome = () => {
//     setLoading(true); // show loader
//     router.replace('/dashboard');
//     };

    

//   return (
//     <div className='p-10'>
//         <h2 className='text-3xl font-bold text-green-400'>Congratulation</h2>
//         <h2 className='font-bold text-2xl'>Here are your interview feedback</h2>
//         {/* <h2 className='text-blue-400 text-lg my-3'>Overall rating:<strong>7/10</strong></h2> */}        
//         <h2 className='font-'>Find below the interview question and your answer and area of improvements.</h2>

//         {feedbackList&&feedbackList.map((item, index)=>(
//             <Collapsible key={index}>
//                 <CollapsibleTrigger className='flex items-center gap-2 p-2 bg-secondary rounded-lg my-2 text-left w-full'>
//                     Q.{index+1}- {item.question}
//                     <ChevronsUpDown height={30} width={30} />
//                 </CollapsibleTrigger>
//                 <CollapsibleContent>
//                     <div className='flex flex-col gap-2  border rounded-lg'>
//                         <h2 className='text-red-500 p-2'><strong>Rating:</strong>{item.rating}</h2>
//                         <h2 className='p-2 text-sm' ><strong>Your Answer: </strong>{item.userAns}</h2>
//                         <h2 className='p-2 text-sm text-green-300' ><strong>Improved Answer: </strong>{item.correctAns}</h2>
//                         <h2 className='p-2 text-sm text-blue-300' ><strong>Feedback: </strong>{item.feedback}</h2>
//                     </div>
//                 </CollapsibleContent>
//             </Collapsible>
//         ))}

//         <Button
//         className='mt-20 flex items-center gap-2'
//         onClick={handleGoHome}
//         disabled={loading}
//         >
//             {loading && <Loader2 className="animate-spin h-4 w-4" />}
//             {loading ? "Redirecting..." : "Home"}
//         </Button>

//     </div>
//   )
// }

// export default feedback


'use client'
import { db } from '@/Utils/db'
import { UserAnswer } from '@/Utils/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
  const router = useRouter();
  const { interviewId } = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true); // 👈 for collapsible

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setListLoading(true);
      const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);
      setFeedbackList(result);
    } finally {
      setListLoading(false);
    }
  };

  const handleGoHome = () => {
    setLoading(true); // show loader
    router.replace('/dashboard');
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-400">Congratulation</h2>
      <h2 className="font-bold text-2xl">Here are your interview feedback</h2>
      <h2 className="font-">
        Find below the interview question and your answer and area of improvements.
      </h2>

      {/* Loader for feedback list */}
      {listLoading ? (
        <div className="mt-5 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-full rounded-lg bg-gray-200 animate-pulse dark:bg-neutral-800"
            />
          ))}
        </div>
      ) : (
        feedbackList.map((item, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="flex items-center gap-2 p-2 bg-secondary rounded-lg my-2 text-left w-full">
              Q.{index + 1}- {item.question}
              <ChevronsUpDown height={30} width={30} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2 border rounded-lg">
                <h2 className="text-red-500 p-2">
                  <strong>Rating:</strong> {item.rating}
                </h2>
                <h2 className="p-2 text-sm">
                  <strong>Your Answer: </strong>
                  {item.userAns}
                </h2>
                <h2 className="p-2 text-sm text-green-300">
                  <strong>Improved Answer: </strong>
                  {item.correctAns}
                </h2>
                <h2 className="p-2 text-sm text-blue-300">
                  <strong>Feedback: </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      )}

      <Button
        className="mt-20 flex items-center gap-2"
        onClick={handleGoHome}
        disabled={loading}
      >
        {loading && <Loader2 className="animate-spin h-4 w-4" />}
        {loading ? "Redirecting..." : "Home"}
      </Button>
    </div>
  );
}

export default Feedback;
