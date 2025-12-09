'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Star,
  MessageSquare,
  MoreVertical,
  Dog,
  Cat
} from 'lucide-react'

interface Pet {
  name: string
  type: 'dog' | 'cat' | 'bird' | 'other'
  breed: string
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  pets: Pet[]
  totalBookings: number
  totalSpent: number
  lastVisit: string
  rating: number
  isFavorite: boolean
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    pets: [{ name: 'Max', type: 'dog', breed: 'Golden Retriever' }],
    totalBookings: 12,
    totalSpent: 840,
    lastVisit: '2024-12-05',
    rating: 5,
    isFavorite: true
  },
  {
    id: '2',
    name: 'Mike Brown',
    email: 'mike@example.com',
    phone: '+1 (555) 234-5678',
    pets: [{ name: 'Whiskers', type: 'cat', breed: 'Persian' }],
    totalBookings: 8,
    totalSpent: 560,
    lastVisit: '2024-12-08',
    rating: 4,
    isFavorite: false
  },
  {
    id: '3',
    name: 'Lisa Davis',
    email: 'lisa@example.com',
    phone: '+1 (555) 345-6789',
    pets: [
      { name: 'Buddy', type: 'dog', breed: 'Labrador' },
      { name: 'Bella', type: 'dog', breed: 'Beagle' }
    ],
    totalBookings: 15,
    totalSpent: 1250,
    lastVisit: '2024-12-01',
    rating: 5,
    isFavorite: true
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 456-7890',
    pets: [{ name: 'Luna', type: 'cat', breed: 'Siamese' }],
    totalBookings: 5,
    totalSpent: 320,
    lastVisit: '2024-11-28',
    rating: 4,
    isFavorite: false
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+1 (555) 567-8901',
    pets: [{ name: 'Charlie', type: 'dog', breed: 'Poodle' }],
    totalBookings: 20,
    totalSpent: 1680,
    lastVisit: '2024-12-07',
    rating: 5,
    isFavorite: true
  }
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.pets.some(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filter === 'all' || 
      (filter === 'favorites' && client.isFavorite) ||
      (filter === 'recent' && new Date(client.lastVisit) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    return matchesSearch && matchesFilter
  })

  const toggleFavorite = (clientId: string) => {
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, isFavorite: !c.isFavorite } : c
    ))
  }

  const getPetIcon = (type: string) => {
    switch (type) {
      case 'dog': return <Dog className="h-4 w-4" />
      case 'cat': return <Cat className="h-4 w-4" />
      default: return <Dog className="h-4 w-4" />
    }
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              My Clients
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            {clients.length} total clients
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/20"
          >
            <p className="text-sm text-gray-600">Total Clients</p>
            <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/20"
          >
            <p className="text-sm text-gray-600">Favorite Clients</p>
            <p className="text-2xl font-bold text-yellow-600">{clients.filter(c => c.isFavorite).length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/20"
          >
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">${clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/20"
          >
            <p className="text-sm text-gray-600">Total Pets</p>
            <p className="text-2xl font-bold text-purple-600">{clients.reduce((sum, c) => sum + c.pets.length, 0)}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients or pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Clients</option>
              <option value="favorites">Favorites</option>
              <option value="recent">Recent (Last 7 days)</option>
            </select>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(client.id)}
                  className={`p-2 rounded-lg transition-colors ${client.isFavorite ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <Star className={`h-5 w-5 ${client.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Last visit: {client.lastVisit}</span>
                </div>
              </div>

              {/* Pets */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Pets</p>
                <div className="flex flex-wrap gap-2">
                  {client.pets.map((pet, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs"
                    >
                      {getPetIcon(pet.type)}
                      <span>{pet.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Total Bookings</p>
                  <p className="font-semibold text-gray-900">{client.totalBookings}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Spent</p>
                  <p className="font-semibold text-green-600">${client.totalSpent}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Message</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Book</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No clients found matching your criteria.</p>
          </div>
        )}
      </div>
    </ProviderLayout>
  )
}
