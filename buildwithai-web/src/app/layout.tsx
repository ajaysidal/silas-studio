/* ==========================================================================
    Root Layout - Premium Design System Integration
    Integrates:
    - ThemeProvider for dark/light mode with persistence
    - Header with glassmorphism and mobile responsiveness
    - Footer with professional layout
    - SmoothScrollProvider for improved UX
    - Page transitions
    ========================================================================== */
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ui/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/BackToTop';
import SilasChat from '@/components/SilasChat';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata = {
  title: 'Build With AI | Sovereign AI Infrastructure',
  description: 'Enterprise-grade, self-hosted AI operations and headless infrastructure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="flex-grow min-h-screen">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            {process.env.NEXT_PUBLIC_ENABLE_SILAS_CHAT === "true" && <SilasChat />}
            <BackToTop />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}