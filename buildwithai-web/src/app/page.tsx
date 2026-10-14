import Hero from '../app/components/Hero'
import Header from '../components/Header'
import BentoGrid from '../app/components/BentoGrid'
import Pricing from '../app/components/Pricing'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BentoGrid />
      <Pricing />
      <Footer />
    </main>
  )
}
