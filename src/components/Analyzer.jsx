import { useState } from 'react'
import { analyzeResume } from '../utils/resumeAnalyzer'
import ScoreCard from './ScoreCard'
import SkillSuggestions from './SkillSuggestions'
import MissingKeywords from './MissingKeywords'

const SAMPLE_RESUME = `Alex Johnson
alex.johnson@email.com | (555) 234-5678 | linkedin.com/in/alexjohnson

SUMMARY
Computer Science student with hands-on experience building web applications.
Passionate about creating clean, user-focused software.

EDUCATION
B.S. Computer Science — State University (Expected 2026)
GPA: 3.7/4.0

SKILLS
JavaScript, React, Python, Git, HTML, CSS, SQL, Node.js

EXPERIENCE
Software Engineering Intern — TechCorp (Summer 2025)
- Developed a React dashboard used by 200+ internal users
- Improved page load time by 35% through code splitting
- Collaborated with a team of 4 engineers in an Agile environment

PROJECTS
Portfolio Website — Built with React and Tailwind CSS
- Deployed on Vercel with CI/CD pipeline
- Implemented responsive design for mobile and desktop`

export default function Analyzer() {
  const [resumeText, setResumeText] = useState('')
  const [results, setResults] = useState(null)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  function handleAnalyze() {
    const analysis = analyzeResume(resumeText)
    setResults(analysis)
    setHasAnalyzed(true)
  }

  function handleClear() {
    setResumeText('')
    setResults(null)
    setHasAnalyzed(false)
  }

  function handleLoadSample() {
    setResumeText(SAMPLE_RESUME)
    setResults(null)
    setHasAnalyzed(false)
  }

  const charCount = resumeText.length
  const wordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0

  return (
    <section id="analyzer" className="scroll-mt-20 bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Resume Analyzer
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Paste your resume text below. Analysis runs entirely in your browser —
            nothing is sent to a server.
          </p>
        </div>

        {/* Input card */}
        <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card sm:p-6">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="resume-input" className="text-sm font-semibold text-slate-700">
              Resume Text
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
              >
                Load sample
              </button>
              <span className="text-xs text-slate-400">
                {wordCount} words · {charCount} chars
              </span>
            </div>
          </div>

          <textarea
            id="resume-input"
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value)
              if (hasAnalyzed) setHasAnalyzed(false)
            }}
            placeholder="Paste your full resume here — include contact info, experience, education, skills, and projects..."
            rows={12}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!resumeText.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-brand-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-600 disabled:hover:shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Run Analysis
            </button>

            {resumeText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {hasAnalyzed && !results && (
          <div className="mt-8 animate-fade-up rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="text-sm font-medium text-amber-800">
              Please enter some resume text to analyze.
            </p>
          </div>
        )}

        {results && (
          <div className="mt-8 space-y-6">
            <div className="animate-fade-up">
              <ScoreCard
                score={results.score}
                scoreLabel={results.scoreLabel}
                breakdown={results.breakdown}
                tips={results.tips}
              />
            </div>

            <div className="animate-fade-up grid gap-6 lg:grid-cols-2" style={{ animationDelay: '0.15s' }}>
              <SkillSuggestions
                present={results.present}
                suggestions={results.suggestions}
                detectedRole={results.detectedRole}
              />
              <MissingKeywords
                missing={results.keywords.missing}
                matched={results.keywords.matched}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
