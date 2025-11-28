'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Heart
} from 'lucide-react'

interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  provider: {
    id: string
    businessName: string
    averageRating: number
    totalReviews: number
    isVerified: boolean
    user: {
      firstName: string
      lastName: string
      email: string
    }
  }
}

interface Pet {
  id: string
  name: string
  species: string
  breed: string
}

export default function BookServicePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPet, setSelectedPet] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchService()
      fetchPets()
    }
  }, [status, router, params.id])

  const fetchService = async () => {
    try {
      // Mock service data - replace with actual API
      const mockService: Service = {
        id: params.id as string,
        name: 'Premium Dog Grooming',
        category: 'GROOMING',
        description: 'Full service grooming including bath, haircut, nail trimming, and ear cleaning',
        price: 75,
        duration: 120,
        provider: {
          id: 'provider-1',
          businessName: 'Pawsome Grooming',
          averageRating: 4.8,
          totalReviews: 127,
          isVerified: true,
          user: {
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah@pawsomegrooming.com'
          }
        }
      }
      setService(mockService)
    } catch (error) {
      console.error('Error fetching service:', error)
      router.push('/services')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPets = async () => {
    try {
      // Mock pets data - replace with actual API
      const mockPets: Pet[] = [
        { id: '1', name: 'Max', species: 'dog', breed: 'Golden Retriever' },
        { id: '2', name: 'Luna', species: 'cat', breed: 'Persian' },
      ]
      setPets(mockPets)
    } catch (error) {
      console.error('Error fetching pets:', error)
    }
  }

  const handleBooking = async () => {
    if (!selectedPet || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields')
      return
    }

    setIsBooking(true)
    try {
      const bookingData = {
        serviceId: service?.id,
        providerId: service?.provider.id,
        petId: selectedPet,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        duration: service?.duration,
        totalAmount: service?.price,
        notes
      }

      // Mock API call - replace with actual booking API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Redirect to success page or dashboard
      router.push('/bookings/success')
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  // Generate next 14 days for date selection
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date.toISOString().split('T')[0]
  })

  if (status === 'loading' || isLoading) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h2>
          <Link href="/services" className="text-blue-600 hover:text-blue-800">
            ← Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16 pt-16">
      <div className="bg-gradient-to-r from-teal-100/80 via-cyan-100/80 to-emerald-100/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/services" className="text-teal-600 hover:text-teal-800 transition-colors duration-300">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Book Service
              </h1>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      step <= currentStep
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-24 h-1 mx-2 ${
                        step < currentStep ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Service Details</span>
              <span>Date & Time</span>
              <span>Confirmation</span>
            </div>
          </div>

          {/* Service Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8"
          >
            <div className="flex items-start space-x-6">
              <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-4 rounded-xl">
                <Heart className="h-8 w-8 text-teal-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{service.provider.averageRating} ({service.provider.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">${service.price}</div>
                    {service.provider.isVerified && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2">
                        Verified Provider
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Service Provider</h3>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 rounded-full p-2">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{service.provider.businessName}</p>
                  <p className="text-sm text-gray-600">
                    {service.provider.user.firstName} {service.provider.user.lastName}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
          >
            {/* Step 1: Pet Selection */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Select Your Pet</h3>
                <div className="space-y-4">
                  {pets.map((pet) => (
                    <label
                      key={pet.id}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedPet === pet.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pet"
                        value={pet.id}
                        checked={selectedPet === pet.id}
                        onChange={(e) => setSelectedPet(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : '🐾'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{pet.name}</p>
                          <p className="text-sm text-gray-600">{pet.breed} • {pet.species}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {pets.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You don't have any pets registered yet.</p>
                    <Link
                      href="/pets"
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
                    >
                      Add Your First Pet
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Date & Time</h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a date</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDate && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm rounded-lg border transition-all duration-300 ${
                            selectedTime === time
                              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-transparent'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-teal-500'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions or requirements for your pet..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Confirm Your Booking</h3>

                <div className="space-y-4 mb-6">
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Service:</span>
                        <p className="font-medium">{service.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Pet:</span>
                        <p className="font-medium">{pets.find(p => p.id === selectedPet)?.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p className="font-medium">
                          {new Date(selectedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <p className="font-medium">{selectedTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-medium">{service.duration} minutes</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <p className="font-bold text-lg">${service.price}</p>
                      </div>
                    </div>
                  </div>

                  {notes && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Special Notes</h4>
                      <p className="text-sm text-gray-700">{notes}</p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Information</h4>
                  <p className="text-sm text-gray-600">
                    Payment will be processed after the service is completed. You can pay with credit card,
                    debit card, or digital wallet through our secure payment system.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !selectedPet) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime))
                  }
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                >
                  {isBooking ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}