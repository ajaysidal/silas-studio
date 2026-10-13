import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

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
      <body className="min-h-full">{children}</body>
    </html>
  )
}
