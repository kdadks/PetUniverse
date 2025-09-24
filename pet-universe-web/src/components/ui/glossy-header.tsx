'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Heart, Shield, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/marketplace', label: 'Pet Marketplace' },
  { href: '/products', label: 'Shop' },
  { href: '/provider/onboarding', label: 'Become Provider' },
]

export default function GlossyHeader() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg shadow-white/5"
          : "backdrop-blur-md bg-white/5"
      )}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with gradient shine effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-60" />
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full p-2">
                  <span className="text-2xl">🐾</span>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              </div>
              <div className="relative">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  P4Pet
                </span>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className="relative text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 py-2 px-1"
                >
                  {link.label}
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-blue-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100 -z-10" />
                  {/* Shimmer underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right section - Auth/CTA */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            ) : session ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href={session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  {session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN' ? 'Admin Dashboard' : 'Dashboard'}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                {/* Glowing Get Started Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block"
                >
                  <Link
                    href="/auth/signup"
                    className="group relative inline-flex items-center justify-center px-6 py-2.5 font-semibold text-white transition-all duration-300 ease-out overflow-hidden rounded-full"
                  >
                    {/* Background gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Shine overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

                    {/* Content */}
                    <span className="relative flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Get Started</span>
                    </span>
                  </Link>
                </motion.div>

                <Link
                  href="/auth/signin"
                  className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  Sign In
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="md:hidden relative p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-gray-800" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-gray-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="relative">
                {/* Glassmorphic background */}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 m-2" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl m-2" />

                <div className="relative space-y-1 px-6 py-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center px-4 py-3 text-gray-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-white/20"
                      >
                        <span className="relative">
                          {link.label}
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Auth Buttons */}
                  <div className="pt-4 border-t border-white/20">
                    {session ? (
                      <div className="space-y-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 rounded-lg hover:bg-white/20"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            signOut()
                            setIsMenuOpen(false)
                          }}
                          className="w-full text-left flex items-center px-4 py-3 text-gray-800 hover:text-red-600 font-medium transition-colors duration-300 rounded-lg hover:bg-white/20"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Link
                          href="/auth/signin"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 rounded-lg hover:bg-white/20"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/signup"
                          onClick={() => setIsMenuOpen(false)}
                          className="group relative flex items-center justify-center px-4 py-3 font-semibold text-white transition-all duration-300 ease-out overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Get Started
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}