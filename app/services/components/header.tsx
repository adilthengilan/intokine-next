"use client"


import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#mission" },
    { name: "Experience", href: "#community" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Join Us", href: "#join" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="flex items-center justify-between px-6 md:px-10 py-6">
          {/* LOGO */}
          <div className="flex items-center">
            <Image
              src="/images/intokine_logo.png"
              alt="Intokine Logo"
              width={180}
              height={90}
              className="object-contain w-32 md:w-44 xl:w-56"
              priority
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative text-white font-header tracking-wider uppercase text-sm group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-10 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-white text-2xl font-header tracking-widest uppercase"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
