'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface MetricBarProps {
  label: string
  value: number
  color: string // Expecting Tailwind classes like 'bg-cyan-400'
}

export default function MetricBar({ label, value, color }: MetricBarProps) {
  return (
    // Reduced mb-6 to mb-4 for a tighter, more moderate layout
    <div className='mb-4 last:mb-0 group'>
      <div className='flex justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] mb-1.5'>
        {/* Label gets a subtle hover effect */}
        <span className='text-slate-500 group-hover:text-slate-300 transition-colors duration-300'>
          {label}
        </span>
        <span className='text-white tabular-nums'>{value}%</span>
      </div>

      {/* Track: Slightly more visible (bg-white/10) to define the boundary better */}
      <div className='h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm'>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ 
            duration: 1.2, 
            delay: 0.2, 
            ease: [0.22, 1, 0.36, 1] // Premium 'Expo' ease
          }}
        //   {/* Added a dynamic shadow that matches the bar color for a "glow" effect */}
          className={`h-full ${color} relative shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
        >
          {/* Subtle gloss overlay for that "glassy" premium look */}
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent' />
        </motion.div>
      </div>
    </div>
  )
}