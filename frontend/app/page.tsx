'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Zap, Activity, RefreshCcw } from 'lucide-react'
import ScoreGauge from './components/ScoreGauge'
import MetricBar from './components/MetricBar'
import FeedbackPanel from './components/FeedbackPanel'

export default function PromptScorer() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>(null)

  const analyzePrompt = async () => {
    if (!prompt.trim()) return
    setLoading(true)

    try {
      const res = await fetch(
        'https://prompt-scorer-backend.onrender.com/score',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: prompt }),
        },
      )

      if (!res.ok) throw new Error('Diagnostics failed')

      const data = await res.json()

      // Normalize backend response to match frontend component props
      setReport({
        overall_score: data.overall_score,
        explanation: data.categories.clarity.explanation,
        metrics: {
          clarity: data.categories.clarity.score,
          specificity: data.categories.specificity.score,
          structure: data.categories.structure.score,
        },
        suggestions: [
          data.improved_prompt,
          'Consider adding more contextual constraints.',
          'Refine the persona for better output accuracy.',
        ],
      })
    } catch (error) {
      console.error('Neural Engine Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Define dynamic color based on score for brighter accents
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400' // Bright Green
    if (score >= 50) return 'text-amber-300' // Bright Yellow/Amber
    return 'text-red-400' // Bright Red
  }

  return (
    // min-h-screen is good, but let's reduce padding and max-w for compactness
    <main className='min-h-screen bg-[#020406] text-slate-200 p-6 md:p-10 font-sans selection:bg-cyan-500/30'>
      {/* Reduced max-width to 6xl for a smaller, premium desktop footprint */}
      <div className='max-w-6xl mx-auto'>
        
        {/* Header: Reduced margins, tightened text sizing */}
        <header className='flex justify-between items-center mb-8 border-b border-white/10 pb-6'>
          <div>
            {/* Brighter text-cyan-400, tighter tracking */}
            <div className='flex items-center gap-2 text-cyan-400 mb-2'>
              <ShieldCheck className='w-4 h-4' />
              <span className='text-[9px] font-black uppercase tracking-[0.5em]'>
                Neural validator v2.1
              </span>
            </div>
            {/* Reduced h1 size to text-4xl, much tighter leading */}
            <h1 className='text-4xl font-black text-white italic tracking-tighter uppercase leading-none'>
              Prompt<span className='text-cyan-400'>_</span>Scorer
            </h1>
          </div>
          <Activity
            className={`w-10 h-10 transition-colors ${loading ? 'text-cyan-400 animate-pulse' : 'text-slate-700'}`}
          />
        </header>

        {/* Layout Grid: Tightened gap to 8 */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start'>
          
          {/* LEFT: Input Area */}
          <section className='md:col-span-7 h-full'>
            {/* Reduced padding to p-6, border-radius to 1.5rem for precision feel */}
            <div className='bg-[#0a0f18] border border-white/10 rounded-[1.5rem] p-6 shadow-xl relative backdrop-blur-sm h-full flex flex-col'>
              <textarea
                className='w-full flex-grow bg-transparent border-none outline-none text-lg font-medium placeholder:text-slate-700 resize-none font-mono text-white leading-relaxed'
                placeholder='Paste your raw AI prompt here for neural evaluation...'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ minHeight: '380px' }} // Controlled height for better layout management
              />
              
              {/* Tightened controls area */}
              <div className='flex justify-between items-center mt-5 pt-5 border-t border-white/10'>
                <div className='text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2'>
                  {/* Ping color brightened */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${prompt.length > 0 ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`}
                  />
                  Live analysis buffer // {prompt.length} chars
                </div>
                <button
                  onClick={analyzePrompt}
                  disabled={loading || !prompt.trim()}

                  className='bg-cyan-400 hover:bg-white disabled:bg-slate-800 disabled:text-slate-600 text-black px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 active:scale-95 shadow-md shadow-cyan-950/20'
                >
                  {loading ? (
                    <RefreshCcw className='w-4 h-4 animate-spin' />
                  ) : (
                    'Run Diagnostics'
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT: Analysis Results */}
          <section className='md:col-span-5 space-y-5 h-full'>
            <AnimatePresence mode='wait'>
              {report ? (
                <motion.div
                  key='results'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className='space-y-5'
                >
                  {/* Main score: Tightened padding, rounded-1.5rem */}
                  <div className='bg-[#0a0f18]/60 border border-white/10 rounded-[1.5rem] p-6 flex flex-col items-center shadow-lg'>
                    {/* ScoreGauge needs the brighter colors internally too */}
                    <ScoreGauge score={report.overall_score} />
                    
                    {/* Explanation text: Brighter text-slate-300, smaller top margin */}
                    <p className='mt-6 text-center text-slate-300 text-sm leading-relaxed italic border-t border-white/10 pt-5 w-full'>
                      "{report.explanation}"
                    </p>
                  </div>

                  {/* Metrics Panel: Tightened internal spacing */}
                  <div className='bg-[#0a0f18] border border-white/10 rounded-[1.5rem] p-6'>
                    <h3 className='text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6'>
                      Key performance metrics
                    </h3>
                    {/* Using bright color palette for bars */}
                    <MetricBar
                      label='Clarity'
                      value={report.metrics.clarity}
                      color='bg-cyan-400' 
                    />
                    <MetricBar
                      label='Specificity'
                      value={report.metrics.specificity}
                      color='bg-emerald-400'
                    />
                    <MetricBar
                      label='Structure'
                      value={report.metrics.structure}
                      color='bg-violet-400'
                    />
                  </div>

                  {/* Feedback: Tightened padding */}
                  <FeedbackPanel suggestions={report.suggestions} />
                </motion.div>
              ) : (
                <motion.div
                  key='empty'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  // {/* Reduced min-height for empty state */}
                  className='h-full min-h-[350px] flex flex-col items-center justify-center opacity-30 border-2 border-dashed border-white/10 rounded-[1.5rem] bg-[#0a0f18]/20'
                >
                  <Zap className='w-10 h-10 mb-4 text-slate-600' />
                  <span className='text-[11px] font-black uppercase tracking-[0.4em] text-center leading-loose text-slate-500'>
                    Awaiting Input Data<br/>For Neural Scoring
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  )
}