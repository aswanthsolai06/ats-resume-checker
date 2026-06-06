export default function SkillSuggestions({ present, suggestions, detectedRole }) {
  const roleLabels = {
    software: 'Software Development',
    data: 'Data & Analytics',
    design: 'Design & UX',
    business: 'Business & Management',
    general: 'General Professional',
  }

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Skill Suggestions</h3>
          <p className="mt-1 text-sm text-slate-500">
            Detected focus:{' '}
            <span className="font-medium text-brand-600">
              {roleLabels[detectedRole] || roleLabels.general}
            </span>
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
          <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>

      {present.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Skills Found
          </p>
          <div className="flex flex-wrap gap-2">
            {present.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recommended to Add
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {suggestions.map((skill) => (
              <div
                key={skill.name}
                className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/30 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{skill.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      skill.relevance === 'high'
                        ? 'bg-brand-100 text-brand-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {skill.relevance}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500">{skill.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
