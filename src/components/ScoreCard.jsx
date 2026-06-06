import { useEffect, useState } from 'react'

function ScoreRing({ score, animate }) {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative h-36 w-36 sm:h-40 sm:w-40">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#dbeafe"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? offset : circumference}
          className="transition-all duration-[1.2s] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">
          {score}
        </span>
        <span className="text-sm font-medium text-slate-500">/ 100</span>
      </div>
    </div>
  )
}

export default function ScoreCard({ score, scoreLabel, breakdown, tips }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="flex flex-col items-center">
          <ScoreRing score={score} animate={animate} />
          <span className={`mt-3 rounded-full px-4 py-1 text-sm font-semibold ${scoreLabel.bg} ${scoreLabel.color}`}>
            {scoreLabel.label}
          </span>
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-lg font-semibold text-slate-900">ATS Compatibility Score</h3>
          <p className="mt-1 text-sm text-slate-500">
            Based on structure, keywords, formatting, and content quality.
          </p>

          <div className="mt-5 space-y-3">
            {breakdown.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-medium text-slate-800">
                    {item.score}/{item.max}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-50">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-1000 ease-out"
                    style={{ width: animate ? `${(item.score / item.max) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {tips.length > 0 && (
        <div className="mt-6 rounded-xl bg-brand-50/60 p-4 sm:p-5">
          <h4 className="text-sm font-semibold text-brand-800">Quick Tips</h4>
          <ul className="mt-2 space-y-1.5">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-brand-900/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
