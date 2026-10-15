'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/dfy', label: 'DFY Solutions' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/" className="font-orbitron text-xl font-bold">
          Build With AI
        </Link>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:via-primary-400 after:to-secondary after:opacity-0 hover:after:w-full hover:after:opacity-300 transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="https://silas-studio.buildwithai.digital"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all"
        >
          Launch Studio
        </Link>
      </div>
    </nav>
  );
}