'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import { Activity, BarChart3, TrendingUp } from 'lucide-react'

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              Analytics
            </h1>
            <p className="text-gray-600 mt-1">Track performance and user behavior</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">$24,500</p>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold text-green-900 mt-1">1,234</p>
              </div>
              <Activity className="h-12 w-12 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Bookings</p>
                <p className="text-3xl font-bold text-purple-900 mt-1">342</p>
              </div>
              <BarChart3 className="h-12 w-12 text-purple-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Growth</p>
                <p className="text-3xl font-bold text-orange-900 mt-1">+12.5%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-600 opacity-50" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Revenue Over Time</h4>
              <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-blue-500" />
                <p className="ml-4 text-gray-500">Chart visualization coming soon</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">User Activity</h4>
              <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                <Activity className="h-16 w-16 text-green-500" />
                <p className="ml-4 text-gray-500">Chart visualization coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
