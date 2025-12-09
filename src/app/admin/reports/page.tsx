'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import { TrendingUp, BarChart3 } from 'lucide-react'

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              Analytics & Reports
            </h1>
            <p className="text-gray-600 mt-1">View performance metrics and generate reports</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Revenue Analytics</h4>
              <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-blue-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">User Growth</h4>
              <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Best Providers</h4>
            <div className="space-y-3">
              {['City Vet Clinic', 'Happy Paws Grooming', 'Pet Paradise', 'Furry Friends Care'].map((provider, i) => (
                <div key={provider} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{provider}</span>
                  <span className="font-medium">{(4.9 - i * 0.1).toFixed(1)} / 5</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
    </AdminLayout>
  )
}
