'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Check,
  X,
  MessageSquare
} from 'lucide-react'

interface Booking {
  id: string
  clientName: string
  clientEmail: string
  petName: string
  petType: string
  service: string
  date: string
  time: string
  duration: string
  price: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

const mockBookings: Booking[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    petName: 'Max',
    petType: 'Dog',
    service: 'Dog Grooming',
    date: '2024-12-09',
    time: '2:00 PM',
    duration: '1 hour',
    price: 75,
    status: 'pending',
    notes: 'First time grooming, please be gentle'
  },
  {
    id: '2',
    clientName: 'Mike Brown',
    clientEmail: 'mike@example.com',
    petName: 'Whiskers',
    petType: 'Cat',
    service: 'Cat Health Checkup',
    date: '2024-12-08',
    time: '10:00 AM',
    duration: '30 mins',
    price: 120,
    status: 'completed'
  },
  {
    id: '3',
    clientName: 'Lisa Davis',
    clientEmail: 'lisa@example.com',
    petName: 'Buddy',
    petType: 'Dog',
    service: 'Pet Training Session',
    date: '2024-12-10',
    time: '3:00 PM',
    duration: '2 hours',
    price: 90,
    status: 'confirmed'
  },
  {
    id: '4',
    clientName: 'John Smith',
    clientEmail: 'john@example.com',
    petName: 'Luna',
    petType: 'Cat',
    service: 'Pet Sitting',
    date: '2024-12-11',
    time: '9:00 AM',
    duration: '4 hours',
    price: 60,
    status: 'pending'
  },
  {
    id: '5',
    clientName: 'Emma Wilson',
    clientEmail: 'emma@example.com',
    petName: 'Charlie',
    petType: 'Dog',
    service: 'Dog Walking',
    date: '2024-12-07',
    time: '8:00 AM',
    duration: '1 hour',
    price: 25,
    status: 'cancelled'
  }
]

export default function BookingsPage() {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    ))
    setSelectedBooking(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />
      case 'confirmed': return <Clock className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return null
    }
  }

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Calendar className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Bookings
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 rounded-xl p-4 border border-yellow-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Confirmed</p>
                <p className="text-2xl font-bold text-blue-800">{stats.confirmed}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 rounded-xl p-4 border border-green-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-red-50 rounded-xl p-4 border border-red-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-800">{stats.cancelled}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
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
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client & Pet</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{booking.clientName}</p>
                        <p className="text-sm text-gray-500">{booking.petName} ({booking.petType})</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{booking.service}</p>
                      <p className="text-sm text-gray-500">{booking.duration}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{booking.date}</p>
                      <p className="text-sm text-gray-500">{booking.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">${booking.price}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="capitalize">{booking.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirm"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'completed')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mark Complete"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Message Client"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium">{selectedBooking.clientName}</p>
                  <p className="text-sm text-gray-600">{selectedBooking.clientEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pet</p>
                  <p className="font-medium">{selectedBooking.petName} ({selectedBooking.petType})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{selectedBooking.service}</p>
                  <p className="text-sm text-gray-600">Duration: {selectedBooking.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{selectedBooking.date} at {selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium text-lg">${selectedBooking.price}</p>
                </div>
                {selectedBooking.notes && (
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-gray-700">{selectedBooking.notes}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {getStatusIcon(selectedBooking.status)}
                    <span className="capitalize">{selectedBooking.status}</span>
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Confirm Booking
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Mark as Completed
                  </button>
                )}
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ProviderLayout>
  )
}
