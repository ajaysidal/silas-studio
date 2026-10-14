"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  maxDistance?: number;
}

export function MagneticButton({
  children,
  href,
  className,
  strength = 0.3,
  maxDistance = 150,
}: MagneticButtonProps) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [buttonPos, setButtonPos] = React.useState({ x: 0, y: 0 });
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (href) {
      if (href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
  };

  React.useEffect(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dx = mousePos.x - buttonPos.x - rect.width / 2;
    const dy = mousePos.y - buttonPos.y - rect.height / 2;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (distance < maxDistance) {
      const strengthFactor = (maxDistance - distance) / maxDistance;
      setButtonPos({
        x: buttonPos.x + dx * strengthFactor * strength,
        y: buttonPos.y + dy * strengthFactor * strength,
      });
    } else {
      setButtonPos({ x: 0, y: 0 });
    }
  }, [mousePos, buttonPos, maxDistance, strength]);

  const hasMoved = buttonPos.x !== 0 || buttonPos.y !== 0;

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5
    font-medium text-base transition-all duration-300
    overflow-visible cursor-pointer
  `;

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setButtonPos({ x: 0, y: 0 })}
      onClick={handleClick}
      whileHover={{ scale: hasMoved ? 1 : 1.02, y: hasMoved ? 0 : -2 }}
      whileTap={{ scale: 0.96 }}
      className={cn(baseStyles, className)}
      style={{
        transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
      } as React.CSSProperties}
    >
      {/* Gradient Background */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-600 via-cyan-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Border Glow */}
      <span 
        className="absolute -inset-1 rounded-[1.25rem] bg-gradient-to-br from-teal-600 via-cyan-500 to-teal-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md"
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}