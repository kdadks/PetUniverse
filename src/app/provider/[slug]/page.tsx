'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Calendar,
  Users,
  Briefcase,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Play
} from 'lucide-react'
import { useCurrency } from '@/lib/useCurrency'

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  serviceName: string
}

interface Service {
  id: string
  name: string
  category: string
  price: number
  duration: number
}

interface ProviderProfile {
  id: string
  businessName: string
  firstName: string
  lastName: string
  averageRating: number
  totalReviews: number
  isVerified: boolean
  location: string
  experience: string
  bio: string
  specialties: string[]
  contact: {
    phone: string
    email: string
  }
  businessHours: {
    monday: { open: string; close: string }
    tuesday: { open: string; close: string }
    wednesday: { open: string; close: string }
    thursday: { open: string; close: string }
    friday: { open: string; close: string }
    saturday: { open: string; close: string }
    sunday: { open: string; close: string }
  }
  services: Service[]
  gallery: string[]
  videos: { id: string; title: string; thumbnail: string; url: string }[]
  reviews: Review[]
  yearsInBusiness: number
  totalClients: number
  certifications: string[]
}

export default function ProviderProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { formatPrice } = useCurrency()
  const [provider, setProvider] = useState<ProviderProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [mediaType, setMediaType] = useState<'images' | 'videos'>('images')
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    fetchProviderProfile()
  }, [params.slug])

  const fetchProviderProfile = async () => {
    try {
      // Mock provider data - replace with actual API
      const mockProvider: ProviderProfile = {
        id: '1',
        businessName: 'Pawsome Grooming Studio',
        firstName: 'Sarah',
        lastName: 'Johnson',
        averageRating: 4.8,
        totalReviews: 127,
        isVerified: true,
        location: 'Downtown Pet District, New York, NY',
        experience: '8 years of professional pet grooming',
        bio: 'Passionate pet groomer with over 8 years of experience specializing in all breeds. I believe every pet deserves to look and feel their best. My studio uses only premium, organic products and I take pride in creating a stress-free, enjoyable grooming experience for your furry family members.',
        specialties: [
          'Long-haired breeds',
          'Sensitive skin care',
          'Show dog preparation',
          'Creative grooming',
          'Senior pet care'
        ],
        contact: {
          phone: '(555) 123-4567',
          email: 'sarah@pawsomestudio.com'
        },
        businessHours: {
          monday: { open: '09:00 AM', close: '06:00 PM' },
          tuesday: { open: '09:00 AM', close: '06:00 PM' },
          wednesday: { open: '09:00 AM', close: '06:00 PM' },
          thursday: { open: '09:00 AM', close: '06:00 PM' },
          friday: { open: '09:00 AM', close: '06:00 PM' },
          saturday: { open: '10:00 AM', close: '04:00 PM' },
          sunday: { open: 'Closed', close: 'Closed' }
        },
        services: [
          {
            id: '1',
            name: 'Premium Dog Grooming',
            category: 'GROOMING',
            price: 75,
            duration: 120
          },
          {
            id: '2',
            name: 'Cat Grooming & Bath',
            category: 'GROOMING',
            price: 65,
            duration: 90
          },
          {
            id: '3',
            name: 'Puppy First Grooming',
            category: 'GROOMING',
            price: 50,
            duration: 60
          },
          {
            id: '4',
            name: 'De-shedding Treatment',
            category: 'GROOMING',
            price: 45,
            duration: 60
          }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
          'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
          'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
          'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80',
          'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=80',
          'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80',
          'https://images.unsplash.com/photo-1581888227599-779811939961?w=800&q=80',
        ],
        videos: [
          {
            id: '1',
            title: 'Golden Retriever Full Grooming Session',
            thumbnail: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&q=80',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: '2',
            title: 'De-shedding Treatment Process',
            thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: '3',
            title: 'Puppy First Grooming Experience',
            thumbnail: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&q=80',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: '4',
            title: 'Show Dog Preparation Tutorial',
            thumbnail: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&q=80',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ],
        reviews: [
          {
            id: '1',
            customerName: 'Emily Rodriguez',
            rating: 5,
            comment: 'Sarah did an amazing job with my Golden Retriever! He looks absolutely gorgeous and seemed very comfortable throughout the whole process. Will definitely be back!',
            date: '2024-01-15',
            serviceName: 'Premium Dog Grooming'
          },
          {
            id: '2',
            customerName: 'Michael Chen',
            rating: 5,
            comment: 'Best groomer in the city! Very professional, gentle with my senior dog, and the results are always perfect. Highly recommend!',
            date: '2024-01-10',
            serviceName: 'Premium Dog Grooming'
          },
          {
            id: '3',
            customerName: 'Lisa Anderson',
            rating: 4,
            comment: 'Great service! My poodle looks fantastic. Only minor wait time but totally worth it. Sarah really knows what she\'s doing.',
            date: '2024-01-08',
            serviceName: 'De-shedding Treatment'
          },
          {
            id: '4',
            customerName: 'David Park',
            rating: 5,
            comment: 'Sarah is wonderful with anxious dogs. My rescue was nervous about grooming, but she was patient and caring. He looks great!',
            date: '2024-01-05',
            serviceName: 'Premium Dog Grooming'
          },
          {
            id: '5',
            customerName: 'Jennifer White',
            rating: 5,
            comment: 'Took my Persian cat here and couldn\'t be happier! Clean facility, professional service, and my cat actually enjoyed it. A rare find!',
            date: '2024-01-03',
            serviceName: 'Cat Grooming & Bath'
          }
        ],
        yearsInBusiness: 8,
        totalClients: 500,
        certifications: [
          'Certified Master Groomer',
          'Pet First Aid Certified',
          'Canine Behavior Specialist',
          'Safe Grooming Practices Certified'
        ]
      }

      setProvider(mockProvider)
    } catch (error) {
      console.error('Error fetching provider profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextImage = () => {
    if (provider && provider.gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % provider.gallery.length)
    }
  }

  const prevImage = () => {
    if (provider && provider.gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + provider.gallery.length) % provider.gallery.length)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h2>
          <button
            onClick={() => router.back()}
            className="text-teal-600 hover:text-teal-800"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </motion.button>

        {/* Provider Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex items-start space-x-6 mb-6 md:mb-0">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center text-3xl font-bold text-teal-700">
                {provider.firstName[0]}{provider.lastName[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {provider.firstName} {provider.lastName}
                  </h1>
                  {provider.isVerified && (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      <Shield className="h-4 w-4" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <h2 className="text-xl text-gray-700 mb-3">{provider.businessName}</h2>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{provider.averageRating}</span>
                    <span>({provider.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-5 w-5" />
                    <span>{provider.experience}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed max-w-3xl">{provider.bio}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <a
                href={`tel:${provider.contact.phone}`}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
              <a
                href={`mailto:${provider.contact.email}`}
                className="flex items-center justify-center space-x-2 bg-white border-2 border-teal-500 hover:bg-teal-50 text-teal-700 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{provider.yearsInBusiness}+</div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{provider.totalClients}+</div>
              <div className="text-gray-600 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{provider.services.length}</div>
              <div className="text-gray-600 text-sm">Services Offered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{provider.averageRating}</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialties & Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {provider.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Media Gallery (Images & Videos) */}
            {(provider.gallery.length > 0 || provider.videos.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setMediaType('images')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        mediaType === 'images'
                          ? 'bg-white text-teal-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Photos ({provider.gallery.length})
                    </button>
                    <button
                      onClick={() => setMediaType('videos')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        mediaType === 'videos'
                          ? 'bg-white text-teal-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Videos ({provider.videos.length})
                    </button>
                  </div>
                </div>

                {mediaType === 'images' ? (
                  <>
                    <div className="relative">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={provider.gallery[currentImageIndex]}
                          alt={`Gallery ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {provider.gallery.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                          >
                            <ChevronLeft className="h-6 w-6 text-gray-800" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                          >
                            <ChevronRight className="h-6 w-6 text-gray-800" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {provider.gallery.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-4">
                      {provider.gallery.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                            index === currentImageIndex ? 'ring-2 ring-teal-500 scale-105' : 'hover:scale-105'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <div className="aspect-video rounded-lg overflow-hidden bg-black">
                        <iframe
                          src={provider.videos[currentVideoIndex].url}
                          title={provider.videos[currentVideoIndex].title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className="font-semibold text-gray-900">{provider.videos[currentVideoIndex].title}</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {provider.videos.map((video, index) => (
                        <button
                          key={video.id}
                          onClick={() => setCurrentVideoIndex(index)}
                          className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300 group ${
                            index === currentVideoIndex ? 'ring-2 ring-teal-500' : 'hover:scale-105'
                          }`}
                        >
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="h-6 w-6 text-teal-600 ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-white text-xs font-medium truncate">{video.title}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Services Offered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
              <div className="space-y-4">
                {provider.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration} min</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">{formatPrice(service.price)}</div>
                      <Link
                        href={`/services/${service.id}`}
                        className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <div className="flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">{provider.averageRating}</span>
                  <span className="text-gray-600">({provider.totalReviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                        <p className="text-sm text-gray-600">{review.serviceName}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 sticky top-24"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-teal-600" />
                <span>Business Hours</span>
              </h3>
              <div className="space-y-2">
                {Object.entries(provider.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{day}</span>
                    <span className="font-medium text-gray-900">
                      {hours.open === 'Closed' ? 'Closed' : `${hours.open} - ${hours.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="h-5 w-5 text-teal-600" />
                <span>Certifications</span>
              </h3>
              <ul className="space-y-3">
                {provider.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <a href={`tel:${provider.contact.phone}`} className="hover:text-teal-600">
                    {provider.contact.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="h-5 w-5 text-teal-600" />
                  <a href={`mailto:${provider.contact.email}`} className="hover:text-teal-600 break-all">
                    {provider.contact.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <span className="text-sm">{provider.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
