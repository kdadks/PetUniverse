'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  MapPin,
  Filter,
  Heart,
  Star,
  Shield,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail
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
    photos: string[]
    description: string
    healthRecords: any[]
    vaccinations: any[]
  }
  listingType: 'SALE' | 'ADOPTION'
  price?: number
  description: string
  status: 'AVAILABLE' | 'PENDING' | 'SOLD' | 'ADOPTED'
  createdAt: string
  owner: {
    firstName: string
    lastName: string
    email: string
    isVerified: boolean
  }
}

const listingTypes = [
  { id: 'ALL', name: 'All Listings' },
  { id: 'ADOPTION', name: 'For Adoption' },
  { id: 'SALE', name: 'For Sale' },
]

const species = [
  { id: 'ALL', name: 'All Pets' },
  { id: 'dog', name: 'Dogs' },
  { id: 'cat', name: 'Cats' },
  { id: 'bird', name: 'Birds' },
  { id: 'rabbit', name: 'Rabbits' },
  { id: 'fish', name: 'Fish' },
  { id: 'other', name: 'Other' },
]

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>([])
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedSpecies, setSelectedSpecies] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [ageRange, setAgeRange] = useState([0, 15])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  useEffect(() => {
    filterListings()
  }, [listings, selectedType, selectedSpecies, searchQuery, priceRange, ageRange])

  const fetchListings = async () => {
    try {
      // Mock marketplace listings - replace with actual API
      const mockListings: MarketplaceListing[] = [
        {
          id: '1',
          pet: {
            id: 'pet-1',
            name: 'Buddy',
            species: 'dog',
            breed: 'Golden Retriever',
            age: 2,
            gender: 'MALE',
            color: 'Golden',
            photos: [],
            description: 'Friendly and well-trained family dog',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 1200,
          description: 'Beautiful Golden Retriever, great with kids, fully vaccinated and house trained.',
          status: 'AVAILABLE',
          createdAt: '2024-01-15',
          owner: {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@example.com',
            isVerified: true
          }
        },
        {
          id: '2',
          pet: {
            id: 'pet-2',
            name: 'Luna',
            species: 'cat',
            breed: 'Persian',
            age: 1,
            gender: 'FEMALE',
            color: 'White',
            photos: [],
            description: 'Sweet and gentle Persian cat',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'ADOPTION',
          description: 'Luna is looking for a loving forever home. She\'s been spayed and is up to date on all vaccinations.',
          status: 'AVAILABLE',
          createdAt: '2024-01-10',
          owner: {
            firstName: 'Pet Rescue',
            lastName: 'Center',
            email: 'contact@petrescue.org',
            isVerified: true
          }
        },
        {
          id: '3',
          pet: {
            id: 'pet-3',
            name: 'Whiskers',
            species: 'cat',
            breed: 'Maine Coon',
            age: 2,
            gender: 'MALE',
            color: 'Orange Tabby',
            photos: [],
            description: 'Large and fluffy Maine Coon with gentle personality',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 800,
          description: 'Magnificent Maine Coon cat, excellent temperament, great with children and other pets.',
          status: 'AVAILABLE',
          createdAt: '2024-01-14',
          owner: {
            firstName: 'Emma',
            lastName: 'Williams',
            email: 'emma@mainecooncats.com',
            isVerified: true
          }
        },
        {
          id: '4',
          pet: {
            id: 'pet-4',
            name: 'Nemo',
            species: 'fish',
            breed: 'Clownfish',
            age: 1,
            gender: 'UNKNOWN',
            color: 'Orange and White',
            photos: [],
            description: 'Beautiful marine clownfish for saltwater aquarium',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 45,
          description: 'Healthy captive-bred clownfish, perfect for beginner marine aquarists. Comes with care guide.',
          status: 'AVAILABLE',
          createdAt: '2024-01-13',
          owner: {
            firstName: 'Ocean',
            lastName: 'Aquatics',
            email: 'info@oceanaquatics.com',
            isVerified: true
          }
        },
        {
          id: '5',
          pet: {
            id: 'pet-5',
            name: 'Bella',
            species: 'cat',
            breed: 'Siamese',
            age: 3,
            gender: 'FEMALE',
            color: 'Seal Point',
            photos: [],
            description: 'Vocal and affectionate Siamese cat',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'ADOPTION',
          description: 'Bella is a chatty Siamese looking for an experienced cat owner who appreciates her vocal nature.',
          status: 'AVAILABLE',
          createdAt: '2024-01-11',
          owner: {
            firstName: 'Cat Haven',
            lastName: 'Rescue',
            email: 'rescue@cathaven.org',
            isVerified: true
          }
        },
        {
          id: '6',
          pet: {
            id: 'pet-6',
            name: 'Goldie',
            species: 'fish',
            breed: 'Goldfish',
            age: 1,
            gender: 'UNKNOWN',
            color: 'Golden',
            photos: [],
            description: 'Classic goldfish for freshwater aquarium',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 15,
          description: 'Healthy fancy goldfish, great for beginners. Hardy and easy to care for.',
          status: 'AVAILABLE',
          createdAt: '2024-01-12',
          owner: {
            firstName: 'Aqua',
            lastName: 'Pets',
            email: 'sales@aquapets.com',
            isVerified: true
          }
        },
        {
          id: '7',
          pet: {
            id: 'pet-7',
            name: 'Shadow',
            species: 'cat',
            breed: 'British Shorthair',
            age: 4,
            gender: 'MALE',
            color: 'Blue Gray',
            photos: [],
            description: 'Calm and dignified British Shorthair',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 1500,
          description: 'Purebred British Shorthair with excellent bloodline. Very calm and great apartment cat.',
          status: 'AVAILABLE',
          createdAt: '2024-01-09',
          owner: {
            firstName: 'Royal',
            lastName: 'Cats',
            email: 'info@royalcats.com',
            isVerified: true
          }
        },
        {
          id: '8',
          pet: {
            id: 'pet-8',
            name: 'Rainbow',
            species: 'fish',
            breed: 'Betta Fish',
            age: 1,
            gender: 'MALE',
            color: 'Multicolor',
            photos: [],
            description: 'Stunning male betta with vibrant colors',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 25,
          description: 'Beautiful male betta fish with stunning fin display and vibrant colors. Great personality.',
          status: 'AVAILABLE',
          createdAt: '2024-01-08',
          owner: {
            firstName: 'Tropical',
            lastName: 'Fish',
            email: 'care@tropicalfish.com',
            isVerified: true
          }
        },
        {
          id: '9',
          pet: {
            id: 'pet-9',
            name: 'Charlie',
            species: 'dog',
            breed: 'French Bulldog',
            age: 3,
            gender: 'MALE',
            color: 'Brindle',
            photos: [],
            description: 'Playful French Bulldog with great personality',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 2500,
          description: 'Adorable French Bulldog puppy, champion bloodline, health tested parents.',
          status: 'AVAILABLE',
          createdAt: '2024-01-12',
          owner: {
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah@frenchiegarden.com',
            isVerified: true
          }
        },
        {
          id: '10',
          pet: {
            id: 'pet-10',
            name: 'Princess',
            species: 'cat',
            breed: 'Ragdoll',
            age: 2,
            gender: 'FEMALE',
            color: 'Blue Point',
            photos: [],
            description: 'Docile and sweet Ragdoll cat',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'ADOPTION',
          description: 'Princess is a gentle Ragdoll who loves to be held and cuddled. Perfect lap cat.',
          status: 'AVAILABLE',
          createdAt: '2024-01-07',
          owner: {
            firstName: 'Gentle',
            lastName: 'Paws',
            email: 'adopt@gentlepaws.org',
            isVerified: true
          }
        },
        {
          id: '11',
          pet: {
            id: 'pet-11',
            name: 'Finn',
            species: 'fish',
            breed: 'Angelfish',
            age: 1,
            gender: 'UNKNOWN',
            color: 'Silver',
            photos: [],
            description: 'Elegant freshwater angelfish',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 35,
          description: 'Beautiful angelfish pair, perfect for community tanks. Peaceful and elegant swimmers.',
          status: 'AVAILABLE',
          createdAt: '2024-01-06',
          owner: {
            firstName: 'Fresh',
            lastName: 'Aquariums',
            email: 'info@freshaquariums.com',
            isVerified: true
          }
        },
        {
          id: '12',
          pet: {
            id: 'pet-12',
            name: 'Milo',
            species: 'rabbit',
            breed: 'Holland Lop',
            age: 1,
            gender: 'MALE',
            color: 'Brown',
            photos: [],
            description: 'Cute and cuddly Holland Lop rabbit',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'ADOPTION',
          description: 'Milo is a gentle rabbit who loves to hop around and eat fresh vegetables.',
          status: 'AVAILABLE',
          createdAt: '2024-01-08',
          owner: {
            firstName: 'Animal',
            lastName: 'Shelter',
            email: 'info@animalshelter.org',
            isVerified: true
          }
        }
      ]
      setListings(mockListings)
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterListings = () => {
    let filtered = listings

    if (selectedType !== 'ALL') {
      filtered = filtered.filter(listing => listing.listingType === selectedType)
    }

    if (selectedSpecies !== 'ALL') {
      filtered = filtered.filter(listing => listing.pet.species === selectedSpecies)
    }

    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    filtered = filtered.filter(listing => {
      if (listing.listingType === 'SALE' && listing.price) {
        return listing.price >= priceRange[0] && listing.price <= priceRange[1]
      }
      return true
    })

    filtered = filtered.filter(listing =>
      listing.pet.age >= ageRange[0] && listing.pet.age <= ageRange[1]
    )

    filtered = filtered.filter(listing => listing.status === 'AVAILABLE')

    setFilteredListings(filtered)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white/50 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pet Marketplace
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{filteredListings.length} pets available</span>
            </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, breed, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {listingTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedSpecies}
                  onChange={(e) => setSelectedSpecies(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {species.map(spec => (
                    <option key={spec.id} value={spec.id}>{spec.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={`${ageRange[0]}-${ageRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    setAgeRange([min, max])
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="0-15">All Ages</option>
                  <option value="0-1">Puppy/Kitten (0-1 years)</option>
                  <option value="1-3">Young (1-3 years)</option>
                  <option value="3-7">Adult (3-7 years)</option>
                  <option value="7-15">Senior (7+ years)</option>
                </select>
              </div>
            </div>

            {selectedType === 'SALE' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Featured Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Find Your Perfect Companion</h2>
                <p className="text-blue-100">
                  Browse verified pets from trusted breeders and shelters. Every pet comes with health records and certification.
                </p>
              </div>
              <div className="hidden md:block">
                <Heart className="h-16 w-16 text-white/20" />
              </div>
            </div>
          </motion.div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl">
                      {listing.pet.species === 'dog' ? '🐕' :
                       listing.pet.species === 'cat' ? '🐱' :
                       listing.pet.species === 'bird' ? '🐦' :
                       listing.pet.species === 'rabbit' ? '🐰' :
                       listing.pet.species === 'fish' ? '🐠' : '🐾'}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.listingType === 'ADOPTION'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {listing.listingType === 'ADOPTION' ? 'For Adoption' : 'For Sale'}
                    </span>
                  </div>
                  {listing.owner.isVerified && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 p-1 rounded-full">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{listing.pet.name}</h3>
                      <p className="text-gray-600">{listing.pet.breed}</p>
                    </div>
                    {listing.price && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${listing.price}</div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Age:</span> {listing.pet.age} {listing.pet.age === 1 ? 'year' : 'years'}
                    </div>
                    <div>
                      <span className="font-medium">Gender:</span> {listing.pet.gender}
                    </div>
                    <div>
                      <span className="font-medium">Color:</span> {listing.pet.color}
                    </div>
                    <div>
                      <span className="font-medium">Species:</span> {listing.pet.species}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{listing.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{listing.owner.firstName} {listing.owner.lastName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                      <Heart className="h-5 w-5" />
                    </button>
                    <div className="flex space-x-2">
                      <Link
                        href={`/marketplace/${listing.id}`}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/marketplace/${listing.id}`}
                        className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pets found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}