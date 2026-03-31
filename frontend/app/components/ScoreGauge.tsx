'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ScoreGauge({ score }: { score: number }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className='relative flex items-center justify-center w-56 h-56'>
      <svg className='w-full h-full transform -rotate-90'>
        {/* Background Track */}
        <circle
          cx='112'
          cy='112'
          r={radius}
          stroke='currentColor'
          strokeWidth='12'
          fill='transparent'
          className='text-white/5'
        />
        {/* Animated Progress */}
        <motion.circle
          cx='112'
          cy='112'
          r={radius}
          stroke='currentColor'
          strokeWidth='12'
          fill='transparent'
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className='text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
          strokeLinecap='round'
        />
      </svg>

      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-6xl font-black text-white italic tracking-tighter'
        >
          {score}
        </motion.span>
        <span className='text-[10px] font-black text-cyan-500/50 uppercase tracking-[0.3em]'>
          Quality index
        </span>
      </div>
    </div>
  )
}
