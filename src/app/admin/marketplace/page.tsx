'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Store, CheckCircle, Clock, Shield } from 'lucide-react'

interface MarketplaceSummary {
  totalListings?: number
  activeListings?: number
  pendingListings?: number
  reportedListings?: number
}

export default function AdminMarketplacePage() {
  const [marketplace, setMarketplace] = useState([])
  const [marketplaceLoading, setMarketplaceLoading] = useState(false)
  const [marketplaceSummary, setMarketplaceSummary] = useState<MarketplaceSummary>({})

  useEffect(() => {
    fetchMarketplace()
  }, [])

  const fetchMarketplace = async (type = 'all', status = 'all', page = 1) => {
    setMarketplaceLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        type,
        status
      })

      const response = await fetch(`/api/admin/marketplace?${params}`)
      if (!response.ok) throw new Error('Failed to fetch marketplace')

      const data = await response.json()
      setMarketplace(data.listings)
      setMarketplaceSummary(data.summary)
    } catch (error) {
      console.error('Error fetching marketplace:', error)
      setMarketplace([])
    } finally {
      setMarketplaceLoading(false)
    }
  }

  const handleMarketplaceAction = async (listingId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/marketplace', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, action })
      })

      if (!response.ok) throw new Error('Failed to update listing')

      await fetchMarketplace()
    } catch (error) {
      console.error('Error updating marketplace listing:', error)
      alert('Failed to update listing')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Store className="h-8 w-8 text-blue-600" />
              Marketplace Management
            </h1>
            <p className="text-gray-600 mt-1">Manage pet marketplace listings and sellers</p>
          </div>
        </div>

        {/* Marketplace Summary */}
        {marketplaceSummary && Object.keys(marketplaceSummary).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Listings</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{marketplaceSummary.totalListings}</p>
                </div>
                <Store className="h-12 w-12 text-blue-600 opacity-50" />
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">{marketplaceSummary.activeListings}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600 opacity-50" />
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-yellow-900 mt-1">{marketplaceSummary.pendingListings}</p>
                </div>
                <Clock className="h-12 w-12 text-yellow-600 opacity-50" />
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Reported</p>
                  <p className="text-3xl font-bold text-red-900 mt-1">{marketplaceSummary.reportedListings}</p>
                </div>
                <Shield className="h-12 w-12 text-red-600 opacity-50" />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">All Listings</h3>
            <div className="flex space-x-3">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => fetchMarketplace('all', e.target.value)}
              >
                <option value="all">All Listings</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
              <button
                onClick={() => fetchMarketplace()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Refresh
              </button>
            </div>
          </div>

          {marketplaceLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Listing</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Seller</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Views</th>
                    <th className="px-6 py-3">Inquiries</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {marketplace.length > 0 ? marketplace.map((listing: any) => (
                    <tr key={listing.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{listing.title}</div>
                          <div className="text-sm text-gray-500">{listing.breed} • {listing.age}</div>
                          <div className="text-xs text-gray-400">{listing.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          listing.type === 'sale' ? 'bg-green-100 text-green-800' :
                          listing.type === 'adoption' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {listing.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{listing.seller.name}</div>
                          <div className="text-xs text-gray-500">
                            {listing.seller.verified ? '✓ Verified' : 'Not verified'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {listing.price === 0 ? 'Free' : `$${listing.price}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            listing.status === 'active' ? 'bg-green-100 text-green-800' :
                            listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            listing.status === 'suspended' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {listing.status}
                          </span>
                          {listing.featured && (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">{listing.views}</td>
                      <td className="px-6 py-4">{listing.inquiries}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {listing.status === 'pending' && (
                            <button
                              className="text-green-600 hover:text-green-900 text-sm"
                              onClick={() => handleMarketplaceAction(listing.id, 'approve')}
                            >
                              Approve
                            </button>
                          )}
                          {listing.status === 'active' && (
                            <button
                              className="text-red-600 hover:text-red-900 text-sm"
                              onClick={() => handleMarketplaceAction(listing.id, 'suspend')}
                            >
                              Suspend
                            </button>
                          )}
                          {listing.status === 'suspended' && (
                            <button
                              className="text-green-600 hover:text-green-900 text-sm"
                              onClick={() => handleMarketplaceAction(listing.id, 'reactivate')}
                            >
                              Reactivate
                            </button>
                          )}
                          <button
                            className={`text-sm ${listing.featured ? 'text-gray-600 hover:text-gray-900' : 'text-blue-600 hover:text-blue-900'}`}
                            onClick={() => handleMarketplaceAction(listing.id, listing.featured ? 'unfeature' : 'feature')}
                          >
                            {listing.featured ? 'Unfeature' : 'Feature'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500">
                        No listings found
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
