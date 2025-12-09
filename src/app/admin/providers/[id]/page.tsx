'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  CheckCircle,
  XCircle,
  Award,
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  AlertTriangle,
  ArrowLeft,
  Check,
  X
} from 'lucide-react'

export default function ProviderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [status, setStatus] = useState('PENDING')
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null)

  // Mock data - in real app, fetch from API
  const provider = {
    id: params.id,
    businessName: 'Paws & Claws Grooming',
    businessType: 'GROOMING',
    owner: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@pawsclaws.com',
      phone: '+1 (555) 111-2222'
    },
    description: 'Professional grooming services for dogs and cats with over 10 years of experience. We specialize in breed-specific cuts, spa treatments, and nail care.',
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    specializations: ['Dog Grooming', 'Cat Grooming', 'Nail Trimming', 'Spa Treatments'],
    certifications: [
      'Certified Professional Groomer (CPG)',
      'Pet First Aid Certified',
      'Animal Behavior Specialist'
    ],
    licenseNumber: 'GRM-2024-001',
    insuranceInfo: {
      provider: 'Pet Business Insurance Co.',
      policyNumber: 'PBI-123456',
      expiryDate: '2025-12-31'
    },
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    services: [
      { name: 'Basic Grooming', price: 45, duration: '1 hour' },
      { name: 'Full Spa Package', price: 95, duration: '2 hours' },
      { name: 'Nail Trimming', price: 15, duration: '15 minutes' }
    ],
    stats: {
      averageRating: 4.8,
      totalReviews: 156,
      totalBookings: 342,
      revenue: 15420.50,
      completionRate: 98
    },
    joinedDate: '2024-01-15',
    status: status,
    documents: [
      { name: 'Business License', url: '#', verified: true },
      { name: 'Insurance Certificate', url: '#', verified: true },
      { name: 'Professional Certification', url: '#', verified: false }
    ]
  }

  const handleApprove = () => {
    setStatus('APPROVED')
    setShowApprovalModal(false)
    // In real app: API call to approve provider
  }

  const handleReject = () => {
    setStatus('REJECTED')
    setShowApprovalModal(false)
    // In real app: API call to reject provider
  }

  const getStatusBadge = () => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="h-5 w-5" />
            Approved
          </span>
        )
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
            <Clock className="h-5 w-5" />
            Pending Approval
          </span>
        )
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-800 border border-red-200">
            <XCircle className="h-5 w-5" />
            Rejected
          </span>
        )
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Providers
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                {provider.businessName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{provider.businessName}</h1>
                <p className="text-gray-600 mt-1">
                  {provider.owner.firstName} {provider.owner.lastName}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {provider.location.city}, {provider.location.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(provider.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              {getStatusBadge()}
              {status === 'PENDING' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setApprovalAction('approve')
                      setShowApprovalModal(true)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setApprovalAction('reject')
                      setShowApprovalModal(true)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-yellow-600 mb-2">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium">Rating</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{provider.stats.averageRating}</p>
            <p className="text-xs text-gray-500">{provider.stats.totalReviews} reviews</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Bookings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{provider.stats.totalBookings}</p>
            <p className="text-xs text-gray-500">Total completed</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">${provider.stats.revenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total earned</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Completion</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{provider.stats.completionRate}%</p>
            <p className="text-xs text-gray-500">Success rate</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <Briefcase className="h-5 w-5" />
              <span className="text-sm font-medium">Type</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{provider.businessType}</p>
            <p className="text-xs text-gray-500">Service category</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                Business Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p className="mt-1 text-gray-900">{provider.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">License Number</label>
                    <p className="mt-1 text-gray-900 flex items-center gap-2">
                      {provider.licenseNumber}
                      <Shield className="h-4 w-4 text-green-600" />
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Business Type</label>
                    <p className="mt-1 text-gray-900">{provider.businessType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{provider.owner.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">{provider.owner.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 col-span-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-900">
                      {provider.location.address}, {provider.location.city}, {provider.location.state} {provider.location.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
              <div className="space-y-3">
                {provider.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                    <p className="text-lg font-semibold text-blue-600">${service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Specializations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {provider.specializations.map((spec, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Certifications
              </h3>
              <ul className="space-y-2">
                {provider.certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Documents
              </h3>
              <div className="space-y-2">
                {provider.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{doc.name}</span>
                    {doc.verified ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Insurance
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Provider</p>
                  <p className="font-medium text-gray-900">{provider.insuranceInfo.provider}</p>
                </div>
                <div>
                  <p className="text-gray-600">Policy Number</p>
                  <p className="font-medium text-gray-900">{provider.insuranceInfo.policyNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expiry Date</p>
                  <p className="font-medium text-gray-900">{provider.insuranceInfo.expiryDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Modal */}
        {showApprovalModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {approvalAction === 'approve' ? 'Approve Provider' : 'Reject Provider'}
              </h3>
              <p className="text-gray-600 mb-6">
                {approvalAction === 'approve'
                  ? `Are you sure you want to approve ${provider.businessName}? They will be able to accept bookings.`
                  : `Are you sure you want to reject ${provider.businessName}? They will be notified of this decision.`}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={approvalAction === 'approve' ? handleApprove : handleReject}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
                    approvalAction === 'approve'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {approvalAction === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
