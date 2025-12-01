'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  EyeOff,
  Clock,
  DollarSign,
  Tag,
  ArrowLeft,
  Save,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react'
import { useCurrency } from '@/lib/useCurrency'

interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  isActive: boolean
  images: string[]
  features: string[]
}

export default function ProviderServicesManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { formatPrice } = useCurrency()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'GROOMING',
    description: '',
    price: 0,
    duration: 60,
    isActive: true,
    features: [''],
    images: [] as string[]
  })

  const categories = [
    'ALL',
    'GROOMING',
    'VETERINARY_CONSULTATION',
    'TRAINING',
    'PET_SITTING',
    'WALKING',
    'BOARDING',
    'LIVESTOCK_VETERINARY',
    'BREEDING_SERVICES',
    'ARTIFICIAL_INSEMINATION',
    'VACCINATION',
    'MILK_TESTING',
    'FEED_CONSULTATION',
    'FARM_VISIT'
  ]

  useEffect(() => {
    if (status === 'authenticated') {
      fetchServices()
    }
  }, [status])

  const fetchServices = async () => {
    try {
      // Mock data - replace with actual API call
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'Premium Dog Grooming',
          category: 'GROOMING',
          description: 'Complete professional grooming service for dogs of all sizes',
          price: 75,
          duration: 120,
          isActive: true,
          images: [
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
            'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'
          ],
          features: [
            'Premium organic shampoos',
            'Nail trimming and filing',
            'Ear cleaning',
            'Teeth brushing'
          ]
        },
        {
          id: '2',
          name: 'Cat Grooming & Bath',
          category: 'GROOMING',
          description: 'Specialized cat grooming with gentle techniques',
          price: 65,
          duration: 90,
          isActive: true,
          images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
          features: ['Gentle cat-safe bathing', 'Nail trimming', 'Brushing', 'Ear cleaning']
        },
        {
          id: '3',
          name: 'Puppy First Grooming',
          category: 'GROOMING',
          description: 'Gentle introduction to grooming for puppies',
          price: 50,
          duration: 60,
          isActive: false,
          images: [],
          features: ['Gentle handling', 'Basic bath', 'Nail trim', 'Positive experience']
        }
      ]
      setServices(mockServices)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateService = () => {
    setEditingService(null)
    setFormData({
      name: '',
      category: 'GROOMING',
      description: '',
      price: 0,
      duration: 60,
      isActive: true,
      features: [''],
      images: []
    })
    setIsModalOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price,
      duration: service.duration,
      isActive: service.isActive,
      features: service.features.length > 0 ? service.features : [''],
      images: service.images
    })
    setIsModalOpen(true)
  }

  const handleDeleteService = async (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        // API call to delete service
        setServices(services.filter((s) => s.id !== serviceId))
      } catch (error) {
        console.error('Error deleting service:', error)
      }
    }
  }

  const handleToggleActive = async (serviceId: string, currentStatus: boolean) => {
    try {
      // API call to toggle service status
      setServices(
        services.map((s) => (s.id === serviceId ? { ...s, isActive: !currentStatus } : s))
      )
    } catch (error) {
      console.error('Error toggling service status:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const serviceData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== '')
      }

      if (editingService) {
        // Update existing service
        setServices(
          services.map((s) =>
            s.id === editingService.id ? { ...s, ...serviceData } : s
          )
        )
      } else {
        // Create new service
        const newService: Service = {
          id: String(services.length + 1),
          ...serviceData
        }
        setServices([...services, newService])
      }

      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/provider/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateService}
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Service</span>
          </motion.button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative h-48 bg-gradient-to-br from-teal-100 to-emerald-100">
                {service.images.length > 0 ? (
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleToggleActive(service.id, service.isActive)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.isActive
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-400 text-white'
                    }`}
                  >
                    {service.isActive ? (
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <EyeOff className="h-3 w-3" />
                        <span>Hidden</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Service Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{service.name}</h3>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {service.category.replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-teal-600 font-semibold">
                    <DollarSign className="h-4 w-4" />
                    <span>{formatPrice(service.price)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} min</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Features: {service.features.length}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{service.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="flex-1 flex items-center justify-center space-x-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Service Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    {categories.filter((cat) => cat !== 'ALL').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Price and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: Number(e.target.value) })
                      }
                      min="15"
                      step="15"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-teal-600 hover:text-teal-800 text-sm flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Feature</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder="e.g., Premium organic shampoos"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Make service active (visible to customers)
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    <Save className="h-5 w-5" />
                    <span>{editingService ? 'Update Service' : 'Create Service'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
