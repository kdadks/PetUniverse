'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age?: number
  weight?: number
  gender?: string
  color?: string
  microchipId?: string
  description?: string
  photos: string[]
  createdAt: string
  healthRecords: HealthRecord[]
  vaccinations: Vaccination[]
  bookings: Booking[]
}

interface HealthRecord {
  id: string
  recordType: string
  title: string
  description?: string
  diagnosis?: string
  treatment?: string
  recordDate: string
  veterinarian?: string
  clinicName?: string
}

interface Vaccination {
  id: string
  vaccineName: string
  vaccineType: string
  dateGiven: string
  nextDueDate?: string
  veterinarian?: string
  clinicName?: string
  notes?: string
}

interface Booking {
  id: string
  scheduledDate: string
  scheduledTime: string
  status: string
  service: {
    name: string
    category: string
  }
  provider: {
    businessName: string
    user: {
      firstName: string
      lastName: string
    }
  }
}

export default function PetDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [pet, setPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && params.id) {
      fetchPet()
    }
  }, [status, router, params.id])

  const fetchPet = async () => {
    try {
      const response = await fetch(`/api/pets/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setPet(data.pet)
      } else {
        router.push('/pets')
      }
    } catch (error) {
      console.error('Error fetching pet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pet not found</h2>
          <Link href="/pets" className="text-blue-600 hover:text-blue-800">
            ← Back to Pets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <header className="bg-teal-50/50 backdrop-blur-sm shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/pets" className="text-blue-600 hover:text-blue-800">
                ← Back to Pets
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
              <span className="text-lg text-gray-600 capitalize">({pet.species})</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Pet Overview Card */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-6xl">🐾</span>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Breed</h3>
                      <p className="mt-1 text-sm text-gray-900">{pet.breed}</p>
                    </div>
                    {pet.age && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Age</h3>
                        <p className="mt-1 text-sm text-gray-900">{pet.age} years</p>
                      </div>
                    )}
                    {pet.weight && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                        <p className="mt-1 text-sm text-gray-900">{pet.weight} kg</p>
                      </div>
                    )}
                    {pet.gender && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                        <p className="mt-1 text-sm text-gray-900">{pet.gender}</p>
                      </div>
                    )}
                    {pet.color && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Color</h3>
                        <p className="mt-1 text-sm text-gray-900">{pet.color}</p>
                      </div>
                    )}
                    {pet.microchipId && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Microchip ID</h3>
                        <p className="mt-1 text-sm text-gray-900">{pet.microchipId}</p>
                      </div>
                    )}
                  </div>
                  {pet.description && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500">Description</h3>
                      <p className="mt-1 text-sm text-gray-900">{pet.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('health')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'health'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Health Records ({pet.healthRecords.length})
                </button>
                <button
                  onClick={() => setActiveTab('vaccinations')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'vaccinations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Vaccinations ({pet.vaccinations.length})
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'bookings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Service History ({pet.bookings.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{pet.healthRecords.length}</div>
                    <div className="text-sm text-gray-600">Health Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{pet.vaccinations.length}</div>
                    <div className="text-sm text-gray-600">Vaccinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{pet.bookings.length}</div>
                    <div className="text-sm text-gray-600">Services Booked</div>
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="space-y-4">
                  {pet.healthRecords.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No health records yet</p>
                  ) : (
                    pet.healthRecords.map((record) => (
                      <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{record.title}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(record.recordDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Type: {record.recordType}</p>
                        {record.description && <p className="text-sm text-gray-600 mb-2">{record.description}</p>}
                        {record.diagnosis && <p className="text-sm text-gray-600 mb-2"><strong>Diagnosis:</strong> {record.diagnosis}</p>}
                        {record.treatment && <p className="text-sm text-gray-600 mb-2"><strong>Treatment:</strong> {record.treatment}</p>}
                        {record.veterinarian && (
                          <p className="text-sm text-gray-500">
                            Dr. {record.veterinarian} {record.clinicName && `at ${record.clinicName}`}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'vaccinations' && (
                <div className="space-y-4">
                  {pet.vaccinations.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No vaccination records yet</p>
                  ) : (
                    pet.vaccinations.map((vaccination) => (
                      <div key={vaccination.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{vaccination.vaccineName}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(vaccination.dateGiven).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Type: {vaccination.vaccineType}</p>
                        {vaccination.nextDueDate && (
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Next Due:</strong> {new Date(vaccination.nextDueDate).toLocaleDateString()}
                          </p>
                        )}
                        {vaccination.notes && <p className="text-sm text-gray-600 mb-2">{vaccination.notes}</p>}
                        {vaccination.veterinarian && (
                          <p className="text-sm text-gray-500">
                            Dr. {vaccination.veterinarian} {vaccination.clinicName && `at ${vaccination.clinicName}`}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {pet.bookings.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No service bookings yet</p>
                  ) : (
                    pet.bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{booking.service.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Category: {booking.service.category}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          Date: {new Date(booking.scheduledDate).toLocaleDateString()} at {booking.scheduledTime}
                        </p>
                        <p className="text-sm text-gray-500">
                          Provider: {booking.provider.businessName}
                          ({booking.provider.user.firstName} {booking.provider.user.lastName})
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}