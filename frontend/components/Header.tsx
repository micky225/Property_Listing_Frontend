'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-[#f8f6f3]/85 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Property Finds"
            width={140}
            height={113}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-foreground/80 hover:text-primary transition font-medium">
            Home
          </Link>
          <Link
            href="/properties"
            className="text-foreground/80 hover:text-primary transition font-medium"
          >
            Properties
          </Link>
          <Link
            href="/saved"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 hover:bg-primary/90 transition font-medium"
          >
            <Heart className="w-4 h-4" />
            Saved
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-foreground" />
          <span className="w-6 h-0.5 bg-foreground" />
          <span className="w-6 h-0.5 bg-foreground" />
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 p-4 flex flex-col gap-4">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/properties" className="text-foreground hover:text-primary transition">
            Properties
          </Link>
          <Link
            href="/saved"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 hover:bg-primary/90 transition w-fit"
          >
            <Heart className="w-4 h-4" />
            Saved
          </Link>
        </div>
      )}
    </header>
  )
}
