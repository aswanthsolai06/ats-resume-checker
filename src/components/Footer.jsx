export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-display text-lg font-semibold text-slate-800">
            Resume<span className="text-brand-600">Lens</span>
          </span>
        </div>

        <p className="text-center text-sm text-slate-500">
          Built as a student portfolio project · Heuristic analysis only · No data stored
        </p>

        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
