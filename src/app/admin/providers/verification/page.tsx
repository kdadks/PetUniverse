'use client'

import { useState, useEffect } from 'react'
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
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  AlertTriangle,
  ArrowLeft,
  Check,
  X,
  Eye,
  Download,
  Building2,
  User,
  Landmark,
  MapPinned,
  FileCheck,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface Document {
  type: string
  name: string
  url: string
  status: 'pending' | 'uploaded' | 'verified'
}

interface ProviderVerification {
  id: string
  businessName: string
  businessType: string
  country: string
  state: string
  city: string
  addressLine1: string
  addressLine2?: string
  landmark?: string
  postalCode?: string
  taxId: string
  gstNumber?: string
  pocName: string
  pocEmail: string
  pocPhone: string
  businessHours: Record<string, { open: string; close: string; closed: boolean }>
  serviceArea: { radius: number; cities: string }
  documents: Document[]
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: string
  rejectionReason?: string
}

const mockProviders: ProviderVerification[] = [
  {
    id: '1',
    businessName: 'Paws & Claws Grooming',
    businessType: 'GROOMING',
    country: 'INDIA',
    state: 'Karnataka',
    city: 'Bangalore',
    addressLine1: '123 MG Road, Suite 200',
    addressLine2: 'Tech Park Building',
    landmark: 'Near Metro Station',
    postalCode: '560034',
    taxId: 'AAAPG1234G',
    gstNumber: '18ABCDE1234F1Z0',
    pocName: 'Sarah Johnson',
    pocEmail: 'sarah@pawsclaws.com',
    pocPhone: '+91-98765-43210',
    businessHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '15:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    serviceArea: { radius: 10, cities: 'Bangalore, Whitefield, Marathahalli' },
    documents: [
      { type: 'PAN_CARD', name: 'PAN Card', url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', status: 'verified' },
      { type: 'GST_CERT', name: 'GST Certificate', url: 'https://via.placeholder.com/800x600?text=GST+Certificate', status: 'verified' },
      { type: 'BUSINESS_LICENSE', name: 'Business License', url: 'https://via.placeholder.com/800x600?text=Business+License', status: 'verified' },
      { type: 'ID_PROOF', name: 'Aadhar Card', url: 'https://via.placeholder.com/800x600?text=Aadhar+Card', status: 'verified' },
      { type: 'ADDRESS_PROOF', name: 'Utility Bill', url: 'https://via.placeholder.com/800x600?text=Utility+Bill', status: 'uploaded' }
    ],
    status: 'PENDING',
    submittedAt: '2024-12-08T10:30:00Z'
  }
]

export default function ProviderVerificationPage() {
  const [providers, setProviders] = useState<ProviderVerification[]>(mockProviders)
  const [selectedProvider, setSelectedProvider] = useState<ProviderVerification | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState<'approve' | 'reject' | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING')
  const [previewDoc, setPreviewDoc] = useState<{ type: string; name: string; url: string } | null>(null)

  const filteredProviders = providers.filter(p => {
    const matchesSearch = p.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.pocName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleApprove = (provider: ProviderVerification) => {
    setSelectedProvider(provider)
    setAction('approve')
    setShowModal(true)
  }

  const handleReject = (provider: ProviderVerification) => {
    setSelectedProvider(provider)
    setAction('reject')
    setShowModal(true)
  }

  const confirmAction = async () => {
    if (!selectedProvider) return

    const newStatus = action === 'approve' ? 'APPROVED' : 'REJECTED'
    
    setProviders(providers.map(p => 
      p.id === selectedProvider.id 
        ? { ...p, status: newStatus as typeof newStatus, rejectionReason: action === 'reject' ? rejectionReason : undefined }
        : p
    ))

    setShowModal(false)
    setRejectionReason('')
    setSelectedProvider(null)

    // In real app: API call to update provider status
    alert(`Provider ${newStatus.toLowerCase()} successfully!`)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Provider Verification</h1>
            <p className="text-gray-600 mt-1">Review and approve service provider applications</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-teal-600">{filteredProviders.length}</p>
            <p className="text-sm text-gray-600">Total Providers</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by business name or contact person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Providers List */}
        <div className="grid gap-4">
          {filteredProviders.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{provider.businessName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      provider.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      provider.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {provider.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-medium text-gray-900">{provider.businessType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Contact</p>
                      <p className="font-medium text-gray-900">{provider.pocName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{provider.city}, {provider.state}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Submitted</p>
                      <p className="font-medium text-gray-900">{new Date(provider.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {provider.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800"><strong>Rejection Reason:</strong> {provider.rejectionReason}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProvider(provider)}
                  className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Details Modal */}
        {selectedProvider && !showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.businessName}</h2>
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Business Information */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Business Type</p>
                      <p className="font-medium text-gray-900">{selectedProvider.businessType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tax ID</p>
                      <p className="font-medium text-gray-900">{selectedProvider.taxId}</p>
                    </div>
                    {selectedProvider.gstNumber && (
                      <div>
                        <p className="text-gray-600">GST Number</p>
                        <p className="font-medium text-gray-900">{selectedProvider.gstNumber}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600">Country</p>
                      <p className="font-medium text-gray-900">{selectedProvider.country}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Business Address
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="col-span-2">
                      <p className="text-gray-600">Address Line 1</p>
                      <p className="font-medium text-gray-900">{selectedProvider.addressLine1}</p>
                    </div>
                    {selectedProvider.addressLine2 && (
                      <div className="col-span-2">
                        <p className="text-gray-600">Address Line 2</p>
                        <p className="font-medium text-gray-900">{selectedProvider.addressLine2}</p>
                      </div>
                    )}
                    {selectedProvider.landmark && (
                      <div className="col-span-2">
                        <p className="text-gray-600">Landmark</p>
                        <p className="font-medium text-gray-900">{selectedProvider.landmark}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600">City</p>
                      <p className="font-medium text-gray-900">{selectedProvider.city}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">State</p>
                      <p className="font-medium text-gray-900">{selectedProvider.state}</p>
                    </div>
                    {selectedProvider.postalCode && (
                      <div>
                        <p className="text-gray-600">Postal Code</p>
                        <p className="font-medium text-gray-900">{selectedProvider.postalCode}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Person (POC)
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="col-span-2">
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedProvider.pocName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <a href={`mailto:${selectedProvider.pocEmail}`} className="font-medium text-teal-600 hover:underline">
                        {selectedProvider.pocEmail}
                      </a>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{selectedProvider.pocPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours & Service Area */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Business Hours & Service Area
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Operating Hours</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(selectedProvider.businessHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize text-gray-600">{day}:</span>
                          <span className="font-medium text-gray-900">
                            {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Service Area</h4>
                    <div className="text-sm">
                      <p className="text-gray-600">Radius: <span className="font-medium text-gray-900">{selectedProvider.serviceArea.radius} km</span></p>
                      <p className="text-gray-600 mt-1">Cities: <span className="font-medium text-gray-900">{selectedProvider.serviceArea.cities}</span></p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Submitted Documents
                  </h3>
                  <div className="space-y-3">
                    {selectedProvider.documents.map((doc) => (
                      <div key={doc.type} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.status === 'verified' && (
                            <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          )}
                          {doc.status === 'uploaded' && (
                            <span className="flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                              <AlertCircle className="h-3 w-3" />
                              Review Needed
                            </span>
                          )}
                          <button
                            onClick={() => setPreviewDoc({ type: doc.type, name: doc.name, url: doc.url })}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Preview document"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-700 transition-colors"
                            title="Download document"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleReject(selectedProvider)}
                    disabled={selectedProvider.status !== 'PENDING'}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedProvider)}
                    disabled={selectedProvider.status !== 'PENDING'}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => setSelectedProvider(null)}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Confirmation Modal */}
        {showModal && action && selectedProvider && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {action === 'approve' ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {action === 'approve' ? 'Approve Provider' : 'Reject Provider'}
                  </h3>
                </div>

                <p className="text-gray-600">
                  {action === 'approve'
                    ? `Are you sure you want to approve ${selectedProvider.businessName}?`
                    : `Please provide a reason for rejecting ${selectedProvider.businessName}:`}
                </p>

                {action === 'reject' && (
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={4}
                  />
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    disabled={action === 'reject' && !rejectionReason}
                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      action === 'approve'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {action === 'approve' ? 'Approve' : 'Reject'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Document Preview Modal */}
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold text-gray-900">{previewDoc.name}</p>
                    <p className="text-sm text-gray-500">{previewDoc.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-4 bg-gray-50 flex items-center justify-center">
                {previewDoc.url.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={previewDoc.url}
                    className="w-full h-full border-none rounded"
                    title={previewDoc.name}
                  />
                ) : previewDoc.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={previewDoc.url}
                      alt={previewDoc.name}
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <FileText className="h-16 w-16 text-gray-300" />
                    <p className="text-gray-600">Preview not available for this file type</p>
                    <a
                      href={previewDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download File
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-100">
                <a
                  href={previewDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  )
}
