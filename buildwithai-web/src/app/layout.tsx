import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
})

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  variable: '--font-orbitron',
  weight: ['500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Build With AI | Sovereign AI Infrastructure',
  description: 'Enterprise-grade, self-hosted AI operations and headless infrastructure.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} bg-slate-950 text-slate-100 font-sans antialiased dark`}
    >
      <body className="min-h-full">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
