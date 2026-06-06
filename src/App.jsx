import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Analyzer from './components/Analyzer'
import Footer from './components/Footer'

function scrollToAnalyzer() {
  document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAnalyzeClick={scrollToAnalyzer} />
      <main className="flex-1">
        <Hero onAnalyzeClick={scrollToAnalyzer} />
        <Analyzer />
      </main>
      <Footer />
    </div>
  )
}
