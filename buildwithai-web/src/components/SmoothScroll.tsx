"use client";

import { useEffect, React } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/**
 * Hook to access Lenis instance for programmatic scrolling
 */
export function useLenis() {
  const lenisRef = React.useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return lenisRef.current;
}

/**
 * Component to scroll to an element smoothly
 */
export function ScrollToElement({
  target,
  offset = 0,
  duration = 1.2,
}: {
  target: string;
  offset?: number;
  duration?: number;
}) {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element && lenis) {
      lenis.scrollTo(element, {
        offset,
        duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <a
      href={target}
      onClick={handleClick}
      className="cursor-pointer"
    >
      Scroll to {target}
    </a>
  );
}