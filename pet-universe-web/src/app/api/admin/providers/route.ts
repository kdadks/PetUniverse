import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock providers data
const mockProviders = [
  {
    id: '1',
    businessName: 'Happy Paws Grooming',
    businessType: 'GROOMING',
    description: 'Professional pet grooming service with over 10 years of experience. We provide full grooming, nail trimming, and bathing services.',
    isVerified: false,
    isActive: true,
    averageRating: 0,
    totalReviews: 0,
    createdAt: new Date('2025-01-20'),
    user: {
      id: '6',
      email: 'happy.paws@email.com',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      phone: '555-0123',
      avatar: null
    },
    services: [],
    _count: { services: 3, bookings: 0 }
  },
  {
    id: '2',
    businessName: 'City Vet Clinic',
    businessType: 'VETERINARY',
    description: 'Full-service veterinary clinic offering routine checkups, emergency care, and specialized treatments for all types of pets.',
    isVerified: true,
    isActive: true,
    averageRating: 4.8,
    totalReviews: 124,
    createdAt: new Date('2025-01-10'),
    user: {
      id: '7',
      email: 'cityvet@email.com',
      firstName: 'Dr. James',
      lastName: 'Smith',
      phone: '555-0234',
      avatar: null
    },
    services: [
      { id: '1', name: 'Routine Checkup', category: 'VETERINARY_CONSULTATION', price: 75, isActive: true },
      { id: '2', name: 'Vaccination', category: 'VETERINARY_APPOINTMENT', price: 45, isActive: true }
    ],
    _count: { services: 5, bookings: 89 }
  },
  {
    id: '3',
    businessName: 'Pet Paradise Boarding',
    businessType: 'PET_SITTER',
    description: 'Safe and comfortable pet boarding facility with 24/7 care, large play areas, and personalized attention for each pet.',
    isVerified: false,
    isActive: true,
    averageRating: 0,
    totalReviews: 0,
    createdAt: new Date('2025-01-18'),
    user: {
      id: '8',
      email: 'petparadise@email.com',
      firstName: 'Lisa',
      lastName: 'Chang',
      phone: '555-0345',
      avatar: null
    },
    services: [],
    _count: { services: 2, bookings: 0 }
  },
  {
    id: '4',
    businessName: 'Furry Friends Training',
    businessType: 'TRAINER',
    description: 'Professional dog training services including obedience training, behavior modification, and puppy training classes.',
    isVerified: true,
    isActive: false,
    averageRating: 4.6,
    totalReviews: 67,
    createdAt: new Date('2025-01-05'),
    user: {
      id: '9',
      email: 'furryfriends@email.com',
      firstName: 'Mark',
      lastName: 'Johnson',
      phone: '555-0456',
      avatar: null
    },
    services: [
      { id: '3', name: 'Basic Obedience', category: 'TRAINING', price: 120, isActive: false }
    ],
    _count: { services: 3, bookings: 45 }
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
    const status = searchParams.get('status') || 'all'
    const businessType = searchParams.get('businessType') || 'all'

    // Filter mock providers based on status and business type
    let filteredProviders = mockProviders

    if (status !== 'all') {
      switch (status) {
        case 'pending':
          filteredProviders = filteredProviders.filter(p => !p.isVerified)
          break
        case 'active':
          filteredProviders = filteredProviders.filter(p => p.isVerified && p.isActive)
          break
        case 'suspended':
          filteredProviders = filteredProviders.filter(p => !p.isActive)
          break
      }
    }

    if (businessType !== 'all') {
      filteredProviders = filteredProviders.filter(p =>
        p.businessType === businessType.toUpperCase()
      )
    }

    // Pagination
    const skip = (page - 1) * limit
    const providers = filteredProviders.slice(skip, skip + limit)
    const totalCount = filteredProviders.length
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      providers,
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
    console.error('Error fetching providers:', error)
    return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { providerId, action } = body

    if (!providerId || !action) {
      return NextResponse.json({ error: 'Provider ID and action are required' }, { status: 400 })
    }

    // Find provider in mock data
    const providerIndex = mockProviders.findIndex(provider => provider.id === providerId)
    if (providerIndex === -1) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 })
    }

    // Update mock provider based on action
    switch (action) {
      case 'approve':
        mockProviders[providerIndex].isVerified = true
        mockProviders[providerIndex].isActive = true
        break
      case 'reject':
        mockProviders[providerIndex].isVerified = false
        mockProviders[providerIndex].isActive = false
        break
      case 'suspend':
        mockProviders[providerIndex].isActive = false
        break
      case 'reactivate':
        mockProviders[providerIndex].isActive = true
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Provider updated successfully',
      provider: mockProviders[providerIndex]
    })
  } catch (error) {
    console.error('Error updating provider:', error)
    return NextResponse.json({ error: 'Failed to update provider' }, { status: 500 })
  }
}