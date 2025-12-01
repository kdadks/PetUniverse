'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  Heart,
  Scissors,
  Stethoscope,
  GraduationCap,
  Home,
  Car,
  Users,
  Beef,
  Milk,
  Syringe,
  Sprout
} from 'lucide-react'
import { useCurrency } from '@/lib/useCurrency'

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
  }
}

const serviceCategories = [
  { id: 'ALL', name: 'All Services', icon: Heart },
  // Pet Services
  { id: 'GROOMING', name: 'Pet Grooming', icon: Scissors },
  { id: 'VETERINARY_CONSULTATION', name: 'Veterinary Care', icon: Stethoscope },
  { id: 'TRAINING', name: 'Pet Training', icon: GraduationCap },
  { id: 'PET_SITTING', name: 'Pet Sitting', icon: Home },
  { id: 'WALKING', name: 'Dog Walking', icon: Car },
  { id: 'BOARDING', name: 'Pet Boarding', icon: Users },
  // Livestock Services
  { id: 'LIVESTOCK_VETERINARY', name: 'Livestock Veterinary', icon: Stethoscope },
  { id: 'BREEDING_SERVICES', name: 'Breeding Services', icon: Beef },
  { id: 'ARTIFICIAL_INSEMINATION', name: 'Artificial Insemination', icon: Syringe },
  { id: 'VACCINATION', name: 'Vaccination', icon: Syringe },
  { id: 'MILK_TESTING', name: 'Milk Testing', icon: Milk },
  { id: 'FEED_CONSULTATION', name: 'Feed Consultation', icon: Sprout },
  { id: 'FARM_VISIT', name: 'Farm Visit', icon: Home },
]

export default function ServicesPage() {
  const { data: session } = useSession()
  const { formatPrice, isLoading: currencyLoading } = useCurrency()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [services, selectedCategory, searchQuery, locationFilter, priceRange])

  const fetchServices = async () => {
    try {
      // Simulate API call - replace with actual API
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'Premium Dog Grooming',
          category: 'GROOMING',
          description: 'Full service grooming including bath, haircut, nail trimming, and ear cleaning',
          price: 75,
          duration: 120,
          provider: {
            businessName: 'Pawsome Grooming',
            averageRating: 4.8,
            totalReviews: 127,
            isVerified: true,
            user: { firstName: 'Sarah', lastName: 'Johnson' }
          }
        },
        {
          id: '2',
          name: 'Cat Grooming & Spa',
          category: 'GROOMING',
          description: 'Gentle grooming for cats including bath, brushing, nail trimming, and flea treatment',
          price: 65,
          duration: 90,
          provider: {
            businessName: 'Feline Luxury Spa',
            averageRating: 4.9,
            totalReviews: 84,
            isVerified: true,
            user: { firstName: 'Amanda', lastName: 'Foster' }
          }
        },
        {
          id: '3',
          name: 'Aquarium Setup & Fish Care',
          category: 'VETERINARY_CONSULTATION',
          description: 'Professional aquarium setup, water testing, and fish health consultation',
          price: 95,
          duration: 120,
          provider: {
            businessName: 'Aquatic Life Experts',
            averageRating: 4.7,
            totalReviews: 56,
            isVerified: true,
            user: { firstName: 'Dr. Kevin', lastName: 'Waters' }
          }
        },
        {
          id: '4',
          name: 'Veterinary Health Checkup',
          category: 'VETERINARY_CONSULTATION',
          description: 'Comprehensive health examination with vaccination review',
          price: 120,
          duration: 45,
          provider: {
            businessName: 'City Veterinary Clinic',
            averageRating: 4.9,
            totalReviews: 89,
            isVerified: true,
            user: { firstName: 'Dr. Michael', lastName: 'Brown' }
          }
        },
        {
          id: '5',
          name: 'Cat Behavior Training',
          category: 'TRAINING',
          description: 'Specialized training for litter box issues, scratching, and socialization',
          price: 80,
          duration: 75,
          provider: {
            businessName: 'Feline Behavior Solutions',
            averageRating: 4.6,
            totalReviews: 92,
            isVerified: true,
            user: { firstName: 'Jessica', lastName: 'Clarke' }
          }
        },
        {
          id: '6',
          name: 'Basic Obedience Training',
          category: 'TRAINING',
          description: 'One-on-one training session focusing on basic commands and behavior',
          price: 90,
          duration: 60,
          provider: {
            businessName: 'Happy Tails Training',
            averageRating: 4.7,
            totalReviews: 156,
            isVerified: true,
            user: { firstName: 'Lisa', lastName: 'Davis' }
          }
        },
        {
          id: '7',
          name: 'Cat & Small Pet Sitting',
          category: 'PET_SITTING',
          description: 'Specialized care for cats, fish, and small pets in your home',
          price: 45,
          duration: 480,
          provider: {
            businessName: 'Gentle Paws Pet Care',
            averageRating: 4.8,
            totalReviews: 115,
            isVerified: true,
            user: { firstName: 'Rachel', lastName: 'Green' }
          }
        },
        {
          id: '8',
          name: 'Pet Sitting (Full Day)',
          category: 'PET_SITTING',
          description: 'Professional pet sitting service in your home for up to 8 hours',
          price: 60,
          duration: 480,
          provider: {
            businessName: 'Loving Pet Care',
            averageRating: 4.6,
            totalReviews: 78,
            isVerified: false,
            user: { firstName: 'Emma', lastName: 'Wilson' }
          }
        },
        {
          id: '9',
          name: 'Dog Walking Service',
          category: 'WALKING',
          description: '30-minute neighborhood walk with exercise and socialization',
          price: 25,
          duration: 30,
          provider: {
            businessName: 'Active Paws',
            averageRating: 4.5,
            totalReviews: 203,
            isVerified: true,
            user: { firstName: 'Jake', lastName: 'Miller' }
          }
        },
        {
          id: '10',
          name: 'Cat Hotel & Boarding',
          category: 'BOARDING',
          description: 'Luxury cat boarding with private suites and play areas',
          price: 85,
          duration: 1440, // 24 hours
          provider: {
            businessName: 'Whiskers Paradise',
            averageRating: 4.7,
            totalReviews: 67,
            isVerified: true,
            user: { firstName: 'Sophie', lastName: 'Chen' }
          }
        },
        {
          id: '11',
          name: 'Aquarium Maintenance',
          category: 'BOARDING',
          description: 'Weekly aquarium cleaning, water changes, and fish feeding service',
          price: 40,
          duration: 60,
          provider: {
            businessName: 'AquaCare Services',
            averageRating: 4.5,
            totalReviews: 134,
            isVerified: true,
            user: { firstName: 'Mark', lastName: 'Thompson' }
          }
        },
        {
          id: '12',
          name: 'Weekend Pet Boarding',
          category: 'BOARDING',
          description: 'Safe and comfortable boarding for weekend getaways',
          price: 150,
          duration: 2880, // 48 hours
          provider: {
            businessName: 'Cozy Pet Hotel',
            averageRating: 4.4,
            totalReviews: 92,
            isVerified: true,
            user: { firstName: 'Maria', lastName: 'Garcia' }
          }
        },
        // Livestock Services
        {
          id: '13',
          name: 'Cattle Veterinary Checkup',
          category: 'LIVESTOCK_VETERINARY',
          description: 'Complete health examination for cattle including disease screening and health certification',
          price: 200,
          duration: 120,
          provider: {
            businessName: 'Farm Vet Services',
            averageRating: 4.9,
            totalReviews: 145,
            isVerified: true,
            user: { firstName: 'Dr. Robert', lastName: 'Miller' }
          }
        },
        {
          id: '14',
          name: 'Horse Health & Wellness Visit',
          category: 'LIVESTOCK_VETERINARY',
          description: 'Comprehensive equine health check, dental exam, and hoof inspection',
          price: 250,
          duration: 180,
          provider: {
            businessName: 'Equine Care Specialists',
            averageRating: 4.8,
            totalReviews: 98,
            isVerified: true,
            user: { firstName: 'Dr. Jennifer', lastName: 'Thompson' }
          }
        },
        {
          id: '15',
          name: 'Goat & Sheep Vaccination',
          category: 'VACCINATION',
          description: 'Standard vaccination protocol for goats and sheep including deworming',
          price: 80,
          duration: 60,
          provider: {
            businessName: 'Livestock Health Pro',
            averageRating: 4.7,
            totalReviews: 112,
            isVerified: true,
            user: { firstName: 'Dr. William', lastName: 'Harris' }
          }
        },
        {
          id: '16',
          name: 'Cattle Breeding Consultation',
          category: 'BREEDING_SERVICES',
          description: 'Professional breeding guidance, genetic selection, and breeding schedule planning',
          price: 350,
          duration: 240,
          provider: {
            businessName: 'Premium Livestock Genetics',
            averageRating: 4.9,
            totalReviews: 76,
            isVerified: true,
            user: { firstName: 'James', lastName: 'Anderson' }
          }
        },
        {
          id: '17',
          name: 'Artificial Insemination Service',
          category: 'ARTIFICIAL_INSEMINATION',
          description: 'Professional AI service for cattle, buffalo, and dairy animals with certified semen',
          price: 150,
          duration: 90,
          provider: {
            businessName: 'Dairy Breeding Solutions',
            averageRating: 4.8,
            totalReviews: 134,
            isVerified: true,
            user: { firstName: 'Michael', lastName: 'Davis' }
          }
        },
        {
          id: '18',
          name: 'Dairy Milk Quality Testing',
          category: 'MILK_TESTING',
          description: 'Complete milk analysis including fat content, protein, bacterial count, and adulteration testing',
          price: 120,
          duration: 30,
          provider: {
            businessName: 'Dairy Lab Services',
            averageRating: 4.6,
            totalReviews: 89,
            isVerified: true,
            user: { firstName: 'Dr. Susan', lastName: 'White' }
          }
        },
        {
          id: '19',
          name: 'Livestock Nutrition Consultation',
          category: 'FEED_CONSULTATION',
          description: 'Custom feed plan development for optimal animal health and productivity',
          price: 180,
          duration: 120,
          provider: {
            businessName: 'Farm Nutrition Experts',
            averageRating: 4.7,
            totalReviews: 67,
            isVerified: true,
            user: { firstName: 'Dr. Richard', lastName: 'Brown' }
          }
        },
        {
          id: '20',
          name: 'Complete Farm Health Visit',
          category: 'FARM_VISIT',
          description: 'Comprehensive on-farm visit for herd health assessment and disease prevention',
          price: 300,
          duration: 240,
          provider: {
            businessName: 'Mobile Farm Veterinary',
            averageRating: 4.9,
            totalReviews: 156,
            isVerified: true,
            user: { firstName: 'Dr. Thomas', lastName: 'Wilson' }
          }
        },
        {
          id: '21',
          name: 'Buffalo Health Management',
          category: 'LIVESTOCK_VETERINARY',
          description: 'Specialized health care for water buffalo including vaccination and disease control',
          price: 220,
          duration: 150,
          provider: {
            businessName: 'Buffalo Care Center',
            averageRating: 4.8,
            totalReviews: 82,
            isVerified: true,
            user: { firstName: 'Dr. Maria', lastName: 'Rodriguez' }
          }
        },
        {
          id: '22',
          name: 'Camel Health & Vaccination',
          category: 'VACCINATION',
          description: 'Specialized camel health services including routine vaccines and parasite control',
          price: 280,
          duration: 120,
          provider: {
            businessName: 'Desert Animal Care',
            averageRating: 4.7,
            totalReviews: 45,
            isVerified: true,
            user: { firstName: 'Dr. Ahmed', lastName: 'Hassan' }
          }
        }
      ]
      setServices(mockServices)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = services

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.businessName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    filtered = filtered.filter(service =>
      service.price >= priceRange[0] && service.price <= priceRange[1]
    )

    setFilteredServices(filtered)
  }

  if (isLoading || currencyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16">
      <div className="bg-gradient-to-r from-teal-100/80 via-cyan-100/80 to-emerald-100/80 backdrop-blur-sm shadow-lg pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Every Service. Every Professional.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              From grooming to veterinary care, find trusted professionals for every pet need
            </p>
            <span className="text-gray-500 text-sm">{filteredServices.length} services available</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search services for pets, livestock, farm animals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    setPriceRange([min, max])
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="0-500">All Prices</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-500">$200+</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Service Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Categories</h2>
            <div className="flex flex-wrap gap-3">
              {serviceCategories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{service.provider.businessName}</p>
                  </div>
                  {service.provider.isVerified && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{service.provider.averageRating}</span>
                    <span className="text-sm text-gray-500">({service.provider.totalReviews})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.duration} min</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(service.price)}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/services/${service.id}`}
                      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/services/${service.id}`}
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}