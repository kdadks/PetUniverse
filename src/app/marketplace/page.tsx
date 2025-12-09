'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  Heart,
  Shield,
  Calendar,
  User
} from 'lucide-react'
import { useCurrency } from '@/lib/useCurrency'

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
  // Traditional Pets
  { id: 'DOG', name: 'Dogs' },
  { id: 'CAT', name: 'Cats' },
  { id: 'BIRD', name: 'Birds' },
  { id: 'RABBIT', name: 'Rabbits' },
  { id: 'FISH', name: 'Fish' },
  // Livestock & Farm Animals
  { id: 'COW', name: 'Cows' },
  { id: 'BUFFALO', name: 'Buffalo' },
  { id: 'CAMEL', name: 'Camels' },
  { id: 'GOAT', name: 'Goats' },
  { id: 'SHEEP', name: 'Sheep' },
  { id: 'HORSE', name: 'Horses' },
  { id: 'OX', name: 'Oxen' },
  // Poultry
  { id: 'CHICKEN', name: 'Chickens' },
  { id: 'DUCK', name: 'Ducks' },
  { id: 'TURKEY', name: 'Turkeys' },
  { id: 'OTHER', name: 'Other' },
]

export default function MarketplacePage() {
  const { formatPrice, isLoading: currencyLoading } = useCurrency()
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
            photos: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1573865526739-10c1dd4e1f43?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1520990269312-a0d71b6f6e79?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80'],
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
            photos: ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80'],
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
        },
        // Livestock Listings
        {
          id: '13',
          pet: {
            id: 'pet-13',
            name: 'Daisy',
            species: 'COW',
            breed: 'Holstein',
            age: 3,
            gender: 'FEMALE',
            color: 'Black and White',
            photos: ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80'],
            description: 'Healthy dairy cow with excellent milk production',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 2800,
          description: 'Prime Holstein dairy cow, producing 25 liters/day. Fully vaccinated, excellent health records.',
          status: 'AVAILABLE',
          createdAt: '2024-01-15',
          owner: {
            firstName: 'Green Valley',
            lastName: 'Dairy Farm',
            email: 'sales@greenvalleydairy.com',
            isVerified: true
          }
        },
        {
          id: '14',
          pet: {
            id: 'pet-14',
            name: 'Thunder',
            species: 'HORSE',
            breed: 'Arabian',
            age: 5,
            gender: 'MALE',
            color: 'Chestnut',
            photos: ['https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80'],
            description: 'Beautiful Arabian stallion, well-trained',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 8500,
          description: 'Magnificent Arabian horse, excellent bloodline, trained for riding and competition.',
          status: 'AVAILABLE',
          createdAt: '2024-01-14',
          owner: {
            firstName: 'Sunset',
            lastName: 'Equestrian Center',
            email: 'info@sunsetequestrian.com',
            isVerified: true
          }
        },
        {
          id: '15',
          pet: {
            id: 'pet-15',
            name: 'Bella',
            species: 'GOAT',
            breed: 'Boer',
            age: 2,
            gender: 'FEMALE',
            color: 'White with Brown',
            photos: ['https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80'],
            description: 'Productive Boer goat for breeding',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 450,
          description: 'Healthy Boer goat, excellent for meat production and breeding. Good temperament.',
          status: 'AVAILABLE',
          createdAt: '2024-01-13',
          owner: {
            firstName: 'Happy Hills',
            lastName: 'Goat Farm',
            email: 'contact@happyhillsgoats.com',
            isVerified: true
          }
        },
        {
          id: '16',
          pet: {
            id: 'pet-16',
            name: 'Rocky',
            species: 'BUFFALO',
            breed: 'Murrah',
            age: 4,
            gender: 'MALE',
            color: 'Black',
            photos: ['https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80'],
            description: 'Strong water buffalo for dairy farming',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 3500,
          description: 'Murrah buffalo bull, excellent genetics, disease-free with complete vaccination records.',
          status: 'AVAILABLE',
          createdAt: '2024-01-12',
          owner: {
            firstName: 'River',
            lastName: 'Buffalo Ranch',
            email: 'sales@riverbuffalo.com',
            isVerified: true
          }
        },
        {
          id: '17',
          pet: {
            id: 'pet-17',
            name: 'Woolly',
            species: 'SHEEP',
            breed: 'Merino',
            age: 3,
            gender: 'FEMALE',
            color: 'White',
            photos: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
            description: 'Premium Merino sheep with fine wool',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 600,
          description: 'High-quality Merino sheep producing excellent wool. Great for breeding program.',
          status: 'AVAILABLE',
          createdAt: '2024-01-11',
          owner: {
            firstName: 'Mountain View',
            lastName: 'Sheep Farm',
            email: 'info@mountainviewsheep.com',
            isVerified: true
          }
        },
        {
          id: '18',
          pet: {
            id: 'pet-18',
            name: 'Sahara',
            species: 'CAMEL',
            breed: 'Dromedary',
            age: 6,
            gender: 'FEMALE',
            color: 'Tan',
            photos: ['https://images.unsplash.com/photo-1581852017103-68ac65514cf7?w=800&q=80'],
            description: 'Gentle dromedary camel, well-trained',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 5500,
          description: 'Well-trained dromedary camel, perfect for tourism or breeding. Very gentle with people.',
          status: 'AVAILABLE',
          createdAt: '2024-01-10',
          owner: {
            firstName: 'Desert',
            lastName: 'Camel Ranch',
            email: 'sales@desertcamels.com',
            isVerified: true
          }
        },
        {
          id: '19',
          pet: {
            id: 'pet-19',
            name: 'Buddy',
            species: 'OX',
            breed: 'Gyr',
            age: 5,
            gender: 'MALE',
            color: 'Gray',
            photos: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80'],
            description: 'Strong working ox, well-trained',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 2200,
          description: 'Reliable working ox, excellent for farm work. Well-trained and healthy.',
          status: 'AVAILABLE',
          createdAt: '2024-01-09',
          owner: {
            firstName: 'Heritage',
            lastName: 'Farm',
            email: 'contact@heritagefarm.com',
            isVerified: true
          }
        },
        {
          id: '20',
          pet: {
            id: 'pet-20',
            name: 'Clucky',
            species: 'CHICKEN',
            breed: 'Rhode Island Red',
            age: 1,
            gender: 'FEMALE',
            color: 'Red Brown',
            photos: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80'],
            description: 'Excellent egg-laying hen',
            healthRecords: [],
            vaccinations: []
          },
          listingType: 'SALE',
          price: 35,
          description: 'Productive Rhode Island Red hen, lays 5-6 eggs per week. Healthy and vaccinated.',
          status: 'AVAILABLE',
          createdAt: '2024-01-08',
          owner: {
            firstName: 'Barnyard',
            lastName: 'Poultry',
            email: 'sales@barnyardpoultry.com',
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

  if (isLoading || currencyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16">
      <div className="relative bg-gradient-to-r from-teal-100/80 via-cyan-100/80 to-emerald-100/80 backdrop-blur-sm shadow-lg pt-24 pb-8 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 flex opacity-40">
          <img src="/images/Adorable Sudsy Australian Shepherd Puppies.png" alt="" className="w-1/3 h-full object-cover" />
          <img src="/images/Interspecies Friends.png" alt="" className="w-1/3 h-full object-cover" />
          <img src="/images/nick-fewings-8BV5u6XyCzk-unsplash.jpg" alt="" className="w-1/3 h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/40 via-cyan-50/20 to-emerald-50/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-3 drop-shadow">
              Every Pet. Every Family.
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-2 drop-shadow">
              Find your perfect companion from verified breeders, farms, and shelters
            </p>
            <span className="text-gray-600 text-sm font-medium">{filteredListings.length} pets available</span>
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
                    placeholder="Search pets, livestock, farm animals..."
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
            className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-2xl p-8 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Find Your Perfect Companion</h2>
                <p className="text-teal-100">
                  Browse verified pets from trusted breeders, farms, and shelters. Every pet comes with health records and certification.
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
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                    {listing.pet.photos && listing.pet.photos.length > 0 ? (
                      <img
                        src={listing.pet.photos[0]}
                        alt={listing.pet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">
                        {listing.pet.species === 'DOG' || listing.pet.species === 'dog' ? '🐕' :
                         listing.pet.species === 'CAT' || listing.pet.species === 'cat' ? '🐱' :
                         listing.pet.species === 'BIRD' || listing.pet.species === 'bird' ? '🐦' :
                         listing.pet.species === 'RABBIT' || listing.pet.species === 'rabbit' ? '🐰' :
                         listing.pet.species === 'FISH' || listing.pet.species === 'fish' ? '🐠' :
                         listing.pet.species === 'COW' ? '🐄' :
                         listing.pet.species === 'BUFFALO' ? '🐃' :
                         listing.pet.species === 'CAMEL' ? '🐫' :
                         listing.pet.species === 'GOAT' ? '🐐' :
                         listing.pet.species === 'SHEEP' ? '🐑' :
                         listing.pet.species === 'HORSE' ? '🐴' :
                         listing.pet.species === 'OX' ? '🐂' :
                         listing.pet.species === 'CHICKEN' ? '🐔' :
                         listing.pet.species === 'DUCK' ? '🦆' :
                         listing.pet.species === 'TURKEY' ? '🦃' : '🐾'}
                      </div>
                    )}
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
                        <div className="text-2xl font-bold text-gray-900">{formatPrice(listing.price)}</div>
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
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
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