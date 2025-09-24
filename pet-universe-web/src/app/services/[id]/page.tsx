'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import {
  Star,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  User,
  Shield,
  Phone,
  Mail,
  Heart,
  ArrowLeft,
  CheckCircle,
  Award
} from 'lucide-react'

interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  provider: {
    businessName: string
    averageRating: number
    totalReviews: number
    isVerified: boolean
    user: {
      firstName: string
      lastName: string
    }
    location: string
    experience: string
    specialties: string[]
    contact: {
      phone: string
      email: string
    }
  }
  features: string[]
  gallery: string[]
}

export default function ServiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  useEffect(() => {
    fetchServiceDetails()
  }, [params.id])

  const fetchServiceDetails = async () => {
    try {
      // Mock service details - replace with actual API
      const mockService: Service = {
        id: params.id as string,
        name: 'Premium Dog Grooming',
        category: 'GROOMING',
        description: 'Complete professional grooming service for dogs of all sizes. Our experienced groomers provide full-service care including bathing, brushing, nail trimming, ear cleaning, and styling. We use only premium, pet-safe products and ensure your furry friend feels comfortable throughout the entire process.',
        price: 75,
        duration: 120,
        provider: {
          businessName: 'Pawsome Grooming Studio',
          averageRating: 4.8,
          totalReviews: 127,
          isVerified: true,
          user: {
            firstName: 'Sarah',
            lastName: 'Johnson'
          },
          location: 'Downtown Pet District',
          experience: '8 years of professional pet grooming',
          specialties: ['Long-haired breeds', 'Sensitive skin care', 'Show dog preparation'],
          contact: {
            phone: '(555) 123-4567',
            email: 'sarah@pawsomestudio.com'
          }
        },
        features: [
          'Premium organic shampoos',
          'Nail trimming and filing',
          'Ear cleaning and inspection',
          'Teeth brushing',
          'Full coat brushing and de-shedding',
          'Sanitary trim',
          'Blow dry and styling',
          'Complimentary nail polish'
        ],
        gallery: []
      }
      setService(mockService)
    } catch (error) {
      console.error('Error fetching service details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBooking = () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    // Handle booking logic here
    alert('Booking functionality would be implemented here')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Services</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{service.provider.averageRating}</span>
                      <span>({service.provider.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-5 w-5" />
                      <span>{service.duration} minutes</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">${service.price}</div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors duration-300 mt-2">
                    <Heart className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Provider Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Provider</h2>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.provider.user.firstName} {service.provider.user.lastName}
                    </h3>
                    {service.provider.isVerified && (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        <Shield className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{service.provider.businessName}</p>
                  <p className="text-gray-600 mb-3">{service.provider.experience}</p>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.provider.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{service.provider.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{service.provider.totalReviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Book This Service</h2>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Service Price</span>
                  <span className="font-medium">${service.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{service.duration} min</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>${service.price}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 mb-4"
              >
                {session ? 'Book Now' : 'Sign In to Book'}
              </button>

              {/* Contact Provider */}
              <div className="space-y-2">
                <a
                  href={`tel:${service.provider.contact.phone}`}
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Provider</span>
                </a>
                <a
                  href={`mailto:${service.provider.contact.email}`}
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Provider</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}