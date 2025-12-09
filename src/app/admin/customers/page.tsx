'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  UserCog,
  Search,
  Eye,
  ShoppingBag,
  Globe,
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Package,
  Clock,
  X
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinedDate: string
  totalOrders: number
  totalSpent: number
  lastPurchase: string
  avatar?: string
}

interface BrowsingHistory {
  page: string
  timestamp: string
  duration: string
}

interface Purchase {
  id: string
  product: string
  amount: number
  date: string
  status: string
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinedDate: '2024-01-15',
    totalOrders: 12,
    totalSpent: 1245.50,
    lastPurchase: '2024-11-20'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    joinedDate: '2024-02-10',
    totalOrders: 8,
    totalSpent: 892.30,
    lastPurchase: '2024-11-18'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    joinedDate: '2024-03-05',
    totalOrders: 15,
    totalSpent: 2100.75,
    lastPurchase: '2024-11-25'
  }
]

const mockBrowsingHistory: BrowsingHistory[] = [
  { page: 'Premium Dog Food - Product Page', timestamp: '2024-12-09 10:30 AM', duration: '3m 45s' },
  { page: 'Cat Toys - Category', timestamp: '2024-12-09 10:25 AM', duration: '2m 15s' },
  { page: 'Pet Services - Grooming', timestamp: '2024-12-09 10:20 AM', duration: '1m 30s' },
  { page: 'Homepage', timestamp: '2024-12-09 10:15 AM', duration: '0m 45s' }
]

const mockPurchases: Purchase[] = [
  { id: '1', product: 'Premium Dog Food 15lbs', amount: 45.99, date: '2024-11-20', status: 'Delivered' },
  { id: '2', product: 'Cat Litter Box', amount: 32.50, date: '2024-10-15', status: 'Delivered' },
  { id: '3', product: 'Dog Leash & Collar Set', amount: 28.99, date: '2024-09-10', status: 'Delivered' }
]

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowDetailModal(true)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <UserCog className="h-8 w-8 text-purple-600" />
              Customer Management
            </h1>
            <p className="text-gray-600 mt-1">View customer data, browsing & purchase history</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Customers</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">{customers.length}</p>
              </div>
              <UserCog className="h-12 w-12 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {customers.reduce((acc, c) => acc + c.totalOrders, 0)}
                </p>
              </div>
              <ShoppingBag className="h-12 w-12 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-900 mt-1">
                  ${customers.reduce((acc, c) => acc + c.totalSpent, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-purple-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Avg Order Value</p>
                <p className="text-3xl font-bold text-orange-900 mt-1">
                  ${(customers.reduce((acc, c) => acc + c.totalSpent, 0) /
                     customers.reduce((acc, c) => acc + c.totalOrders, 0)).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Purchase
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {customer.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">{customer.totalOrders}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">
                        ${customer.totalSpent.toFixed(2)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {new Date(customer.lastPurchase).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleViewDetails(customer)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedCustomer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowDetailModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                      {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h3>
                      <p className="text-sm text-gray-500">Customer ID: {selectedCustomer.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{selectedCustomer.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Statistics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Member Since:</span>
                          <span className="font-medium">{new Date(selectedCustomer.joinedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Orders:</span>
                          <span className="font-medium">{selectedCustomer.totalOrders}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Spent:</span>
                          <span className="font-medium text-green-600">${selectedCustomer.totalSpent.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Browsing History */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-gray-900">Recent Browsing History</h4>
                    </div>
                    <div className="space-y-2">
                      {mockBrowsingHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.page}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3" />
                              {item.timestamp}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                            {item.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Purchase History */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <ShoppingBag className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Purchase History</h4>
                    </div>
                    <div className="space-y-2">
                      {mockPurchases.map((purchase) => (
                        <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{purchase.product}</p>
                            <p className="text-xs text-gray-500">{new Date(purchase.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">${purchase.amount.toFixed(2)}</p>
                            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                              {purchase.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}
