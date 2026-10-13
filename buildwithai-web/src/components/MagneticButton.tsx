'use client'

import { motion } from 'framer-motion'
import * as React from 'react'
import { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  className?: string
}

export function MagneticButton({
  children,
  href,
  className,
}: MagneticButtonProps) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [buttonPos, setButtonPos] = React.useState({ x: 0, y: 0 })
  const buttonRef = React.useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
  }

  React.useEffect(() => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const dx = mousePos.x - buttonPos.x - rect.width / 2
    const dy = mousePos.y - buttonPos.y - rect.height / 2
    const distance = Math.sqrt(dx ** 2 + dy ** 2)

    const maxDistance = 150
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance
      setButtonPos({
        x: buttonPos.x + dx * strength * 0.3,
        y: buttonPos.y + dy * strength * 0.3,
      })
    } else {
      setButtonPos({ x: 0, y: 0 })
    }
  }, [mousePos, buttonPos])

  return (
    <motion.a
      ref={buttonRef}
      whileHover={{ y: [-10, 10] }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3 
        font-medium transition-all duration-300 
        ${className ? className : ''}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setButtonPos({ x: 0, y: 0 })}
      href={href}
      target={href ? '_blank' : undefined}
    >
      <span className="relative">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-600 via-cyan-500 to-teal-600">
          {/* Moving gradient background */}
        </span>
        <span className="relative z-10">{children}</span>
      </span>
      <motion.rect
        x={buttonPos.x}
        y={buttonPos.y}
        width={200}
        height={50}
        fill="none"
        stroke={href ? 'currentColor' : 'none'}
      />
      {href ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="absolute -inset-1 transform-gpu"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ) : null}
    </motion.a>
  )
}
