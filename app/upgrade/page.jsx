'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function UpgradePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-white px-6">
      
      {/* Animated Logo Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="w-24 h-24 mb-6 rounded-full bg-white/20 flex items-center justify-center shadow-xl"
      >
        <span className="text-3xl font-bold">⚡</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl text-gray-600 font-extrabold tracking-wide text-center"
      >
        Coming Soon
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-lg text-gray-600 text-center max-w-xl"
      >
        We’re working on something amazing!  
        Stay tuned for premium features and upgrades.
      </motion.p>

      {/* Animated Dots */}
      <motion.div
        className="flex gap-2 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="w-3 h-3 rounded-full bg-black"
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              delay: dot * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
