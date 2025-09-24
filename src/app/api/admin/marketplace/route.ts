import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock marketplace listings data
const mockMarketplaceListings = [
  {
    id: '1',
    title: 'Golden Retriever Puppies',
    type: 'sale',
    category: 'Dogs',
    breed: 'Golden Retriever',
    age: '8 weeks',
    gender: 'Mixed',
    price: 1200,
    location: 'San Francisco, CA',
    description: 'Beautiful Golden Retriever puppies, well-socialized and health-checked.',
    images: ['/api/placeholder/300/200'],
    seller: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '555-0123',
      verified: true
    },
    status: 'active',
    views: 245,
    inquiries: 12,
    createdAt: new Date('2025-01-20'),
    featured: true,
    reportCount: 0
  },
  {
    id: '2',
    title: 'Persian Cat Looking for Mate',
    type: 'breeding',
    category: 'Cats',
    breed: 'Persian',
    age: '3 years',
    gender: 'Female',
    price: 300,
    location: 'Los Angeles, CA',
    description: 'Beautiful Persian cat available for breeding. Excellent bloodline.',
    images: ['/api/placeholder/300/200'],
    seller: {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '555-0234',
      verified: false
    },
    status: 'pending',
    views: 89,
    inquiries: 5,
    createdAt: new Date('2025-01-18'),
    featured: false,
    reportCount: 0
  },
  {
    id: '3',
    title: 'Rescued Tabby Cat - Free Adoption',
    type: 'adoption',
    category: 'Cats',
    breed: 'Tabby',
    age: '2 years',
    gender: 'Male',
    price: 0,
    location: 'Seattle, WA',
    description: 'Loving tabby cat needs a forever home. Neutered and vaccinated.',
    images: ['/api/placeholder/300/200'],
    seller: {
      id: '3',
      name: 'Pet Rescue Seattle',
      email: 'info@petrescueseattle.org',
      phone: '555-0345',
      verified: true
    },
    status: 'active',
    views: 156,
    inquiries: 8,
    createdAt: new Date('2025-01-15'),
    featured: false,
    reportCount: 0
  },
  {
    id: '4',
    title: 'Exotic Birds Collection',
    type: 'sale',
    category: 'Birds',
    breed: 'Cockatiel',
    age: '6 months',
    gender: 'Mixed',
    price: 450,
    location: 'Phoenix, AZ',
    description: 'Hand-raised cockatiels, very friendly and tame.',
    images: ['/api/placeholder/300/200'],
    seller: {
      id: '4',
      name: 'Bird Paradise',
      email: 'contact@birdparadise.com',
      phone: '555-0456',
      verified: true
    },
    status: 'suspended',
    views: 67,
    inquiries: 3,
    createdAt: new Date('2025-01-12'),
    featured: false,
    reportCount: 2,
    suspensionReason: 'Multiple reports received'
  },
  {
    id: '5',
    title: 'Labrador Mix Puppies',
    type: 'adoption',
    category: 'Dogs',
    breed: 'Labrador Mix',
    age: '12 weeks',
    gender: 'Mixed',
    price: 150,
    location: 'Denver, CO',
    description: 'Adorable Labrador mix puppies looking for loving homes.',
    images: ['/api/placeholder/300/200'],
    seller: {
      id: '5',
      name: 'Happy Tails Rescue',
      email: 'info@happytails.org',
      phone: '555-0567',
      verified: true
    },
    status: 'expired',
    views: 189,
    inquiries: 15,
    createdAt: new Date('2024-12-20'),
    featured: false,
    reportCount: 0
  }
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') || 'all'
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || 'all'
    const search = searchParams.get('search') || ''

    // Filter listings based on parameters
    let filteredListings = mockMarketplaceListings

    if (type !== 'all') {
      filteredListings = filteredListings.filter(listing =>
        listing.type === type
      )
    }

    if (status !== 'all') {
      filteredListings = filteredListings.filter(listing =>
        listing.status === status
      )
    }

    if (category !== 'all') {
      filteredListings = filteredListings.filter(listing =>
        listing.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (search) {
      filteredListings = filteredListings.filter(listing =>
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.breed.toLowerCase().includes(search.toLowerCase()) ||
        listing.seller.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sort by creation date (newest first)
    filteredListings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const skip = (page - 1) * limit
    const listings = filteredListings.slice(skip, skip + limit)
    const totalCount = filteredListings.length
    const totalPages = Math.ceil(totalCount / limit)

    // Calculate summary stats
    const summary = {
      totalListings: mockMarketplaceListings.length,
      activeListings: mockMarketplaceListings.filter(l => l.status === 'active').length,
      pendingListings: mockMarketplaceListings.filter(l => l.status === 'pending').length,
      suspendedListings: mockMarketplaceListings.filter(l => l.status === 'suspended').length,
      expiredListings: mockMarketplaceListings.filter(l => l.status === 'expired').length,
      totalViews: mockMarketplaceListings.reduce((sum, l) => sum + l.views, 0),
      totalInquiries: mockMarketplaceListings.reduce((sum, l) => sum + l.inquiries, 0),
      reportedListings: mockMarketplaceListings.filter(l => l.reportCount > 0).length,
      categories: [...new Set(mockMarketplaceListings.map(l => l.category))],
      types: [...new Set(mockMarketplaceListings.map(l => l.type))]
    }

    return NextResponse.json({
      listings,
      summary,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching marketplace listings:', error)
    return NextResponse.json({ error: 'Failed to fetch marketplace listings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { listingId, action, reason } = body

    if (!listingId || !action) {
      return NextResponse.json({ error: 'Listing ID and action are required' }, { status: 400 })
    }

    // Find listing in mock data
    const listingIndex = mockMarketplaceListings.findIndex(listing => listing.id === listingId)
    if (listingIndex === -1) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Update mock listing based on action
    switch (action) {
      case 'approve':
        mockMarketplaceListings[listingIndex].status = 'active'
        break
      case 'reject':
      case 'suspend':
        mockMarketplaceListings[listingIndex].status = 'suspended'
        if (reason) {
          mockMarketplaceListings[listingIndex].suspensionReason = reason
        }
        break
      case 'reactivate':
        mockMarketplaceListings[listingIndex].status = 'active'
        delete mockMarketplaceListings[listingIndex].suspensionReason
        break
      case 'feature':
        mockMarketplaceListings[listingIndex].featured = true
        break
      case 'unfeature':
        mockMarketplaceListings[listingIndex].featured = false
        break
      case 'delete':
        mockMarketplaceListings.splice(listingIndex, 1)
        return NextResponse.json({
          message: 'Listing deleted successfully'
        })
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Listing updated successfully',
      listing: mockMarketplaceListings[listingIndex]
    })
  } catch (error) {
    console.error('Error updating marketplace listing:', error)
    return NextResponse.json({ error: 'Failed to update marketplace listing' }, { status: 500 })
  }
}