'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import {
  Heart,
  Star,
  Shield,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Share2
} from 'lucide-react'

interface MarketplaceListing {
  id: string
  pet: {
    id: string
    name: string
    species: string
    breed: string
    age: number
    gender: string
    color: string
    weight: string
    photos: string[]
    description: string
    temperament: string[]
    healthRecords: any[]
    vaccinations: any[]
    microchipped: boolean
    spayedNeutered: boolean
  }
  listingType: 'SALE' | 'ADOPTION'
  price?: number
  description: string
  status: 'AVAILABLE' | 'PENDING' | 'SOLD' | 'ADOPTED'
  createdAt: string
  location: string
  owner: {
    firstName: string
    lastName: string
    email: string
    phone: string
    isVerified: boolean
    memberSince: string
    totalListings: number
  }
  rehomingReason?: string
  specialNeeds?: string[]
}

export default function MarketplaceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [listing, setListing] = useState<MarketplaceListing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchListingDetails()
  }, [params.id])

  const fetchListingDetails = async () => {
    try {
      // Mock listing details - replace with actual API
      const mockListing: MarketplaceListing = {
        id: params.id as string,
        pet: {
          id: 'pet-1',
          name: 'Luna',
          species: 'cat',
          breed: 'Persian',
          age: 2,
          gender: 'FEMALE',
          color: 'White',
          weight: '8 lbs',
          photos: [],
          description: 'Luna is a beautiful, gentle Persian cat with the softest white fur you\'ve ever felt. She loves to be petted and will purr contentedly in your lap for hours. She\'s great with children and gets along well with other cats.',
          temperament: ['Gentle', 'Affectionate', 'Calm', 'Social'],
          healthRecords: [],
          vaccinations: [
            { vaccine: 'FVRCP', dateGiven: '2024-01-15', nextDue: '2025-01-15' },
            { vaccine: 'Rabies', dateGiven: '2024-01-15', nextDue: '2027-01-15' }
          ],
          microchipped: true,
          spayedNeutered: true
        },
        listingType: 'ADOPTION',
        description: 'Luna is looking for a loving forever home where she can be the center of attention. She would do best in a quiet household with gentle children or adults who can appreciate her sweet, calm nature.',
        status: 'AVAILABLE',
        createdAt: '2024-01-10',
        location: 'San Francisco, CA',
        owner: {
          firstName: 'Sarah',
          lastName: 'M.',
          email: 'sarah.m@email.com',
          phone: '(555) 123-4567',
          isVerified: true,
          memberSince: '2023-05-15',
          totalListings: 3
        },
        rehomingReason: 'Moving to apartment that doesn\'t allow pets',
        specialNeeds: []
      }
      setListing(mockListing)
    } catch (error) {
      console.error('Error fetching listing details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContact = () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    // Handle contact logic here
    alert('Contact functionality would be implemented here')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h2>
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
          <span>Back to Marketplace</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Pet Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 mb-6"
            >
              <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                <div className="text-8xl">
                  {listing.pet.species === 'cat' ? '🐱' :
                   listing.pet.species === 'dog' ? '🐕' :
                   listing.pet.species === 'fish' ? '🐠' :
                   listing.pet.species === 'bird' ? '🐦' :
                   listing.pet.species === 'rabbit' ? '🐰' : '🐾'}
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    listing.listingType === 'ADOPTION'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {listing.listingType === 'ADOPTION' ? 'For Adoption' : 'For Sale'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-300">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-300">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Pet Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.pet.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-2">
                    <span className="font-medium">{listing.pet.breed}</span>
                    <span>•</span>
                    <span>{listing.pet.age} {listing.pet.age === 1 ? 'year' : 'years'} old</span>
                    <span>•</span>
                    <span>{listing.pet.gender}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                </div>
                {listing.price && (
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">${listing.price}</div>
                  </div>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{listing.pet.description}</p>

              {/* Pet Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{listing.pet.age}</div>
                  <div className="text-sm text-gray-600">Years Old</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{listing.pet.weight}</div>
                  <div className="text-sm text-gray-600">Weight</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{listing.pet.color}</div>
                  <div className="text-sm text-gray-600">Color</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{listing.pet.gender}</div>
                  <div className="text-sm text-gray-600">Gender</div>
                </div>
              </div>

              {/* Temperament */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Temperament</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.pet.temperament.map((trait, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Health & Care */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Health & Care</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-5 w-5 ${listing.pet.spayedNeutered ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-gray-700">Spayed/Neutered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-5 w-5 ${listing.pet.microchipped ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-gray-700">Microchipped</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Up-to-date on vaccinations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Health records available</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rehoming Reason */}
            {listing.rehomingReason && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Rehoming Information</h2>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{listing.rehomingReason}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Owner</h2>

              {/* Owner Info */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">
                      {listing.owner.firstName} {listing.owner.lastName}
                    </h3>
                    {listing.owner.isVerified && (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        <Shield className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Member since {new Date(listing.owner.memberSince).getFullYear()}
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleContact}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
                >
                  {session ? 'Contact Owner' : 'Sign In to Contact'}
                </button>

                <a
                  href={`tel:${listing.owner.phone}`}
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Owner</span>
                </a>

                <a
                  href={`mailto:${listing.owner.email}`}
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Owner</span>
                </a>
              </div>

              {/* Listing Info */}
              <div className="border-t border-gray-200 pt-4 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Listed:</span>
                  <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-600 font-medium">Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{listing.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}