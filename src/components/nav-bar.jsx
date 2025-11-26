"use client"

import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Coffee, Menu, X } from "lucide-react"
import CartWidget from "./cart-widget"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-stone-900 bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/25"
        : "text-stone-300 hover:text-amber-400 hover:bg-stone-800/50"
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-stone-800/50 backdrop-blur-xl shadow-xl shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/40 transition-all duration-500" />
              <Coffee className="relative h-8 w-8 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-bold text-2xl tracking-tight">
              <span className="text-stone-100">Cafe</span>
              <span className="gradient-text">Select</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-stone-900/50 p-2 rounded-full border border-stone-800/50">
            <NavLink to="/" className={navLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/productos" className={navLinkClass}>
              Productos
            </NavLink>
            <NavLink to="/categoria/origen" className={navLinkClass}>
              Origen
            </NavLink>
            <NavLink to="/categoria/blend" className={navLinkClass}>
              Blends
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            <CartWidget />

            <button
              className="md:hidden p-3 rounded-full bg-stone-800/50 border border-stone-700/50 text-stone-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 animate-fade-in">
            <div className="flex flex-col gap-2 bg-stone-900/90 rounded-2xl border border-stone-800 p-4">
              <NavLink to="/" className={navLinkClass}>
                Inicio
              </NavLink>
              <NavLink to="/productos" className={navLinkClass}>
                Productos
              </NavLink>
              <NavLink to="/categoria/origen" className={navLinkClass}>
                Origen
              </NavLink>
              <NavLink to="/categoria/blend" className={navLinkClass}>
                Blends
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
