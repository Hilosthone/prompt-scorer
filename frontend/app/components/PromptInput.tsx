'use client'

import React from 'react'
import { RefreshCcw } from 'lucide-react'

interface PromptInputProps {
  value: string
  onChange: (val: string) => void
  onAnalyze: () => void
  loading: boolean
}

export default function PromptInput({
  value,
  onChange,
  onAnalyze,
  loading,
}: PromptInputProps) {
  // Simple complexity heuristic
  const words = value.trim() ? value.trim().split(/\s+/).length : 0
  const complexity = Math.min(100, Math.round((value.length / 500) * 100))

  return (
    // Reduced padding to p-6 and border-radius to 1.5rem for a precision feel
    <div className='bg-[#0a0f18] border border-white/10 rounded-[1.5rem] p-6 shadow-2xl relative backdrop-blur-sm'>
      <textarea
        className='w-full h-[380px] bg-transparent border-none outline-none text-lg font-medium text-slate-200 placeholder:text-slate-800 resize-none font-mono selection:bg-cyan-500/20 leading-relaxed'
        placeholder='Paste your raw AI prompt here for neural evaluation...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Tightened footer section */}
      <div className='flex flex-col md:flex-row justify-between items-center mt-5 pt-5 border-t border-white/10 gap-4'>
        <div className='flex gap-8'>
          <div className='flex flex-col'>
            <span className='text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1'>
              Complexity
            </span>
            {/* Brighter Cyan-400 for the percentage */}
            <span className='text-xs font-black text-cyan-400 tabular-nums'>
              {complexity}%
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1'>
              Word Count
            </span>
            <span className='text-xs font-black text-white tabular-nums'>
              {words}
            </span>
          </div>
        </div>

        <button
          onClick={onAnalyze}
          disabled={loading || !value.trim()}
          /* Matches the main page button: Cyan-400, XL rounded, black text */
          className='w-full md:w-auto bg-cyan-400 hover:bg-white disabled:bg-slate-800 disabled:text-slate-600 text-black px-10 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-md shadow-cyan-950/20 active:scale-95 flex items-center justify-center gap-2'
        >
          {loading ? (
            <>
              <RefreshCcw className='w-3.5 h-3.5 animate-spin' />
              <span>Analyzing Neural Patterns</span>
            </>
          ) : (
            'Run Diagnostics'
          )}
        </button>
      </div>
    </div>
  )
}
