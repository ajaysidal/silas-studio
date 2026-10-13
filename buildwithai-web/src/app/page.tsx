import Hero from '../app/components/Hero'
import Header from '../components/Header'
import BentoGrid from '../app/components/BentoGrid'
import Pricing from '../app/components/Pricing'
import { MagneticButton } from '../components/MagneticButton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BentoGrid />
      <Pricing />
      <div className="py-16 text-center">
        <MagneticButton href="https://silas-studio.buildwithai.digital">
          Try Silas Studio Free
        </MagneticButton>
      </div>
    </main>
  )
}
