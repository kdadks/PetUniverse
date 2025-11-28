'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users,
  Building2,
  Package,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  ShoppingCart,
  Heart,
  BarChart3,
  Settings,
  Shield,
  Activity,
  Warehouse,
  Store,
  Wrench
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalServiceProviders: number
  totalBookings: number
  totalRevenue: number
  totalProducts: number
  activeUsers: number
  pendingApprovals: number
  recentActivity: any[]
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalServiceProviders: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalProducts: 0,
    activeUsers: 0,
    pendingApprovals: 0,
    recentActivity: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [providers, setProviders] = useState([])
  const [providersLoading, setProvidersLoading] = useState(false)
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [services, setServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(false)
  const [inventory, setInventory] = useState([])
  const [inventoryLoading, setInventoryLoading] = useState(false)
  const [inventorySummary, setInventorySummary] = useState({})
  const [marketplace, setMarketplace] = useState([])
  const [marketplaceLoading, setMarketplaceLoading] = useState(false)
  const [marketplaceSummary, setMarketplaceSummary] = useState({})

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'providers', label: 'Service Providers', icon: Building2 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'services', label: 'Service Management', icon: Wrench },
    { id: 'inventory', label: 'Inventory Management', icon: Warehouse },
    { id: 'marketplace', label: 'Marketplace Management', icon: Store },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      // Check if user is admin
      if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
        router.push('/dashboard')
      } else {
        fetchAdminStats()
      }
    }
  }, [status, router, session])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch admin stats')
      }
      const adminStats = await response.json()
      setStats(adminStats)
    } catch (error) {
      console.error('Error fetching admin stats:', error)
      // Fallback to empty stats on error
      setStats({
        totalUsers: 0,
        totalServiceProviders: 0,
        totalBookings: 0,
        totalRevenue: 0,
        totalProducts: 0,
        activeUsers: 0,
        pendingApprovals: 0,
        recentActivity: []
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUsers = async (search = '', status = 'all', page = 1) => {
    setUsersLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        search,
        status
      })

      const response = await fetch(`/api/admin/users?${params}`)
      if (!response.ok) throw new Error('Failed to fetch users')

      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    } finally {
      setUsersLoading(false)
    }
  }

  const fetchProviders = async (status = 'all', page = 1) => {
    setProvidersLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        status
      })

      const response = await fetch(`/api/admin/providers?${params}`)
      if (!response.ok) throw new Error('Failed to fetch providers')

      const data = await response.json()
      setProviders(data.providers)
    } catch (error) {
      console.error('Error fetching providers:', error)
      setProviders([])
    } finally {
      setProvidersLoading(false)
    }
  }

  const fetchBookings = async (status = 'all', page = 1) => {
    setBookingsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        status
      })

      const response = await fetch(`/api/admin/bookings?${params}`)
      if (!response.ok) throw new Error('Failed to fetch bookings')

      const data = await response.json()
      setBookings(data.bookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setBookings([])
    } finally {
      setBookingsLoading(false)
    }
  }

  const fetchServices = async (category = 'all', status = 'all', page = 1) => {
    setServicesLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        category,
        status
      })

      const response = await fetch(`/api/admin/services?${params}`)
      if (!response.ok) throw new Error('Failed to fetch services')

      const data = await response.json()
      setServices(data.services)
    } catch (error) {
      console.error('Error fetching services:', error)
      setServices([])
    } finally {
      setServicesLoading(false)
    }
  }

  const fetchInventory = async (category = 'all', status = 'all', page = 1) => {
    setInventoryLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        category,
        status
      })

      const response = await fetch(`/api/admin/inventory?${params}`)
      if (!response.ok) throw new Error('Failed to fetch inventory')

      const data = await response.json()
      setInventory(data.inventory)
      setInventorySummary(data.summary)
    } catch (error) {
      console.error('Error fetching inventory:', error)
      setInventory([])
    } finally {
      setInventoryLoading(false)
    }
  }

  const fetchMarketplace = async (type = 'all', status = 'all', page = 1) => {
    setMarketplaceLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        type,
        status
      })

      const response = await fetch(`/api/admin/marketplace?${params}`)
      if (!response.ok) throw new Error('Failed to fetch marketplace')

      const data = await response.json()
      setMarketplace(data.listings)
      setMarketplaceSummary(data.summary)
    } catch (error) {
      console.error('Error fetching marketplace:', error)
      setMarketplace([])
    } finally {
      setMarketplaceLoading(false)
    }
  }

  const handleUserAction = async (userId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      })

      if (!response.ok) throw new Error('Failed to update user')

      // Refresh users list
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    }
  }

  const handleProviderAction = async (providerId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/providers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, action })
      })

      if (!response.ok) throw new Error('Failed to update provider')

      // Refresh providers list
      fetchProviders()
      // Also refresh stats to update pending approvals count
      fetchAdminStats()
    } catch (error) {
      console.error('Error updating provider:', error)
      alert('Failed to update provider')
    }
  }

  const handleServiceAction = async (serviceId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, action })
      })

      if (!response.ok) throw new Error('Failed to update service')

      await fetchServices()
    } catch (error) {
      console.error('Error updating service:', error)
      alert('Failed to update service')
    }
  }

  const handleInventoryAction = async (itemId: string, action: string, data?: any) => {
    try {
      const response = await fetch('/api/admin/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, action, ...data })
      })

      if (!response.ok) throw new Error('Failed to update inventory')

      await fetchInventory()
    } catch (error) {
      console.error('Error updating inventory:', error)
      alert('Failed to update inventory')
    }
  }

  const handleMarketplaceAction = async (listingId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/marketplace', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, action })
      })

      if (!response.ok) throw new Error('Failed to update marketplace listing')

      await fetchMarketplace()
    } catch (error) {
      console.error('Error updating marketplace listing:', error)
      alert('Failed to update marketplace listing')
    }
  }

  // Load data when tab changes
  useEffect(() => {
    switch (activeTab) {
      case 'users':
        fetchUsers()
        break
      case 'providers':
        fetchProviders()
        break
      case 'bookings':
        fetchBookings()
        break
      case 'services':
        fetchServices()
        break
      case 'inventory':
        fetchInventory()
        break
      case 'marketplace':
        fetchMarketplace()
        break
    }
  }, [activeTab])

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
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <span className="text-gray-700">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Alert Bar */}
          {stats.pendingApprovals > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  {stats.pendingApprovals} service provider applications pending approval
                </span>
                <button className="text-yellow-600 hover:text-yellow-800 underline">
                  Review Now
                </button>
              </div>
            </motion.div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 mb-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {adminTabs.map((tab, index) => {
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
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
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
                      <p className="text-sm font-medium text-gray-600">Service Providers</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalServiceProviders}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-green-600" />
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
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+15% from last month</span>
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
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+22% from last month</span>
                  </div>
                </motion.div>
              </div>

              {/* Dashboard Content Grid */}
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
                    <button
                      onClick={() => setActiveTab('users')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Manage Users</span>
                      </div>
                      <span className="text-sm text-gray-500">{stats.totalUsers}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('providers')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Review Providers</span>
                      </div>
                      {stats.pendingApprovals > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {stats.pendingApprovals}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab('reports')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">View Analytics</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <Settings className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">System Settings</span>
                      </div>
                    </button>
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.type === 'user_signup' ? 'bg-green-100 text-green-800' :
                          activity.type === 'provider_application' ? 'bg-yellow-100 text-yellow-800' :
                          activity.type === 'booking_completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.type.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Platform Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Activity className="h-8 w-8" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Package className="h-8 w-8" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Products Listed</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Star className="h-8 w-8" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">98.5%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
              </motion.div>

              {/* Status Cards */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">System Health</h4>
                      <p className="text-green-100">All systems operational</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">Server Uptime</h4>
                      <p className="text-blue-100">99.9% uptime</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">Security Status</h4>
                      <p className="text-purple-100">All secure</p>
                    </div>
                    <Shield className="h-8 w-8 text-purple-200" />
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">User Management</h3>
                <div className="flex space-x-3">
                  <input
                    type="search"
                    placeholder="Search users..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => fetchUsers(e.target.value)}
                  />
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => fetchUsers('', e.target.value)}
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active Users</option>
                    <option value="inactive">Inactive Users</option>
                  </select>
                </div>
              </div>

              {usersLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.length > 0 ? users.map((user: any) => (
                        <tr key={user.id} className="hover:bg-gray-50/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                {user.firstName?.[0] || user.email[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'
                                ? 'bg-red-100 text-red-800'
                                : user.role === 'SERVICE_PROVIDER'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                            {user.isVerified && (
                              <span className="ml-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Verified
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              {user.isActive ? (
                                <button
                                  onClick={() => handleUserAction(user.id, 'deactivate')}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Deactivate
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUserAction(user.id, 'activate')}
                                  className="text-green-600 hover:text-green-800 text-sm"
                                >
                                  Activate
                                </button>
                              )}
                              {!user.isVerified && (
                                <button
                                  onClick={() => handleUserAction(user.id, 'verify')}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Verify
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Service Provider Management</h3>
                <div className="flex space-x-3">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => fetchProviders(e.target.value)}
                  >
                    <option value="all">All Providers</option>
                    <option value="pending">Pending Approval</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {providersLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="grid gap-6">
                  {providers.length > 0 ? providers.map((provider: any) => (
                    <div key={provider.id} className="bg-gradient-to-r from-white to-blue-50/50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                            {provider.user.firstName?.[0] || provider.user.email[0].toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{provider.businessName}</h4>
                            <p className="text-sm text-gray-600">{provider.user.email}</p>
                            <p className="text-sm text-gray-600">{provider.user.firstName} {provider.user.lastName}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-600">Type: {provider.businessType.replace('_', ' ')}</span>
                              <span className="text-sm text-gray-600">
                                Rating: {provider.averageRating || 'N/A'}/5
                              </span>
                              <span className="text-sm text-gray-600">
                                Reviews: {provider.totalReviews}
                              </span>
                              <span className="text-sm text-gray-600">
                                Services: {provider._count.services}
                              </span>
                            </div>
                            {provider.description && (
                              <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                                {provider.description.length > 120
                                  ? `${provider.description.substring(0, 120)}...`
                                  : provider.description
                                }
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            !provider.isVerified
                              ? 'bg-yellow-100 text-yellow-800'
                              : provider.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {!provider.isVerified
                              ? 'Pending Review'
                              : provider.isActive
                              ? 'Active'
                              : 'Suspended'
                            }
                          </span>
                          <div className="flex space-x-2">
                            {!provider.isVerified && (
                              <>
                                <button
                                  onClick={() => handleProviderAction(provider.id, 'approve')}
                                  className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleProviderAction(provider.id, 'reject')}
                                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {provider.isVerified && provider.isActive && (
                              <button
                                onClick={() => handleProviderAction(provider.id, 'suspend')}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                              >
                                Suspend
                              </button>
                            )}
                            {provider.isVerified && !provider.isActive && (
                              <button
                                onClick={() => handleProviderAction(provider.id, 'reactivate')}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                              >
                                Reactivate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500">
                      No service providers found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Booking Management</h3>
                <div className="flex space-x-3">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => fetchBookings(e.target.value)}
                  >
                    <option value="all">All Bookings</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {bookingsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Booking ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Provider</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.length > 0 ? bookings.map((booking: any) => (
                        <tr key={booking.id} className="hover:bg-gray-50/50">
                          <td className="py-3 px-4 font-mono text-sm">#{booking.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {booking.customer.firstName} {booking.customer.lastName}
                              </p>
                              <p className="text-sm text-gray-500">{booking.customer.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">{booking.service.name}</p>
                            <p className="text-sm text-gray-500">{booking.service.category.replace('_', ' ')}</p>
                            {booking.pet && (
                              <p className="text-sm text-gray-500">Pet: {booking.pet.name}</p>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">{booking.provider.businessName}</p>
                            <p className="text-sm text-gray-500">
                              {booking.provider.user.firstName} {booking.provider.user.lastName}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-600">
                              {new Date(booking.scheduledDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">{booking.scheduledTime}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                              booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">
                            ${booking.totalAmount}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">
                            No bookings found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Service Management Tab */}
          {activeTab === 'services' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Service Management</h3>
                <div className="flex space-x-3">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => fetchServices('all', e.target.value)}
                  >
                    <option value="all">All Services</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending_approval">Pending Approval</option>
                    <option value="featured">Featured</option>
                  </select>
                  <button
                    onClick={() => fetchServices()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {servicesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                      <tr>
                        <th className="px-6 py-3">Service</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Provider</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Bookings</th>
                        <th className="px-6 py-3">Rating</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.length > 0 ? services.map((service: any) => (
                        <tr key={service.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{service.name}</div>
                              <div className="text-gray-500 text-sm">{service.duration} min</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {service.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">{service.provider.businessName}</div>
                              <div className="text-sm text-gray-500">
                                {service.provider.user.firstName} {service.provider.user.lastName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">${service.basePrice}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {service.isActive ? 'Active' : 'Inactive'}
                              </span>
                              {service.featured && (
                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                  Featured
                                </span>
                              )}
                              {service.requiresApproval && (
                                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                                  Pending
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">{service.bookingCount}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1">{service.averageRating}</span>
                              <span className="text-gray-500 ml-1">({service.reviewCount})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              {service.requiresApproval && (
                                <button
                                  className="text-green-600 hover:text-green-900 text-sm"
                                  onClick={() => handleServiceAction(service.id, 'approve')}
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                className={`text-sm ${service.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                onClick={() => handleServiceAction(service.id, service.isActive ? 'deactivate' : 'activate')}
                              >
                                {service.isActive ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                className={`text-sm ${service.featured ? 'text-gray-600 hover:text-gray-900' : 'text-blue-600 hover:text-blue-900'}`}
                                onClick={() => handleServiceAction(service.id, service.featured ? 'unfeature' : 'feature')}
                              >
                                {service.featured ? 'Unfeature' : 'Feature'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-gray-500">
                            No services found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Inventory Management Tab */}
          {activeTab === 'inventory' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Inventory Management</h3>
                <div className="flex space-x-3">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => fetchInventory('all', e.target.value)}
                  >
                    <option value="all">All Items</option>
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                  <button
                    onClick={() => fetchInventory()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Inventory Summary */}
              {inventorySummary && Object.keys(inventorySummary).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Total Items</p>
                        <p className="text-2xl font-bold text-blue-900">{inventorySummary.totalItems}</p>
                      </div>
                      <Package className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">In Stock</p>
                        <p className="text-2xl font-bold text-green-900">{inventorySummary.inStock}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-600 text-sm font-medium">Low Stock</p>
                        <p className="text-2xl font-bold text-yellow-900">{inventorySummary.lowStock}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-600 text-sm font-medium">Out of Stock</p>
                        <p className="text-2xl font-bold text-red-900">{inventorySummary.outOfStock}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                </div>
              )}

              {inventoryLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                      <tr>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">SKU</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Supplier</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.length > 0 ? inventory.map((item: any) => (
                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{item.name}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{item.sku}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">{item.currentStock} / {item.maxStock}</div>
                              <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">${item.price}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                              item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{item.supplier}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-600 hover:text-blue-900 text-sm"
                                onClick={() => handleInventoryAction(item.id, 'restock', { quantity: 50 })}
                              >
                                Restock
                              </button>
                              <button
                                className="text-green-600 hover:text-green-900 text-sm"
                                onClick={() => handleInventoryAction(item.id, 'adjust_stock')}
                              >
                                Adjust
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-gray-500">
                            No inventory items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Marketplace Management Tab */}
          {activeTab === 'marketplace' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Marketplace Management</h3>
                <div className="flex space-x-3">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => fetchMarketplace('all', e.target.value)}
                  >
                    <option value="all">All Listings</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                    <option value="expired">Expired</option>
                  </select>
                  <button
                    onClick={() => fetchMarketplace()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Marketplace Summary */}
              {marketplaceSummary && Object.keys(marketplaceSummary).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Total Listings</p>
                        <p className="text-2xl font-bold text-blue-900">{marketplaceSummary.totalListings}</p>
                      </div>
                      <Store className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Active</p>
                        <p className="text-2xl font-bold text-green-900">{marketplaceSummary.activeListings}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-600 text-sm font-medium">Pending</p>
                        <p className="text-2xl font-bold text-yellow-900">{marketplaceSummary.pendingListings}</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-600 text-sm font-medium">Reported</p>
                        <p className="text-2xl font-bold text-red-900">{marketplaceSummary.reportedListings}</p>
                      </div>
                      <Shield className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                </div>
              )}

              {marketplaceLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                      <tr>
                        <th className="px-6 py-3">Listing</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Seller</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Views</th>
                        <th className="px-6 py-3">Inquiries</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketplace.length > 0 ? marketplace.map((listing: any) => (
                        <tr key={listing.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{listing.title}</div>
                              <div className="text-sm text-gray-500">{listing.breed} • {listing.age}</div>
                              <div className="text-xs text-gray-400">{listing.location}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              listing.type === 'sale' ? 'bg-green-100 text-green-800' :
                              listing.type === 'adoption' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {listing.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">{listing.seller.name}</div>
                              <div className="text-xs text-gray-500">
                                {listing.seller.verified ? '✓ Verified' : 'Not verified'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">
                            {listing.price === 0 ? 'Free' : `$${listing.price}`}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                listing.status === 'active' ? 'bg-green-100 text-green-800' :
                                listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                listing.status === 'suspended' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {listing.status}
                              </span>
                              {listing.featured && (
                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                  Featured
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">{listing.views}</td>
                          <td className="px-6 py-4">{listing.inquiries}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              {listing.status === 'pending' && (
                                <button
                                  className="text-green-600 hover:text-green-900 text-sm"
                                  onClick={() => handleMarketplaceAction(listing.id, 'approve')}
                                >
                                  Approve
                                </button>
                              )}
                              {listing.status === 'active' && (
                                <button
                                  className="text-red-600 hover:text-red-900 text-sm"
                                  onClick={() => handleMarketplaceAction(listing.id, 'suspend')}
                                >
                                  Suspend
                                </button>
                              )}
                              {listing.status === 'suspended' && (
                                <button
                                  className="text-green-600 hover:text-green-900 text-sm"
                                  onClick={() => handleMarketplaceAction(listing.id, 'reactivate')}
                                >
                                  Reactivate
                                </button>
                              )}
                              <button
                                className={`text-sm ${listing.featured ? 'text-gray-600 hover:text-gray-900' : 'text-blue-600 hover:text-blue-900'}`}
                                onClick={() => handleMarketplaceAction(listing.id, listing.featured ? 'unfeature' : 'feature')}
                              >
                                {listing.featured ? 'Unfeature' : 'Feature'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-gray-500">
                            No marketplace listings found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Product Management</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Product
                  </button>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Products</option>
                    <option>Active</option>
                    <option>Out of Stock</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg h-32 mb-4 flex items-center justify-center">
                      <Package className="h-12 w-12 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Product {i}</h4>
                    <p className="text-sm text-gray-600 mb-3">High-quality pet product for your furry friend</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900">${(i * 15 + 25)}</span>
                      <span className="text-sm text-gray-600">Stock: {i * 10 + 50}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Analytics & Reports</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Revenue Analytics</h4>
                    <div className="h-64 bg-white/50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">User Growth</h4>
                    <div className="h-64 bg-white/50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-16 w-16 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Services</h4>
                  <div className="space-y-3">
                    {['Veterinary Care', 'Pet Grooming', 'Pet Sitting', 'Training'].map((service, i) => (
                      <div key={service} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{service}</span>
                        <span className="font-medium">{(4 - i) * 250} bookings</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h4 className="font-semibold text-gray-900 mb-4">Best Providers</h4>
                  <div className="space-y-3">
                    {['City Vet Clinic', 'Happy Paws Grooming', 'Pet Paradise', 'Furry Friends Care'].map((provider, i) => (
                      <div key={provider} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{provider}</span>
                        <span className="font-medium">{4.9 - i * 0.1}/5</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h4 className="font-semibold text-gray-900 mb-4">Revenue by Category</h4>
                  <div className="space-y-3">
                    {['Services', 'Products', 'Marketplace', 'Subscriptions'].map((category, i) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{category}</span>
                        <span className="font-medium">${((4 - i) * 50000).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Platform Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Maintenance Mode</p>
                          <p className="text-sm text-gray-600">Enable maintenance mode for system updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Auto-approve Providers</p>
                          <p className="text-sm text-gray-600">Automatically approve new service providers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900 mb-2">Commission Rate (%)</p>
                        <input
                          type="number"
                          defaultValue="10"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Notification Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Send email notifications to users</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Send SMS notifications for urgent updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900 mb-2">Admin Email</p>
                        <input
                          type="email"
                          defaultValue="admin@petuniverse.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
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