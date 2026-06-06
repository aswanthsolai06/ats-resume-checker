import AnimatedIcon from './AnimatedIcon'

export default function Hero({ onAnalyzeClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Free ATS Resume Checker
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Know how your resume{' '}
              <span className="text-brand-600">ranks</span>{' '}
              before you apply
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600 lg:mx-0 mx-auto text-balance">
              Paste your resume and get an instant ATS compatibility score,
              skill suggestions, and missing keywords — all processed locally
              in your browser.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={onAnalyzeClick}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-700 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                Analyze Resume
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <p className="text-sm text-slate-500">
                No signup · No API keys · 100% private
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-brand-100 pt-8 sm:gap-8">
              {[
                { value: '6', label: 'Score factors' },
                { value: '50+', label: 'Keywords checked' },
                { value: '0ms', label: 'Server delay' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-brand-700 sm:text-3xl">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Animated icon */}
          <div className="flex justify-center lg:justify-end">
            <AnimatedIcon />
          </div>
        </div>
      </div>
    </section>
  )
}
