'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Star,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface AnalyticsData {
  revenue: {
    current: number
    previous: number
    change: number
  }
  bookings: {
    current: number
    previous: number
    change: number
  }
  clients: {
    current: number
    previous: number
    change: number
  }
  rating: {
    current: number
    previous: number
    change: number
  }
}

const mockAnalytics: AnalyticsData = {
  revenue: { current: 3420, previous: 2890, change: 18.3 },
  bookings: { current: 42, previous: 35, change: 20 },
  clients: { current: 28, previous: 22, change: 27.3 },
  rating: { current: 4.8, previous: 4.6, change: 4.3 }
}

const monthlyRevenue = [
  { month: 'Jan', revenue: 2100 },
  { month: 'Feb', revenue: 2400 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2800 },
  { month: 'May', revenue: 3100 },
  { month: 'Jun', revenue: 2900 },
  { month: 'Jul', revenue: 3200 },
  { month: 'Aug', revenue: 3500 },
  { month: 'Sep', revenue: 3300 },
  { month: 'Oct', revenue: 3100 },
  { month: 'Nov', revenue: 3400 },
  { month: 'Dec', revenue: 3420 }
]

const serviceBreakdown = [
  { service: 'Dog Grooming', revenue: 1200, percentage: 35, color: 'bg-blue-500' },
  { service: 'Pet Training', revenue: 850, percentage: 25, color: 'bg-green-500' },
  { service: 'Health Checkup', revenue: 680, percentage: 20, color: 'bg-purple-500' },
  { service: 'Pet Sitting', revenue: 450, percentage: 13, color: 'bg-orange-500' },
  { service: 'Dog Walking', revenue: 240, percentage: 7, color: 'bg-pink-500' }
]

const topClients = [
  { name: 'Lisa Davis', bookings: 15, spent: 1250 },
  { name: 'Emma Wilson', bookings: 20, spent: 1680 },
  { name: 'Sarah Johnson', bookings: 12, spent: 840 },
  { name: 'Mike Brown', bookings: 8, spent: 560 },
  { name: 'John Smith', bookings: 5, spent: 320 }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<string>('month')
  const [analytics] = useState<AnalyticsData>(mockAnalytics)

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Analytics
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${analytics.revenue.current.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className={`mt-4 flex items-center text-sm ${analytics.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.revenue.change >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              <span>{Math.abs(analytics.revenue.change)}% from last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.bookings.current}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className={`mt-4 flex items-center text-sm ${analytics.bookings.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.bookings.change >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              <span>{Math.abs(analytics.bookings.change)}% from last month</span>
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
                <p className="text-sm text-gray-600">Clients</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.clients.current}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className={`mt-4 flex items-center text-sm ${analytics.clients.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.clients.change >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              <span>{Math.abs(analytics.clients.change)}% from last month</span>
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
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.rating.current}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= analytics.rating.current ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end space-x-2">
              {monthlyRevenue.map((month, index) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t-lg transition-all hover:from-teal-600 hover:to-emerald-500"
                    style={{ height: `${(month.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue by Service</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {serviceBreakdown.map((service) => (
                <div key={service.service}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{service.service}</span>
                    <span className="text-sm font-medium text-gray-900">${service.revenue}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${service.color} rounded-full transition-all`}
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{service.percentage}% of total</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Clients</h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topClients.sort((a, b) => b.spent - a.spent).map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.bookings} bookings</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">${client.spent}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Summary</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-teal-600">98%</p>
                <p className="text-sm text-gray-600">Response Rate</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">95%</p>
                <p className="text-sm text-gray-600">Completion Rate</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">4.8</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">2h</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Great Performance!</p>
                  <p className="text-sm text-green-700">You&apos;re performing above average in all metrics</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProviderLayout>
  )
}
