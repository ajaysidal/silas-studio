"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * ScrollReveal - Animates elements as they enter the viewport
 * Inspired by Animata scroll animations
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{
        once,
        margin: "-50px",
      }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer - Wraps children and staggers their entrance
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {})
          : child
      )}
    </motion.div>
  );
}

/**
 * StaggerItem - Individual item in a stagger container
 */
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
          x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxScroll - Creates parallax effect on scroll
 */
interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.5 = half speed, 2 = double speed
}

export function ParallaxScroll({
  children,
  className = "",
  speed = 0.5,
}: ParallaxScrollProps) {
  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              style: {
                ...(child.props.style as React.CSSProperties),
                transform: `translateZ(${speed * 100}px) scale(${1 - speed * 0.1})`,
              },
            } as any)
          : child
      )}
    </motion.div>
  );
}

/**
 * ScrollProgress - Tracks scroll progress for animations
 */
export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollTop / docHeight);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

/**
 * RevealOnScroll - Simple reveal animation for any element
 */
export function RevealOnScroll({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * TextReveal - Character/word level text reveal animation
 */
interface TextRevealProps {
  text: string;
  className?: string;
  splitBy?: "chars" | "words";
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  splitBy = "words",
  delay = 0,
  stagger = 0.05,
}: TextRevealProps) {
  const splitText = splitBy === "chars" ? text.split("") : text.split(" ");

  return (
    <span className={className}>
      {splitText.map((part, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: delay + index * stagger,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {part}{splitBy === "words" ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}