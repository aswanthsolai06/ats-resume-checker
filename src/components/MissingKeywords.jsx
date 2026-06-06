const priorityStyles = {
  high: 'border-rose-200 bg-rose-50 text-rose-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-700',
  low: 'border-slate-200 bg-slate-50 text-slate-600',
}

export default function MissingKeywords({ missing, matched }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Missing Keywords</h3>
          <p className="mt-1 text-sm text-slate-500">
            Keywords ATS systems commonly scan for in your field.
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
          <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
      </div>

      {matched.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Keywords Matched
          </p>
          <div className="flex flex-wrap gap-2">
            {matched.map((kw) => (
              <span
                key={kw}
                className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {missing.length > 0 ? (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Not Found in Resume
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.map(({ keyword, priority }) => (
              <span
                key={keyword}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium ${priorityStyles[priority]}`}
              >
                <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center">
          <p className="text-sm font-medium text-emerald-700">
            Great coverage — no major keyword gaps detected.
          </p>
        </div>
      )}
    </div>
  )
}
