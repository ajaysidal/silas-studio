"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#gradient)" />
      <path d="M16 8L24 16L16 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NavCtaButton({ 
  children, 
  href, 
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      if (href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
    props.onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5",
        "font-orbitron text-sm font-semibold text-slate-100",
        "bg-transparent",
        "border border-transparent",
        "overflow-hidden",
        "transition-all duration-300",
        "cursor-pointer",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-teal-500 before:via-cyan-500 before:to-teal-500 before:opacity-0 before:transition-opacity before:duration-300",
        "after:absolute after:inset-[-1px] after:rounded-[inherit] after:bg-gradient-to-r after:from-teal-500 after:via-cyan-500 after:to-teal-500 after:opacity-100 after:transition-all after:duration-300",
        "hover:before:opacity-100",
        "hover:after:opacity-100",
        "hover:shadow-lg hover:shadow-teal-500/30",
        "hover:scale-[1.02]",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
  };

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700" aria-label="Theme toggle" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: [1, 0.8, 1] }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.span>
    </button>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/dfy", label: "DFY Solutions" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-30 transition-all duration-300">
      <motion.nav
        style={{
          backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.95)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(148, 163, 184, 0.1)" : "none",
          boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
        }}
        className="relative"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 z-10">
              <Logo />
              <span className="font-orbitron text-xl font-bold text-slate-100 hidden sm:block">
                Build With AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-teal-500 after:to-cyan-500 hover:after:w-full transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <NavCtaButton 
                href="https://silas-studio.buildwithai.digital"
                className="ml-2"
              >
                Launch Studio
              </NavCtaButton>
            </div>

            {/* Mobile Actions: Theme Toggle + Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md"
          >
            <div className="py-6 px-2 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-teal-400 hover:bg-slate-900 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <NavCtaButton 
                  href="https://silas-studio.buildwithai.digital"
                  className="w-full justify-center"
                >
                  Launch Studio
                </NavCtaButton>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </header>
  );
}