'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Plus,
  Heart,
  Calendar,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  User,
  PawPrint,
  Camera,
  Edit,
  Trash2,
  X
} from 'lucide-react'

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  gender: string
  color: string
  weight: number
  photos: string[]
  isActive: boolean
  microchipId?: string
  description: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [pets, setPets] = useState<Pet[]>([])
  const [isAddingPet, setIsAddingPet] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [newPet, setNewPet] = useState<Partial<Pet>>({
    name: '',
    species: 'dog',
    breed: '',
    age: 1,
    gender: 'MALE',
    color: '',
    weight: 0,
    description: ''
  })

  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'my-pets', label: 'My Pets', icon: '🐾' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'health-records', label: 'Health Records', icon: '🏥' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' }
  ]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      // Redirect admin users to admin dashboard
      if (session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') {
        router.push('/admin')
        return
      }
      fetchPets()
    }
  }, [status, router, session])

  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets')
      if (response.ok) {
        const data = await response.json()
        setPets(data.pets || [])
      }
    } catch (error) {
      console.error('Error fetching pets:', error)
    }
  }



  const handleAddPet = async () => {
    if (!newPet.name || !newPet.breed) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newPet.name,
          species: newPet.species,
          breed: newPet.breed,
          age: newPet.age,
          gender: newPet.gender,
          color: newPet.color,
          weight: newPet.weight,
          description: newPet.description
        })
      })

      if (response.ok) {
        const data = await response.json()
        setPets([...pets, data.pet])
        setIsAddingPet(false)
        setNewPet({
          name: '',
          species: 'dog',
          breed: '',
          age: 1,
          gender: 'MALE',
          color: '',
          weight: 0,
          description: ''
        })
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error adding pet:', error)
      alert('Failed to add pet. Please try again.')
    }
  }

  const handleDeletePet = async (petId: string) => {
    if (confirm('Are you sure you want to remove this pet?')) {
      try {
        const response = await fetch(`/api/pets/${petId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          setPets(pets.filter(pet => pet.id !== petId))
        } else {
          const errorData = await response.json()
          alert(`Error: ${errorData.message}`)
        }
      } catch (error) {
        console.error('Error deleting pet:', error)
        alert('Failed to delete pet. Please try again.')
      }
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <div className="bg-teal-50/50 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pet Owner Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session.user?.name || session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/20 mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PawPrint className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{pets.length}</p>
                  <p className="text-sm text-gray-600">My Pets</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-sm text-gray-600">Upcoming Appointments</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Active Orders</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                </div>
              </div>
            </motion.div>
          </div>


          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Book Services</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Schedule grooming, vet appointments, training, and more.
              </p>
              <Link
                href="/services"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 inline-block"
              >
                Browse Services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Shop Products</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Browse food, toys, accessories, and health supplements.
              </p>
              <Link
                href="/products"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 inline-block"
              >
                Start Shopping
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Find Companions</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Discover pets for adoption or find breeding partners.
              </p>
              <Link
                href="/marketplace"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 inline-block"
              >
                Browse Marketplace
              </Link>
            </motion.div>
          </div>
          </>
          )}

          {/* My Pets Tab */}
          {activeTab === 'my-pets' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Pets</h2>
                <button
                  onClick={() => setIsAddingPet(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Pet</span>
                </button>
              </div>

              {pets.length === 0 ? (
                <div className="text-center py-8">
                  <PawPrint className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pets yet</h3>
                  <p className="text-gray-600 mb-4">Add your first pet to get started!</p>
                  <button
                    onClick={() => setIsAddingPet(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Add Your First Pet
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pets.map((pet, index) => (
                    <motion.div
                      key={pet.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-4xl">
                            {pet.species === 'dog' ? '🐕' :
                             pet.species === 'cat' ? '🐱' :
                             pet.species === 'fish' ? '🐠' :
                             pet.species === 'bird' ? '🐦' :
                             pet.species === 'rabbit' ? '🐰' : '🐾'}
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button className="bg-white/80 p-1 rounded-full hover:bg-white transition-colors duration-300">
                            <Edit className="h-3 w-3 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDeletePet(pet.id)}
                            className="bg-white/80 p-1 rounded-full hover:bg-white transition-colors duration-300"
                          >
                            <Trash2 className="h-3 w-3 text-red-600" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{pet.name}</h3>
                        <p className="text-gray-600 text-sm">{pet.breed}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{pet.age} years old</span>
                          <span>{pet.weight} lbs</span>
                        </div>
                        <p className="text-gray-600 text-xs line-clamp-2">{pet.description}</p>
                        <div className="flex space-x-2 pt-2">
                          <Link
                            href={`/pets/${pet.id}`}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg text-center transition-colors duration-300"
                          >
                            View Profile
                          </Link>
                          <button className="bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-300">
                            Book Care
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Appointments</h2>
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
                <p className="text-gray-600 mb-4">Book your first service to get started!</p>
                <Link
                  href="/services"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-block"
                >
                  Browse Services
                </Link>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
              <div className="text-center py-8">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-4">Start shopping for your pets!</p>
                <Link
                  href="/products"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-block"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          )}

          {/* Health Records Tab */}
          {activeTab === 'health-records' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Records</h2>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No health records yet</h3>
                <p className="text-gray-600 mb-4">Add pets to start tracking their health records</p>
                {pets.length === 0 ? (
                  <button
                    onClick={() => setActiveTab('my-pets')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Add Pets First
                  </button>
                ) : (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Add Health Record
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Favorites</h2>
              <div className="text-center py-8">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-600 mb-4">Save services, products, and pets you love!</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/services"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Browse Services
                  </Link>
                  <Link
                    href="/products"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Shop Products
                  </Link>
                  <Link
                    href="/marketplace"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Find Pets
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Add Pet Modal */}
      {isAddingPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Pet</h2>
              <button
                onClick={() => setIsAddingPet(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name *
                </label>
                <input
                  type="text"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter pet name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Species *
                </label>
                <select
                  value={newPet.species}
                  onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="fish">Fish</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Breed *
                </label>
                <input
                  type="text"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter breed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={newPet.gender}
                    onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="UNKNOWN">Unknown</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={newPet.color}
                    onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Brown, White"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({ ...newPet, weight: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newPet.description}
                  onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Tell us about your pet's personality, habits, etc."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsAddingPet(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPet}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
                >
                  Add Pet
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}