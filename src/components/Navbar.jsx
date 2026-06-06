export default function Navbar({ onAnalyzeClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shadow-sm">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-display text-xl font-semibold text-slate-800">
            Resume<span className="text-brand-600">Lens</span>
          </span>
        </a>

        <button
          type="button"
          onClick={onAnalyzeClick}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 active:scale-[0.98]"
        >
          Analyze Resume
        </button>
      </nav>
    </header>
  )
}
