'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, ArrowRight, Play, Heart, Star, Zap, Shield, Clock, Scissors, Stethoscope, Bone, Home as HomeIcon } from 'lucide-react'

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

// Rolling Background Images Component
const RollingBackgroundImages = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const loadedCount = useRef(0)
  
  const images = [
    '/images/Adorable Sudsy Australian Shepherd Puppies.png',
    '/images/Cozy Pet Store Interior with Fluffy White Dog.png',
    '/images/Interspecies Friends.png',
    '/images/alec-favale-Ivzo69e18nk-unsplash.jpg',
    '/images/jeremy-mowery-WA00ShDnupM-unsplash.jpg',
    '/images/nick-fewings-8BV5u6XyCzk-unsplash.jpg',
    '/images/random-institute-wn2BLotE8oY-unsplash.jpg',
    '/images/tran-mau-tri-tam-7QjU_u2vGDs-unsplash.jpg',
  ]

  // Duplicate images for seamless loop
  const allImages = [...images, ...images]

  useEffect(() => {
    // Preload all images
    let loadedImages = 0
    const totalImages = images.length

    images.forEach((imageSrc) => {
      const img = new window.Image()
      img.onload = () => {
        loadedImages += 1
        if (loadedImages === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        loadedImages += 1
        if (loadedImages === totalImages) {
          // Start animation even if some images fail to load
          setImagesLoaded(true)
        }
      }
      img.src = imageSrc
    })

    // Fallback: start animation after 3 seconds if images are still loading
    const timeout = setTimeout(() => {
      setImagesLoaded(true)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="flex h-full"
        animate={imagesLoaded ? { x: ['0%', '-50%'] } : { x: '0%' }}
        transition={{
          x: imagesLoaded ? {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          } : { duration: 0 },
        }}
      >
        {allImages.map((img, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 h-full"
            style={{ width: `${100 / images.length}%` }}
          >
            <img
              src={img}
              alt={`Pet ${index + 1}`}
              className="w-full h-full object-cover opacity-40"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-100/40 via-transparent to-cyan-100/40" />
          </div>
        ))}
      </motion.div>
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/40 via-cyan-50/20 to-emerald-50/40" />
    </div>
  )
}

// Rolling Featured Services Component
const RollingServices = () => {
  const featuredServices = [
    { icon: Scissors, name: 'Pet Grooming', color: 'from-teal-500 to-cyan-500', price: '$45', serviceId: '1' },
    { icon: Stethoscope, name: 'Veterinary Care', color: 'from-cyan-500 to-blue-500', price: '$80', serviceId: '4' },
    { icon: Bone, name: 'Training', color: 'from-emerald-500 to-teal-500', price: '$60', serviceId: '6' },
    { icon: HomeIcon, name: 'Pet Boarding', color: 'from-teal-600 to-emerald-600', price: '$35', serviceId: '12' },
    { icon: Heart, name: 'Pet Sitting', color: 'from-cyan-600 to-teal-600', price: '$30', serviceId: '8' },
    { icon: Star, name: 'Pet Spa', color: 'from-emerald-600 to-cyan-600', price: '$70', serviceId: '2' },
  ]

  // Duplicate services for seamless loop
  const services = [...featuredServices, ...featuredServices]

  return (
    <div className="absolute -bottom-40 left-0 right-0 overflow-visible pointer-events-none" style={{ zIndex: 100 }}>
      <div className="relative pointer-events-auto px-4">
        {/* Rolling container */}
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={index}
                href={`/services/${service.serviceId}`}
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="flex-shrink-0 w-52 backdrop-blur-2xl bg-white/95 rounded-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 cursor-pointer group hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transition-all duration-300"
                  style={{
                    transform: 'translateY(0)',
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">{service.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">Professional Service</p>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-600 font-bold text-lg">{service.price}</span>
                    <ArrowRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </motion.div>
      </div>
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
    <div className="relative overflow-visible">
      {/* Hero Section with Rolling Background Images */}
      <section className="relative h-[70vh] md:h-[75vh] flex items-center justify-center overflow-visible pt-0 pb-24 -mt-16" style={{ zIndex: 10 }}>
        {/* Rolling Background Images */}
        <RollingBackgroundImages />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity }}
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-lg"
          >
            <span className="text-gray-900">
              Every Pet. Every Need.
            </span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-700 via-cyan-700 to-emerald-700 bg-clip-text text-transparent">
                Every Professional.
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full shadow-lg"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline with stats inline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-base md:text-lg text-gray-800 mb-6 max-w-2xl mx-auto leading-relaxed drop-shadow"
          >
            Every pet parent deserves access to every service their pet needs, from every trusted professional.
            <br />
            <span className="inline-flex flex-wrap items-center justify-center gap-3 mt-3 text-sm font-semibold text-teal-800">
              <span className="flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                <Heart className="h-4 w-4" /> 10K+ Happy Pets
              </span>
              <span className="text-teal-400">•</span>
              <span className="flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                <Shield className="h-4 w-4" /> 500+ Providers
              </span>
              <span className="text-teal-400">•</span>
              <span className="flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star className="h-4 w-4 fill-teal-700" /> 4.9 Rating
              </span>
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth/signup"
                className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-300 ease-out overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />

                <span className="relative flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-teal-700 transition-all duration-300 ease-out overflow-hidden rounded-xl backdrop-blur-xl bg-white/60 border-2 border-teal-200 hover:bg-white/80 hover:border-teal-300"
              >
                <span className="relative flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Explore Services</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Rolling Featured Services */}
        <RollingServices />

        {/* Animated Waves */}
        <AnimatedWaves />
      </section>

      {/* Features Section */}
      <section className="relative py-24 pt-48 bg-gradient-to-b from-teal-50 via-cyan-50 to-emerald-50" style={{ zIndex: 1 }}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-teal-50/90 to-transparent" style={{ zIndex: 1 }} />
        
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
                className="group relative h-full"
              >
                <div className={`relative h-full flex flex-col bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
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
                  <p className="text-gray-600 leading-relaxed flex-grow">
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
      <section className="relative pt-16 pb-24 overflow-hidden">
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
