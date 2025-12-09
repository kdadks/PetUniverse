'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Wrench, Star } from 'lucide-react'

export default function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Wrench className="h-8 w-8 text-blue-600" />
              Service Management
            </h1>
            <p className="text-gray-600 mt-1">Manage and approve service offerings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">All Services</h3>
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
      </div>
    </AdminLayout>
  )
}
