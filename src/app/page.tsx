'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, ArrowRight, Play, Heart, Star, Zap, Shield, Clock } from 'lucide-react'

// Animated Wave Component - Teal theme
const AnimatedWaves = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      {/* Wave 1 - Closest, teal gradient */}
      <motion.svg
        className="relative block w-full h-[120px] md:h-[180px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ x: 0 }}
        animate={{ x: [-50, 0, -50] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="wave1Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
          fill="url(#wave1Gradient)"
        />
      </motion.svg>

      {/* Wave 2 - Middle, lighter */}
      <motion.svg
        className="absolute bottom-0 block w-full h-[100px] md:h-[160px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ x: 0 }}
        animate={{ x: [30, -30, 30] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="wave2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 C200,40 400,100 600,60 C800,20 1000,100 1200,80 L1200,120 L0,120 Z"
          fill="url(#wave2Gradient)"
        />
      </motion.svg>

      {/* Wave 3 - Furthest, lightest */}
      <motion.svg
        className="absolute bottom-0 block w-full h-[80px] md:h-[140px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ x: 0 }}
        animate={{ x: [-20, 40, -20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="wave3Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C300,100 600,20 900,80 C1100,120 1200,60 1200,40 L1200,120 L0,120 Z"
          fill="url(#wave3Gradient)"
        />
      </motion.svg>
    </div>
  )
}

// Teal Glow Effect Component
const TealGlow = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Central Glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-32 md:-inset-48 bg-gradient-radial from-teal-300/30 via-cyan-400/15 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner bright core */}
        <motion.div
          className="absolute -inset-16 md:-inset-24 bg-gradient-radial from-cyan-200/40 via-teal-300/20 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Subtle Light Rays */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-1/2 h-full origin-bottom"
          style={{
            width: '2px',
            background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(20,184,166,${0.08 + i * 0.01}) 30%, rgba(6,182,212,${0.1 + i * 0.01}) 60%, rgba(255,255,255,0) 100%)`,
            transform: `translateX(-50%) rotate(${i * 60 - 150}deg)`,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-teal-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Floating Pet Icons
const FloatingPetIcons = () => {
  const pets = [
    // Traditional Pets
    { emoji: '🐕', left: 8, top: 15 },
    { emoji: '🐈', left: 22, top: 35 },
    { emoji: '🐦', left: 85, top: 20 },
    { emoji: '🐰', left: 75, top: 45 },
    { emoji: '🐠', left: 15, top: 60 },
    { emoji: '🐹', left: 88, top: 65 },
    { emoji: '🦜', left: 45, top: 12 },
    { emoji: '🐢', left: 55, top: 70 },
    // Livestock & Farm Animals
    { emoji: '🐴', left: 35, top: 25 },
    { emoji: '🐄', left: 65, top: 30 },
    { emoji: '🐐', left: 25, top: 75 },
    { emoji: '🐑', left: 70, top: 75 },
    { emoji: '🐖', left: 50, top: 55 },
    { emoji: '🐓', left: 92, top: 40 },
    { emoji: '🦆', left: 5, top: 40 },
    { emoji: '🐫', left: 60, top: 15 },
  ]
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pets.map((pet, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-5xl drop-shadow-lg"
          style={{
            left: `${pet.left}%`,
            top: `${pet.top}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {pet.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden -mt-16">
      {/* Hero Section with Teal Glow Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Light Teal Gradient Background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y }}
        >
          {/* Base light teal gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-100 via-cyan-50 to-emerald-50" />
          
          {/* Subtle overlay gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/30 via-cyan-100/20 to-emerald-100/30" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-200/20 via-transparent to-teal-100/20" />
          
          {/* Bottom glow */}
          <div className="absolute bottom-1/4 left-0 right-0 h-1/2 bg-gradient-to-t from-teal-100/40 via-cyan-50/20 to-transparent" />
          
          {/* Top subtle tint */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-teal-200/30 to-transparent" />
        </motion.div>

        {/* Teal Glow Effect */}
        <TealGlow />

        {/* Floating Pet Icons */}
        <FloatingPetIcons />

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
          style={{ opacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-xl rounded-full px-4 py-2 border border-teal-200/50 shadow-lg">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl"
              >
                🐾
              </motion.span>
              <span className="text-teal-700 font-semibold text-sm">
                Trusted by 10,000+ Pet Parents
              </span>
              <Sparkles className="h-4 w-4 text-teal-500" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-800">
              Where Every Pet
            </span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Finds Paradise
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 rounded-full shadow-lg"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Connect with trusted pet care professionals, discover premium products,
            and give your furry friends the love they deserve — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                
                <span className="relative flex items-center space-x-2 text-base md:text-lg">
                  <Sparkles className="h-5 w-5" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-teal-700 transition-all duration-300 ease-out overflow-hidden rounded-2xl backdrop-blur-xl bg-white/60 border-2 border-teal-200 hover:bg-white/80 hover:border-teal-300"
              >
                <span className="relative flex items-center space-x-2 text-base md:text-lg">
                  <Play className="h-5 w-5" />
                  <span>Explore Services</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: '10K+', label: 'Happy Pets', icon: Heart },
              { value: '500+', label: 'Trusted Providers', icon: Shield },
              { value: '4.9', label: 'Average Rating', icon: Star, extra: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="backdrop-blur-xl bg-white/70 rounded-2xl border border-teal-200/50 p-4 md:p-6 text-center hover:bg-white/90 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl md:text-4xl font-bold text-teal-700">
                    {stat.value}
                  </span>
                  {stat.extra && <span className="ml-1 text-lg md:text-xl">{stat.extra}</span>}
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Waves */}
        <AnimatedWaves />
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-teal-50 via-cyan-50 to-emerald-50">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-teal-50/80 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full px-4 py-2 mb-6"
            >
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">Everything Your Pet Needs</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Complete Pet Care
              </span>
              <br />
              <span className="text-gray-900">Ecosystem</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From health check-ups to grooming, products to adoption — we've got your furry friends covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🏥",
                title: "Veterinary Services",
                description: "Book appointments, video consultations, and emergency care with verified veterinarians.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: "✂️",
                title: "Pet Grooming",
                description: "Professional grooming services at your location or in-center appointments.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                icon: "🛒",
                title: "Pet Products",
                description: "Quality food, toys, accessories, and health supplements delivered to your door.",
                gradient: "from-teal-500 to-emerald-500",
                bgGradient: "from-teal-50 to-emerald-50"
              },
              {
                icon: "🐕",
                title: "Pet Marketplace",
                description: "Find your perfect companion through our verified adoption and breeding network.",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-rose-50"
              },
              {
                icon: "📱",
                title: "Health Tracking",
                description: "Manage vaccination schedules, health records, and get personalized care reminders.",
                gradient: "from-indigo-500 to-purple-500",
                bgGradient: "from-indigo-50 to-purple-50"
              },
              {
                icon: "⭐",
                title: "Trusted Network",
                description: "All service providers are verified and rated by our community for quality assurance.",
                gradient: "from-amber-500 to-orange-500",
                bgGradient: "from-amber-50 to-orange-50"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className={`relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Arrow */}
                  <motion.div 
                    className="mt-4 flex items-center text-gray-400 group-hover:text-orange-500 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </motion.div>

                  {/* Glossy shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out rounded-3xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Light Teal Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50" />
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-br from-teal-200/30 to-transparent rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-gradient-to-tr from-cyan-200/30 to-transparent rounded-full"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Give Your Pet
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">The Best Life?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of happy pet parents who trust P4Pet for their furry family members.
            </p>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-10 py-5 font-bold text-lg text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
