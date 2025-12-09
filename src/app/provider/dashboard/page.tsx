'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
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
  Package,
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      if (session.user.role !== 'SERVICE_PROVIDER') {
        router.push('/provider/onboarding')
      } else {
        fetchDashboardData()
      }
    }
  }, [status, router, session])

  const fetchDashboardData = async () => {
    try {
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Activity className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Provider Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Welcome, {session?.user?.name || session?.user?.email}
            </span>
          </div>
        </div>

        {/* Alert Bar for Pending Bookings */}
        {stats.pendingBookings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-50 border border-orange-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800 font-medium">
                {stats.pendingBookings} booking requests pending your approval
              </span>
              <button 
                onClick={() => router.push('/provider/dashboard/bookings')}
                className="text-orange-600 hover:text-orange-800 underline">
                Review Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
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
              <span className="ml-2 text-gray-600">28 reviews</span>
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
              <button
                onClick={() => router.push('/provider/dashboard/services')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Manage Services</span>
                </div>
                <span className="text-sm text-gray-500">{stats.activeServices}</span>
              </button>

              <button
                onClick={() => router.push('/provider/dashboard/bookings')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span className="font-medium">View Bookings</span>
                </div>
                {stats.pendingBookings > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.pendingBookings}
                  </span>
                )}
              </button>

              <button
                onClick={() => router.push('/provider/dashboard/analytics')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">View Analytics</span>
                </div>
              </button>

              <button
                onClick={() => router.push('/provider/dashboard/clients')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span className="font-medium">My Clients</span>
                </div>
                <span className="text-sm text-gray-500">{stats.totalClients}</span>
              </button>
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
                href="/provider/dashboard/bookings"
                className="text-teal-600 hover:text-teal-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
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
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
              <p className="text-sm text-gray-600">Completed Bookings</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Package className="h-8 w-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeServices}</p>
              <p className="text-sm text-gray-600">Active Services</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="h-8 w-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
              <p className="text-sm text-gray-600">Pending Bookings</p>
            </div>
          </div>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">Profile Status</h4>
                <p className="text-teal-100">Verified & Active</p>
              </div>
              <CheckCircle className="h-8 w-8 text-teal-200" />
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
                <h4 className="text-lg font-semibold">Response Rate</h4>
                <p className="text-blue-100">98% within 1 hour</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
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
                <h4 className="text-lg font-semibold">This Month</h4>
                <p className="text-purple-100">$1,245 earned</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
          </motion.div>
        </div>
      </div>
    </ProviderLayout>
  )
}
