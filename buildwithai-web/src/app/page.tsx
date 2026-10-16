import Hero from '@/app/components/Hero'
import BentoGrid from '../app/components/BentoGrid'
import Pricing from '../app/components/Pricing'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BentoGrid />
      <Pricing />
    </main>
  )
}
