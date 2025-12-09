'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Briefcase,
  Search,
  Filter,
  Eye,
  Check,
  X as XIcon,
  Clock,
  Star,
  MapPin,
  DollarSign,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface ServiceProvider {
  id: string
  businessName: string
  businessType: string
  owner: string
  email: string
  phone: string
  location: string
  specializations: string[]
  licenseNumber?: string
  isVerified: boolean
  isActive: boolean
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  averageRating: number
  totalReviews: number
  totalBookings: number
  joinedDate: string
}

const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    businessName: 'Paws & Claws Grooming',
    businessType: 'GROOMING',
    owner: 'Sarah Johnson',
    email: 'sarah@pawsclaws.com',
    phone: '+1 (555) 111-2222',
    location: 'New York, NY',
    specializations: ['Dog Grooming', 'Cat Grooming', 'Nail Trimming'],
    licenseNumber: 'GRM-2024-001',
    isVerified: true,
    isActive: true,
    status: 'APPROVED',
    averageRating: 4.8,
    totalReviews: 156,
    totalBookings: 342,
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    businessName: 'VetCare Plus',
    businessType: 'VETERINARY',
    owner: 'Dr. Michael Chen',
    email: 'dr.chen@vetcareplus.com',
    phone: '+1 (555) 222-3333',
    location: 'Los Angeles, CA',
    specializations: ['Emergency Care', 'Surgery', 'Vaccinations'],
    licenseNumber: 'VET-2024-002',
    isVerified: true,
    isActive: true,
    status: 'APPROVED',
    averageRating: 4.9,
    totalReviews: 234,
    totalBookings: 567,
    joinedDate: '2024-02-10'
  },
  {
    id: '3',
    businessName: 'Pet Training Academy',
    businessType: 'TRAINER',
    owner: 'James Wilson',
    email: 'james@pettraining.com',
    phone: '+1 (555) 333-4444',
    location: 'Chicago, IL',
    specializations: ['Obedience Training', 'Behavior Modification'],
    isVerified: false,
    isActive: false,
    status: 'PENDING',
    averageRating: 0,
    totalReviews: 0,
    totalBookings: 0,
    joinedDate: '2024-12-01'
  }
]

export default function ServiceProvidersManagement() {
  const [providers, setProviders] = useState<ServiceProvider[]>(mockProviders)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [filterType, setFilterType] = useState<string>('ALL')

  const filteredProviders = providers.filter(provider => {
    const matchesSearch =
      provider.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'ALL' || provider.status === filterStatus
    const matchesType = filterType === 'ALL' || provider.businessType === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  const handleApprove = (providerId: string) => {
    setProviders(providers.map(p =>
      p.id === providerId ? { ...p, status: 'APPROVED', isActive: true, isVerified: true } : p
    ))
  }

  const handleReject = (providerId: string) => {
    setProviders(providers.map(p =>
      p.id === providerId ? { ...p, status: 'REJECTED', isActive: false } : p
    ))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3" />
            Approved
          </span>
        )
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        )
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <XCircle className="h-3 w-3" />
            Rejected
          </span>
        )
    }
  }

  const pendingCount = providers.filter(p => p.status === 'PENDING').length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-blue-600" />
              Service Providers
            </h1>
            <p className="text-gray-600 mt-1">Review and approve service provider applications</p>
          </div>
          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  {pendingCount} pending approval{pendingCount > 1 ? 's' : ''}
                </span>
              </div>
            )}
            <Link
              href="/admin/providers/verification"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Verify Providers
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Providers</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">{providers.length}</p>
              </div>
              <Briefcase className="h-12 w-12 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {providers.filter(p => p.status === 'APPROVED').length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-900 mt-1">{pendingCount}</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-600 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-purple-900 mt-1">
                  {providers.reduce((acc, p) => acc + p.totalBookings, 0)}
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-purple-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="ALL">All Types</option>
                <option value="GROOMING">Grooming</option>
                <option value="VETERINARY">Veterinary</option>
                <option value="TRAINER">Trainer</option>
                <option value="PET_SITTER">Pet Sitter</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Providers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProviders.map((provider) => (
                  <motion.tr
                    key={provider.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {provider.businessName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{provider.businessName}</div>
                          <div className="text-sm text-gray-500">{provider.owner}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {provider.businessType}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{provider.email}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {provider.location}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {provider.averageRating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{provider.averageRating}</span>
                          <span className="text-xs text-gray-500">({provider.totalReviews})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No reviews yet</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(provider.status)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/providers/${provider.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                        {provider.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(provider.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(provider.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Reject"
                            >
                              <XIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
