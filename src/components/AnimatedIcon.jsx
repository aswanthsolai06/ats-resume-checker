export default function AnimatedIcon() {
  return (
    <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56">
      {/* Glow ring */}
      <div className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-200/40 blur-2xl" />

      {/* Main document */}
      <div className="animate-float relative z-10 mx-auto h-full w-36 sm:w-40">
        <div className="relative h-full w-full rounded-2xl border border-brand-200 bg-white shadow-card">
          {/* Document header */}
          <div className="rounded-t-2xl bg-brand-600 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-brand-300" />
              <div className="h-2 w-2 rounded-full bg-brand-200" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Document lines */}
          <div className="space-y-3 p-4 pt-5">
            <div className="h-2.5 w-3/4 rounded-full bg-brand-100" />
            <div className="h-2 w-full rounded-full bg-slate-100" />
            <div className="h-2 w-5/6 rounded-full bg-slate-100" />
            <div className="h-2 w-2/3 rounded-full bg-slate-100" />
            <div className="mt-4 h-2 w-full rounded-full bg-brand-50" />
            <div className="h-2 w-4/5 rounded-full bg-slate-100" />
            <div className="h-2 w-3/5 rounded-full bg-slate-100" />
          </div>

          {/* Scan line */}
          <div className="pointer-events-none absolute inset-x-2 overflow-hidden rounded-b-2xl" style={{ top: 0, bottom: 0 }}>
            <div className="animate-scan absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
          </div>
        </div>

        {/* Magnifier / analyzer badge */}
        <div className="absolute -bottom-2 -right-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white bg-brand-600 shadow-lg sm:-right-6 sm:h-20 sm:w-20">
          <svg className="h-8 w-8 text-white sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M16 16l4 4" />
            <path d="M8 11h6M11 8v6" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute left-4 top-8 h-2 w-2 animate-float rounded-full bg-brand-400/60" style={{ animationDelay: '0.5s' }} />
      <div className="absolute right-6 top-16 h-1.5 w-1.5 animate-float rounded-full bg-brand-300/80" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-12 left-8 h-1.5 w-1.5 animate-float rounded-full bg-brand-500/50" style={{ animationDelay: '1.5s' }} />
    </div>
  )
}
