'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Heart,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'

const quickLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Help', href: '/help' }
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' }
]

export default function GlossyFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with glassmorphic effect - Teal theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/95 via-cyan-900/95 to-emerald-900/95 backdrop-blur-xl"></div>

      {/* Subtle floating orbs */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent">
                    P4Pet
                  </h2>
                  <span className="text-xs font-medium text-teal-300 -mt-1">
                    PetCare - All in one place
                  </span>
                </div>
              </div>
              <p className="text-teal-100 mb-4 text-sm max-w-md">
                Your one-stop destination for all pet care needs. Connecting pet owners with trusted services and quality products.
              </p>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 text-teal-100 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-teal-300" />
                  <span>1-800-PET-LOVE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-teal-300" />
                  <span>hello@petuniverse.com</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-teal-100 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    >
                      <Icon className="h-4 w-4 text-teal-200 group-hover:text-white transition-colors duration-300" />
                    </Link>
                  )
                })}
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-teal-200 text-sm"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-r-lg transition-all duration-300 text-sm font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-teal-100 text-sm">
                © 2025 P4Pet. All rights reserved.
              </div>
              <div className="flex space-x-4 text-sm">
                <Link href="/privacy" className="text-teal-100 hover:text-white transition-colors duration-300">
                  Privacy
                </Link>
                <Link href="/terms" className="text-teal-100 hover:text-white transition-colors duration-300">
                  Terms
                </Link>
                <Link href="/cookies" className="text-teal-100 hover:text-white transition-colors duration-300">
                  Cookies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}