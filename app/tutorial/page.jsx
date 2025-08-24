'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TutorialPage() {
  const steps = [
    {
      title: "Step 1: Select Job Role",
      description: "Choose the job role or position you’re preparing for (e.g., Software Engineer, Data Analyst, etc.). This helps tailor interview questions to your role."
    },
    {
      title: "Step 2: Set Your Experience Level",
      description: "Specify your years of experience. The system adjusts the complexity of questions based on your level."
    },
    {
      title: "Step 3: Start Mock Interview",
      description: "Click 'Start' to begin. You will be asked a set of real-world interview questions one by one."
    },
    {
      title: "Step 4: Record Your Answers",
      description: "Use your microphone to answer questions. Your responses will be recorded and analyzed."
    },
    {
      title: "Step 5: Get Feedback Instantly",
      description: "After completing the interview, you’ll receive feedback with strengths, weaknesses, and improvement tips."
    },
    {
      title: "Step 6: Review & Improve",
      description: "Revisit your answers, go through AI-generated feedback, and track your progress over time."
    }
  ]

  return (
    <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">How It Works</h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Follow this step-by-step guide to use <strong>Interview AI</strong> and prepare effectively for your next interview.
        </p>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="border rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={'/dashboard'}>
            <Button className="px-6 py-3 text-lg cursor-pointer">
              Start Practicing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
