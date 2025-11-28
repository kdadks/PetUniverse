'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Settings,
  BarChart3,
  Package,
  MessageSquare,
  FileText,
  Activity
} from 'lucide-react'

interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  averageRating: number
  totalClients: number
  pendingBookings: number
  completedBookings: number
  activeServices: number
}

export default function ProviderDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalClients: 0,
    pendingBookings: 0,
    completedBookings: 0,
    activeServices: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const providerTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'services', label: 'My Services', icon: Package },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      // Check if user is a service provider
      if (session.user.role !== 'SERVICE_PROVIDER') {
        router.push('/provider/onboarding')
      } else {
        fetchDashboardData()
      }
    }
  }, [status, router, session])

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls for dashboard data
      // In a real app, these would be actual API endpoints
      setStats({
        totalBookings: 42,
        totalRevenue: 3420,
        averageRating: 4.8,
        totalClients: 28,
        pendingBookings: 5,
        completedBookings: 37,
        activeServices: 8
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <div className="bg-teal-50/50 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Provider Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <Link
                href="/provider/services"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tab Navigation */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 mb-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {providerTabs.map((tab, index) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% from last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8% from last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= stats.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">Based on 28 reviews</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalClients}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15% from last month</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/provider/services"
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Add New Service</span>
                  </div>
                </Link>

                <Link
                  href="/provider/bookings"
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="font-medium">View Bookings</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.pendingBookings}
                  </span>
                </Link>

                <Link
                  href="/provider/analytics"
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">View Analytics</span>
                  </div>
                </Link>

                <Link
                  href="/provider/settings"
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Settings</span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                <Link
                  href="/provider/bookings"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {/* Sample booking items */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Dog Grooming - Max</p>
                      <p className="text-sm text-gray-600">Sarah Johnson • Today at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Pending
                    </span>
                    <span className="font-semibold text-gray-900">$75</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Cat Health Checkup - Whiskers</p>
                      <p className="text-sm text-gray-600">Mike Brown • Yesterday at 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                    <span className="font-semibold text-gray-900">$120</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Pet Training Session - Buddy</p>
                      <p className="text-sm text-gray-600">Lisa Davis • Tomorrow at 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Confirmed
                    </span>
                    <span className="font-semibold text-gray-900">$90</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
                <p className="text-sm text-gray-600">Completed Bookings</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <Star className="h-8 w-8" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.activeServices}</p>
                <p className="text-sm text-gray-600">Active Services</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                <p className="text-sm text-gray-600">Pending Bookings</p>
              </div>
            </div>
          </motion.div>
            </>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Bookings Management</h3>
                <div className="flex space-x-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Bookings</option>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-gradient-to-r from-white to-blue-50/50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Booking #{1000 + i}</h4>
                          <p className="text-sm text-gray-600">Customer: John Doe • Pet: Max (Golden Retriever)</p>
                          <p className="text-sm text-gray-600">Service: Dog Grooming</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">📅 Jan {i + 20}, 2025 at 2:00 PM</span>
                            <span className="text-sm text-gray-600">💰 $85</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          i % 3 === 0 ? 'bg-yellow-100 text-yellow-800' :
                          i % 3 === 1 ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'Confirmed' : 'In Progress'}
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                            View Details
                          </button>
                          {i % 3 === 0 && (
                            <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                              Accept
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">My Services</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Dog Grooming', price: '$75', category: 'Grooming', status: 'Active', bookings: 24 },
                  { name: 'Cat Health Checkup', price: '$120', category: 'Veterinary', status: 'Active', bookings: 18 },
                  { name: 'Pet Training', price: '$90', category: 'Training', status: 'Active', bookings: 12 },
                  { name: 'Pet Sitting', price: '$45/day', category: 'Care', status: 'Paused', bookings: 8 },
                  { name: 'Nail Trimming', price: '$25', category: 'Grooming', status: 'Active', bookings: 35 },
                  { name: 'Vaccination', price: '$150', category: 'Veterinary', status: 'Active', bookings: 16 }
                ].map((service, i) => (
                  <div key={i} className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {service.status}
                      </span>
                      <span className="text-sm text-gray-600">{service.category}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900">{service.price}</span>
                      <span className="text-sm text-gray-600">{service.bookings} bookings</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          {service.status === 'Active' ? 'Pause' : 'Activate'}
                        </button>
                      </div>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">My Clients</h3>
                <div className="flex space-x-3">
                  <input
                    type="search"
                    placeholder="Search clients..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Pet(s)</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Bookings</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Spent</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: 'Sarah Johnson', email: 'sarah@example.com', pets: ['Max (Dog)', 'Luna (Cat)'], bookings: 8, lastService: 'Dog Grooming', totalSpent: 680, lastDate: 'Jan 15' },
                      { name: 'Mike Brown', email: 'mike@example.com', pets: ['Whiskers (Cat)'], bookings: 5, lastService: 'Health Checkup', totalSpent: 450, lastDate: 'Jan 12' },
                      { name: 'Lisa Davis', email: 'lisa@example.com', pets: ['Buddy (Dog)', 'Charlie (Dog)'], bookings: 12, lastService: 'Training Session', totalSpent: 890, lastDate: 'Jan 18' },
                      { name: 'Tom Wilson', email: 'tom@example.com', pets: ['Fluffy (Cat)'], bookings: 3, lastService: 'Nail Trimming', totalSpent: 175, lastDate: 'Jan 10' }
                    ].map((client, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-500">{client.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            {client.pets.map((pet, j) => (
                              <div key={j} className="text-sm text-gray-600">{pet}</div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">{client.bookings}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{client.lastService}</p>
                            <p className="text-sm text-gray-500">{client.lastDate}, 2025</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">${client.totalSpent}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm">Contact</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{stats.averageRating}/5</span>
                    <span className="text-gray-600">(28 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: 'Sarah Johnson', rating: 5, date: 'Jan 15, 2025', service: 'Dog Grooming', comment: 'Absolutely fantastic service! Max looks amazing and the groomer was so gentle with him. Will definitely book again.' },
                  { name: 'Mike Brown', rating: 5, date: 'Jan 12, 2025', service: 'Health Checkup', comment: 'Very thorough examination. The vet explained everything clearly and Whiskers seemed comfortable throughout.' },
                  { name: 'Lisa Davis', rating: 4, date: 'Jan 10, 2025', service: 'Training Session', comment: 'Great progress with Buddy! The trainer is patient and uses effective techniques. Would recommend.' },
                  { name: 'Tom Wilson', rating: 5, date: 'Jan 8, 2025', service: 'Nail Trimming', comment: 'Quick and professional service. Fluffy didn\'t stress at all, which is rare! Thank you.' }
                ].map((review, i) => (
                  <div key={i} className="bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.service} • {review.date}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Revenue Trends</h4>
                    <div className="h-64 bg-white/50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Booking Statistics</h4>
                    <div className="h-64 bg-white/50 rounded-lg flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Services</h4>
                  <div className="space-y-3">
                    {['Dog Grooming', 'Health Checkup', 'Nail Trimming', 'Pet Training'].map((service, i) => (
                      <div key={service} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{service}</span>
                        <span className="font-medium">{(4 - i) * 8} bookings</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h4 className="font-semibold text-gray-900 mb-4">Monthly Revenue</h4>
                  <div className="space-y-3">
                    {['January', 'December', 'November', 'October'].map((month, i) => (
                      <div key={month} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{month}</span>
                        <span className="font-medium">${(4 - i) * 850}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h4 className="font-semibold text-gray-900 mb-4">Client Satisfaction</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{stats.averageRating}/5</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= stats.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Based on 28 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Provider Settings</h3>

              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Business Information</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        defaultValue="Pet Care Services"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                      <textarea
                        defaultValue="123 Pet Street, Animal City, AC 12345"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                      <textarea
                        defaultValue="Professional pet care services with over 5 years of experience. Specializing in dog grooming, health checkups, and pet training."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Availability Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Accept New Bookings</p>
                        <p className="text-sm text-gray-600">Allow customers to book your services</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Instant Booking</p>
                        <p className="text-sm text-gray-600">Allow customers to book without approval</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}