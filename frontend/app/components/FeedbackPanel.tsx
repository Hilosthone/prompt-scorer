'use client'

import React from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FeedbackPanel({
  suggestions,
}: {
  suggestions: string[]
}) {
  return (
    <div className='bg-[#0a0f18]/80 border border-white/10 rounded-[1.5rem] p-6 backdrop-blur-md shadow-lg shadow-black/20'>
      {/* Header Area: Brighter cyan and tighter tracking */}
      <div className='flex items-center gap-2 mb-5'>
        <AlertCircle className='w-3.5 h-3.5 text-cyan-400' />
        <h3 className='text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]'>
          Neural Optimization Path
        </h3>
      </div>

      {/* List Area: Reduced spacing for a more compact desktop view */}
      <ul className='space-y-3.5'>
        {suggestions.map((tip, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='flex gap-3 items-start group'
          >
            {/* Brighter icon colors (Cyan-400) */}
            <CheckCircle2 className='w-4 h-4 text-cyan-900 group-hover:text-cyan-400 transition-all duration-300 shrink-0 mt-0.5' />

            {/* Brighter text hover state */}
            <p className='text-[13px] text-slate-400 group-hover:text-white transition-colors duration-300 leading-snug font-medium'>
              {tip}
            </p>
          </motion.li>
        ))}
      </ul>

      {/* Subtle bottom detail to fill space and look professional */}
      <div className='mt-6 pt-4 border-t border-white/5 flex justify-end'>
        <span className='text-[8px] font-bold text-slate-700 uppercase tracking-widest'>
          Refinement Protocol Active
        </span>
      </div>
    </div>
  )
}
