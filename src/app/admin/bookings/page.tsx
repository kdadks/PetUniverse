'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Calendar } from 'lucide-react'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              Booking Management
            </h1>
            <p className="text-gray-600 mt-1">View and manage all service bookings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">All Bookings</h3>
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
                    <tr key={booking.id} className="hover:bg-gray-50">
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
      </div>
    </AdminLayout>
  )
}
