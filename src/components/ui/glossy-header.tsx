'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import CountrySelector from '@/components/CountrySelector'

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/services', label: 'Services', icon: '✨' },
  { href: '/marketplace', label: 'Marketplace', icon: '🐾' },
  { href: '/products', label: 'Shop', icon: '🛍️' },
  { href: '/provider/onboarding', label: 'Become Provider', icon: '🌟' },
]

export default function GlossyHeader() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('/')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setActiveLink(window.location.pathname)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2"
          : "py-4"
      )}
    >
      <div className={cn(
        "mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl rounded-2xl transition-all duration-500 group",
        scrolled
          ? "backdrop-blur-2xl bg-gradient-to-r from-teal-50/95 via-cyan-50/95 to-emerald-50/95 shadow-[0_8px_32px_rgba(20,184,166,0.15)] border border-teal-200/50"
          : "backdrop-blur-2xl bg-gradient-to-r from-teal-50/90 via-cyan-50/90 to-emerald-50/90 border border-teal-100/60 shadow-[0_4px_24px_rgba(20,184,166,0.12)]"
      )}>
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-[-1px] bg-gradient-to-r from-teal-400/40 via-cyan-500/40 to-emerald-500/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Teal inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal-100/30 via-transparent to-cyan-100/20 pointer-events-none" />
        
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-teal-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo with sunrise glow effect */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="group flex items-center space-x-3">
                <div className="relative">
                  {/* Teal glow behind logo */}
                  <motion.div 
                    className="absolute -inset-2 bg-gradient-to-tr from-teal-400/50 via-cyan-400/40 to-emerald-400/50 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative bg-gradient-to-br from-teal-400 via-cyan-500 to-emerald-500 text-white rounded-xl p-2 shadow-lg shadow-teal-400/30">
                    <span className="text-xl md:text-2xl">🐾</span>
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                    P4Pet
                  </span>
                  {/* Shine sweep effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-200/60 to-transparent -skew-x-12"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  />
                </div>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center">
              <div className="flex items-center bg-gradient-to-r from-teal-100/60 via-cyan-50/50 to-emerald-100/60 backdrop-blur-sm rounded-full p-1 space-x-1 border border-teal-200/30">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 + 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setActiveLink(link.href)}
                      className={cn(
                        "relative px-4 py-2 text-sm font-bold rounded-full transition-all duration-300",
                        activeLink === link.href
                          ? "text-white"
                          : "text-gray-700 hover:text-teal-700 hover:bg-white/70"
                      )}
                    >
                      {activeLink === link.href && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full shadow-lg shadow-teal-500/25"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Right section - Currency + Auth/CTA */}
            <div className="flex items-center space-x-3">
              {/* Country/Currency Selector */}
              <div className="hidden lg:block">
                <CountrySelector />
              </div>

              {status === 'loading' ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 animate-pulse" />
              ) : session ? (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    href={session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'}
                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-300 text-sm"
                  >
                    {session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN' ? 'Admin' : 'Dashboard'}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-300 text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="hidden md:block text-gray-700 hover:text-teal-600 font-medium transition-colors duration-300 text-sm"
                  >
                    Sign In
                  </Link>

                  {/* Glowing Get Started Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="hidden md:block"
                  >
                    <Link
                      href="/auth/signup"
                      className="group relative inline-flex items-center justify-center px-5 py-2.5 font-semibold text-white text-sm transition-all duration-300 ease-out overflow-hidden rounded-full"
                    >
                      {/* Animated gradient background */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                      {/* Shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />

                      {/* Content */}
                      <span className="relative flex items-center space-x-1.5">
                        <Sparkles className="h-4 w-4" />
                        <span>Get Started</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </span>
                    </Link>
                  </motion.div>
                </>
              )}

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className={cn(
                  "md:hidden relative p-2.5 rounded-xl transition-all duration-300",
                  isMenuOpen 
                    ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25"
                    : "bg-teal-50/90 hover:bg-teal-100 text-gray-700 shadow-sm"
                )}
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
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[76px] z-40"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu} />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative mx-4 mt-2"
            >
              <div className="bg-teal-50/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-teal-100/50 overflow-hidden">
                {/* Gradient top border */}
                <div className="h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500" />
                
                <div className="p-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setIsMenuOpen(false)
                          setActiveLink(link.href)
                        }}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300",
                          activeLink === link.href
                            ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 text-white shadow-lg"
                            : "hover:bg-teal-100 text-gray-700"
                        )}
                      >
                        <span className="flex items-center space-x-3">
                          <span className="text-lg">{link.icon}</span>
                          <span className="font-medium">{link.label}</span>
                        </span>
                        <ChevronRight className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          activeLink === link.href ? "text-white/80" : "text-gray-400"
                        )} />
                      </Link>
                    </motion.div>
                  ))}

                  {/* Divider */}
                  <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                  {/* Mobile Currency Selector */}
                  <div className="px-4 py-2">
                    <CountrySelector />
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="pt-2">
                    {session ? (
                      <div className="space-y-2">
                        <Link
                          href={session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-100 text-gray-700 transition-all duration-300"
                        >
                          <span className="flex items-center space-x-3">
                            <span className="text-lg">📊</span>
                            <span className="font-medium">
                              {session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN' ? 'Admin Dashboard' : 'Dashboard'}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </Link>
                        <button
                          onClick={() => {
                            signOut()
                            setIsMenuOpen(false)
                          }}
                          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-red-50 text-red-600 transition-all duration-300"
                        >
                          <span className="flex items-center space-x-3">
                            <span className="text-lg">👋</span>
                            <span className="font-medium">Sign Out</span>
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Link
                          href="/auth/signin"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-100 text-gray-700 transition-all duration-300"
                        >
                          <span className="flex items-center space-x-3">
                            <span className="text-lg">👤</span>
                            <span className="font-medium">Sign In</span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </Link>
                        <Link
                          href="/auth/signup"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-center px-4 py-3.5 font-semibold text-white rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 shadow-lg shadow-teal-500/25 transition-all duration-300"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Get Started Free
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}