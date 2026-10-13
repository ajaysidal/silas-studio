'use client'

import { motion } from 'framer-motion'

export default function PageTransition({
  children,
}: { children: React.ReactNode }) {
  return (
    <motion.div
      exit="exit"
      exitTransition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
