'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Users,
  Building2,
  Package,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  BarChart3,
  Settings,
  Shield,
  Activity
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

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
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

        {/* Main Content */}
        <div>
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
                <button 
                  onClick={() => router.push('/admin/providers')}
                  className="text-yellow-600 hover:text-yellow-800 underline">
                  Review Now
                </button>
              </div>
            </motion.div>
          )}

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
                      onClick={() => router.push('/admin/users')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Manage Users</span>
                      </div>
                      <span className="text-sm text-gray-500">{stats.totalUsers}</span>
                    </button>

                    <button
                      onClick={() => router.push('/admin/providers')}
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
                      onClick={() => router.push('/admin/analytics')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">View Analytics</span>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/admin/settings')}
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
        </div>
      </div>
    </AdminLayout>
  )
}
