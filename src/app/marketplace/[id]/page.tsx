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
  const { formatPrice, isLoading: currencyLoading } = useCurrency()
  const [listing, setListing] = useState<MarketplaceListing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchListingDetails()
  }, [params.id])

  const fetchListingDetails = async () => {
    try {
      // Mock listing details - replace with actual API
      const listingId = params.id as string

      const mockListings: Record<string, MarketplaceListing> = {
        '1': {
          id: '1',
          pet: {
            id: 'pet-1',
            name: 'Luna',
            species: 'CAT',
            breed: 'Persian',
            age: 2,
            gender: 'FEMALE',
            color: 'White',
            weight: '8 lbs',
            photos: [
              'https://images.unsplash.com/photo-1573865526739-10c1dd4e1f43?w=800&q=80',
              'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80',
              'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
              'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80'
            ],
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
        },
        '13': {
          id: '13',
          pet: {
            id: 'pet-13',
            name: 'Daisy',
            species: 'COW',
            breed: 'Holstein',
            age: 3,
            gender: 'FEMALE',
            color: 'Black and White',
            weight: '1200 lbs',
            photos: [
              'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
              'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
              'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
              'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=800&q=80'
            ],
            description: 'Daisy is a healthy, productive Holstein dairy cow with excellent milk production. She has a gentle temperament and is easy to handle. Recently freshened and currently in peak production. Great for family dairy farms or homesteaders.',
            temperament: ['Gentle', 'Calm', 'Easy to handle', 'Good milker'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'IBR-BVD', dateGiven: '2024-09-15', nextDue: '2025-09-15' },
              { vaccine: 'Clostridial', dateGiven: '2024-09-15', nextDue: '2025-09-15' }
            ],
            microchipped: true,
            spayedNeutered: false
          },
          listingType: 'SALE',
          price: 2800,
          description: 'Daisy is an excellent dairy cow with proven milk production of 8 gallons per day. She is healthy, well-cared for, and comes with complete health records. Perfect for a small dairy operation or homestead.',
          status: 'AVAILABLE',
          createdAt: '2024-09-20',
          location: 'Lancaster, PA',
          owner: {
            firstName: 'John',
            lastName: 'Miller',
            email: 'john.miller@farm.com',
            phone: '(555) 234-5678',
            isVerified: true,
            memberSince: '2021-03-10',
            totalListings: 12
          }
        },
        '14': {
          id: '14',
          pet: {
            id: 'pet-14',
            name: 'Thunder',
            species: 'HORSE',
            breed: 'Arabian',
            age: 5,
            gender: 'MALE',
            color: 'Bay',
            weight: '900 lbs',
            photos: [
              'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
              'https://images.unsplash.com/photo-1551817958-11e0f7bbea4a?w=800&q=80',
              'https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?w=800&q=80',
              'https://images.unsplash.com/photo-1534960282920-bb5783c7f090?w=800&q=80'
            ],
            description: 'Thunder is a magnificent Arabian gelding with excellent confirmation and athletic ability. Well-trained for both English and Western riding. Great on trails and in the arena. Very responsive and willing to please.',
            temperament: ['Athletic', 'Responsive', 'Gentle', 'Intelligent'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'Rabies', dateGiven: '2024-08-01', nextDue: '2025-08-01' },
              { vaccine: 'EEE/WEE', dateGiven: '2024-08-01', nextDue: '2025-08-01' },
              { vaccine: 'West Nile', dateGiven: '2024-08-01', nextDue: '2025-08-01' }
            ],
            microchipped: true,
            spayedNeutered: true
          },
          listingType: 'SALE',
          price: 8500,
          description: 'Thunder is a beautiful, well-trained Arabian gelding perfect for an intermediate to advanced rider. He has excellent ground manners, loads well, and is great for trail riding or show. Current on all vaccinations and farrier work.',
          status: 'AVAILABLE',
          createdAt: '2024-09-25',
          location: 'Lexington, KY',
          owner: {
            firstName: 'Emily',
            lastName: 'Thompson',
            email: 'emily.t@equestrian.com',
            phone: '(555) 345-6789',
            isVerified: true,
            memberSince: '2020-07-18',
            totalListings: 8
          }
        },
        '15': {
          id: '15',
          pet: {
            id: 'pet-15',
            name: 'Buttercup',
            species: 'GOAT',
            breed: 'Nubian',
            age: 2,
            gender: 'FEMALE',
            color: 'Brown and white',
            weight: '150 lbs',
            photos: [
              'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80',
              'https://images.unsplash.com/photo-1550852382-d86c3fb05c88?w=800&q=80',
              'https://images.unsplash.com/photo-1567137137831-4f2b87f11efd?w=800&q=80'
            ],
            description: 'Buttercup is a sweet Nubian doe in excellent health. She is friendly, enjoys human interaction, and is great with children. Currently not pregnant but has been a good mother in the past. Excellent milk producer with high butterfat content.',
            temperament: ['Friendly', 'Gentle', 'Social', 'Good mother'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'CDT', dateGiven: '2024-09-10', nextDue: '2025-09-10' }
            ],
            microchipped: false,
            spayedNeutered: false
          },
          listingType: 'SALE',
          price: 450,
          description: 'Buttercup is a wonderful dairy goat for a small homestead or hobby farm. She is healthy, produces excellent milk, and has a very sweet disposition. Great for families looking to add a milk goat to their farm.',
          status: 'AVAILABLE',
          createdAt: '2024-10-01',
          location: 'Austin, TX',
          owner: {
            firstName: 'Maria',
            lastName: 'Garcia',
            email: 'maria.garcia@homestead.com',
            phone: '(555) 456-7890',
            isVerified: true,
            memberSince: '2022-01-05',
            totalListings: 6
          }
        },
        '16': {
          id: '16',
          pet: {
            id: 'pet-16',
            name: 'Snowball',
            species: 'SHEEP',
            breed: 'Merino',
            age: 1,
            gender: 'FEMALE',
            color: 'White',
            weight: '120 lbs',
            photos: [
              'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
              'https://images.unsplash.com/photo-1588507728669-c2e34410c8dc?w=800&q=80',
              'https://images.unsplash.com/photo-1579070831063-67e0f55ebb06?w=800&q=80'
            ],
            description: 'Snowball is a beautiful young Merino ewe with exceptional wool quality. She has a gentle disposition and is easy to handle. Perfect for wool production or breeding. She has excellent genetics from award-winning bloodlines.',
            temperament: ['Gentle', 'Calm', 'Docile', 'Flock-oriented'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'CDT', dateGiven: '2024-08-15', nextDue: '2025-08-15' }
            ],
            microchipped: false,
            spayedNeutered: false
          },
          listingType: 'SALE',
          price: 380,
          description: 'Snowball is an excellent Merino ewe with premium wool genetics. She is healthy, well-socialized, and perfect for adding quality genetics to your flock or starting a fiber operation.',
          status: 'AVAILABLE',
          createdAt: '2024-09-18',
          location: 'Bozeman, MT',
          owner: {
            firstName: 'David',
            lastName: 'Anderson',
            email: 'david.anderson@ranch.com',
            phone: '(555) 567-8901',
            isVerified: true,
            memberSince: '2019-11-20',
            totalListings: 15
          }
        },
        '17': {
          id: '17',
          pet: {
            id: 'pet-17',
            name: 'Duke',
            species: 'OX',
            breed: 'Devon',
            age: 4,
            gender: 'MALE',
            color: 'Red',
            weight: '1800 lbs',
            photos: [
              'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
              'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
              'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=80'
            ],
            description: 'Duke is a well-trained working ox with experience in logging and farm work. He is strong, reliable, and responds well to verbal commands. Great for traditional farming methods or educational demonstrations.',
            temperament: ['Strong', 'Reliable', 'Well-trained', 'Calm'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'Clostridial', dateGiven: '2024-07-20', nextDue: '2025-07-20' }
            ],
            microchipped: false,
            spayedNeutered: true
          },
          listingType: 'SALE',
          price: 3200,
          description: 'Duke is an exceptional working ox with years of training and experience. He is well-mannered, strong, and perfect for sustainable farming operations, historical demonstrations, or logging work.',
          status: 'AVAILABLE',
          createdAt: '2024-09-05',
          location: 'Burlington, VT',
          owner: {
            firstName: 'Robert',
            lastName: 'Brown',
            email: 'robert.brown@sustainablefarm.com',
            phone: '(555) 678-9012',
            isVerified: true,
            memberSince: '2018-05-12',
            totalListings: 10
          }
        },
        '18': {
          id: '18',
          pet: {
            id: 'pet-18',
            name: 'Bella',
            species: 'BUFFALO',
            breed: 'Water Buffalo',
            age: 5,
            gender: 'FEMALE',
            color: 'Dark Gray',
            weight: '1500 lbs',
            photos: [
              'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80',
              'https://images.unsplash.com/photo-1563460065-564fa97e2fe1?w=800&q=80',
              'https://images.unsplash.com/photo-1580986234308-1ab1e9ab9a4d?w=800&q=80'
            ],
            description: 'Bella is a productive water buffalo with excellent milk production. She is gentle, easy to milk, and produces rich, creamy milk perfect for cheese making. She is healthy and has a calm temperament around people.',
            temperament: ['Gentle', 'Productive', 'Calm', 'Easy to handle'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'FMD', dateGiven: '2024-06-10', nextDue: '2025-06-10' },
              { vaccine: 'HS', dateGiven: '2024-06-10', nextDue: '2025-06-10' }
            ],
            microchipped: true,
            spayedNeutered: false
          },
          listingType: 'SALE',
          price: 4200,
          description: 'Bella is an excellent milking buffalo producing 6-8 gallons of rich milk daily. Perfect for artisan cheese production or a sustainable dairy operation. She is healthy, well-cared for, and comes with complete health records.',
          status: 'AVAILABLE',
          createdAt: '2024-09-28',
          location: 'Miami, FL',
          owner: {
            firstName: 'Carlos',
            lastName: 'Rodriguez',
            email: 'carlos.rodriguez@dairy.com',
            phone: '(555) 789-0123',
            isVerified: true,
            memberSince: '2020-09-03',
            totalListings: 9
          }
        },
        '19': {
          id: '19',
          pet: {
            id: 'pet-19',
            name: 'Sultan',
            species: 'CAMEL',
            breed: 'Dromedary',
            age: 6,
            gender: 'MALE',
            color: 'Light Brown',
            weight: '1100 lbs',
            photos: [
              'https://images.unsplash.com/photo-1581852017103-68ac65514cf7?w=800&q=80',
              'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
              'https://images.unsplash.com/photo-1539186607619-df476afe6ff1?w=800&q=80'
            ],
            description: 'Sultan is a well-trained dromedary camel suitable for riding, tourism, or breeding. He has a calm temperament, is accustomed to people, and has experience giving rides to children and adults. He is healthy and well-adapted to various climates.',
            temperament: ['Calm', 'Well-trained', 'People-friendly', 'Reliable'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'PPR', dateGiven: '2024-05-15', nextDue: '2025-05-15' },
              { vaccine: 'Camel Pox', dateGiven: '2024-05-15', nextDue: '2025-05-15' }
            ],
            microchipped: true,
            spayedNeutered: false
          },
          listingType: 'SALE',
          price: 6500,
          description: 'Sultan is a magnificent dromedary camel perfect for tourism operations, educational programs, or breeding. He is well-trained, healthy, and has a gentle disposition making him suitable for various activities.',
          status: 'AVAILABLE',
          createdAt: '2024-10-05',
          location: 'Phoenix, AZ',
          owner: {
            firstName: 'Ahmed',
            lastName: 'Hassan',
            email: 'ahmed.hassan@camelrides.com',
            phone: '(555) 890-1234',
            isVerified: true,
            memberSince: '2019-02-28',
            totalListings: 7
          }
        },
        '20': {
          id: '20',
          pet: {
            id: 'pet-20',
            name: 'Penny',
            species: 'CHICKEN',
            breed: 'Rhode Island Red',
            age: 1,
            gender: 'FEMALE',
            color: 'Red-brown',
            weight: '6.5 lbs',
            photos: [
              'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80',
              'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=800&q=80',
              'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=800&q=80'
            ],
            description: 'Penny is an excellent laying hen producing 5-6 large brown eggs per week. She is healthy, friendly, and gets along well with other chickens. Great addition to any backyard flock.',
            temperament: ['Friendly', 'Productive', 'Calm', 'Social'],
            healthRecords: [],
            vaccinations: [
              { vaccine: 'Newcastle Disease', dateGiven: '2024-07-01', nextDue: '2025-07-01' },
              { vaccine: 'Marek\'s Disease', dateGiven: '2024-01-15', nextDue: 'Lifetime' }
            ],
            microchipped: false,
            spayedNeutered: false
          },
          listingType: 'SALE',
          price: 25,
          description: 'Penny is a wonderful laying hen perfect for backyard egg production. She is healthy, friendly, and a consistent layer of large brown eggs. Great temperament around children and other chickens.',
          status: 'AVAILABLE',
          createdAt: '2024-10-08',
          location: 'Portland, OR',
          owner: {
            firstName: 'Lisa',
            lastName: 'Green',
            email: 'lisa.green@homestead.com',
            phone: '(555) 901-2345',
            isVerified: true,
            memberSince: '2023-04-10',
            totalListings: 4
          }
        }
      }

      const mockListing = mockListings[listingId] || mockListings['1']
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

  if (isLoading || currencyLoading) {
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
              <div className="h-96 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
                {listing.pet.photos && listing.pet.photos.length > 0 ? (
                  <img
                    src={listing.pet.photos[currentImageIndex]}
                    alt={listing.pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-8xl">
                    {listing.pet.species === 'CAT' || listing.pet.species === 'cat' ? '🐱' :
                     listing.pet.species === 'DOG' || listing.pet.species === 'dog' ? '🐕' :
                     listing.pet.species === 'FISH' || listing.pet.species === 'fish' ? '🐠' :
                     listing.pet.species === 'BIRD' || listing.pet.species === 'bird' ? '🐦' :
                     listing.pet.species === 'RABBIT' || listing.pet.species === 'rabbit' ? '🐰' :
                     listing.pet.species === 'COW' ? '🐄' :
                     listing.pet.species === 'HORSE' ? '🐴' :
                     listing.pet.species === 'GOAT' ? '🐐' :
                     listing.pet.species === 'SHEEP' ? '🐑' :
                     listing.pet.species === 'OX' ? '🐂' :
                     listing.pet.species === 'BUFFALO' ? '🐃' :
                     listing.pet.species === 'CAMEL' ? '🐪' :
                     listing.pet.species === 'CHICKEN' ? '🐔' :
                     listing.pet.species === 'DUCK' ? '🦆' :
                     listing.pet.species === 'TURKEY' ? '🦃' : '🐾'}
                  </div>
                )}
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

              {/* Image thumbnails */}
              {listing.pet.photos && listing.pet.photos.length > 1 && (
                <div className="p-4 bg-white/60 backdrop-blur-sm">
                  <div className="flex gap-2 overflow-x-auto">
                    {listing.pet.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex ? 'border-teal-500 scale-105' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${listing.pet.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                    <div className="text-3xl font-bold text-gray-900">{formatPrice(listing.price)}</div>
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
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
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