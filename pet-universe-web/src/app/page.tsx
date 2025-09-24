'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, ArrowRight, Play, Heart, Star } from 'lucide-react'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  // Removed automatic redirect - users should be able to view home page even when logged in

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Improved Background with Better Colors */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y }}
        >
          {/* Beautiful Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-pink-500/30" />
          <div className="absolute inset-0 bg-gradient-to-bl from-green-400/20 via-transparent to-blue-600/20" />

          {/* Animated Background Patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent animate-pulse" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/20 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>

        {/* Softer Glassmorphic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/20" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Floating Elements with Improved Colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full backdrop-blur-sm border border-white/20"
          />
          <motion.div
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full backdrop-blur-sm border border-white/20"
          />
          <motion.div
            animate={{
              y: [-15, 15, -15],
              x: [15, -15, 15],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-r from-teal-400/15 to-emerald-400/15 rounded-full backdrop-blur-sm border border-white/20"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-lg opacity-70" />
                <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-full p-4">
                  <span className="text-4xl">🐾</span>
                </div>
              </div>
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                P4Pet
              </span>
            </div>
          </motion.div>

          {/* Main Headline with Glossy Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="relative inline-block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Your Pet's
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] animate-shine" />
            </span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Perfect Paradise
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] animate-shine animation-delay-1000" />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with trusted pet care professionals, discover premium products,
            and give your furry friends the love they deserve.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA - Glowing Gradient */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out overflow-hidden rounded-2xl"
              >
                {/* Background gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

                {/* Content */}
                <span className="relative flex items-center space-x-3 text-lg">
                  <Sparkles className="h-5 w-5" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>

            {/* Secondary CTA - Glassmorphic */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 ease-out overflow-hidden rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20"
              >
                <span className="relative flex items-center space-x-3 text-lg">
                  <Play className="h-5 w-5" />
                  <span>Explore Services</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Happy Pets</div>
            </div>
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Trusted Providers</div>
            </div>
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="text-3xl font-bold text-white">4.9</div>
                <Star className="h-6 w-6 text-yellow-400 fill-current ml-2" />
              </div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Everything Your Pet Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive ecosystem of pet care services, products, and community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🏥",
                title: "Veterinary Services",
                description: "Book appointments, video consultations, and emergency care with verified veterinarians.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "✂️",
                title: "Pet Grooming",
                description: "Professional grooming services at your location or in-center appointments.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "🛒",
                title: "Pet Products",
                description: "Quality food, toys, accessories, and health supplements delivered to your door.",
                gradient: "from-green-500 to-teal-500"
              },
              {
                icon: "🐕",
                title: "Pet Marketplace",
                description: "Find your perfect companion through our verified adoption and breeding network.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: "📱",
                title: "Health Tracking",
                description: "Manage vaccination schedules, health records, and get personalized care reminders.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: "⭐",
                title: "Trusted Network",
                description: "All service providers are verified and rated by our community for quality assurance.",
                gradient: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden"
              >
                <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

                  <div className="relative">
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Glossy shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                P4Pet
              </span>
            </div>
            <p>&copy; 2025 P4Pet. Your trusted partner in comprehensive pet care.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
