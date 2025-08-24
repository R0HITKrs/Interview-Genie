'use client'

import { db } from '@/Utils/db'
import { MockInterview } from '@/Utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Itemcard from './Itemcard'
import { motion } from 'framer-motion'

function InterviewList() {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState()

  useEffect(() => {
    user && GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id))

    setInterviewList(result)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // fade-in from bottom
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-medium text-xl">Previous Interview Questions</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 items-stretch"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15, // delay each card
            },
          },
        }}
      >
        {interviewList &&
          interviewList.map((card, index) => (
            <motion.div
              className='h-full'
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Itemcard card={card} />
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  )
}

export default InterviewList
