import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock services data
const mockServices = [
  {
    id: '1',
    name: 'Routine Checkup',
    category: 'VETERINARY_CONSULTATION',
    description: 'Comprehensive health examination for your pet including physical exam, weight check, and basic health assessment.',
    duration: 60,
    basePrice: 75,
    isActive: true,
    featured: true,
    requiresApproval: false,
    createdAt: new Date('2025-01-10'),
    provider: {
      id: '2',
      businessName: 'City Vet Clinic',
      user: {
        firstName: 'Dr. James',
        lastName: 'Smith'
      },
      isVerified: true,
      averageRating: 4.8
    },
    bookingCount: 145,
    averageRating: 4.9,
    reviewCount: 67,
    tags: ['health', 'routine', 'examination'],
    availableLocations: ['San Francisco', 'Oakland'],
    requirements: ['Pet vaccination records', 'Previous medical history if available']
  },
  {
    id: '2',
    name: 'Full Grooming Package',
    category: 'GROOMING',
    description: 'Complete grooming service including bath, haircut, nail trimming, ear cleaning, and teeth brushing.',
    duration: 120,
    basePrice: 85,
    isActive: true,
    featured: false,
    requiresApproval: false,
    createdAt: new Date('2025-01-15'),
    provider: {
      id: '1',
      businessName: 'Happy Paws Grooming',
      user: {
        firstName: 'Maria',
        lastName: 'Rodriguez'
      },
      isVerified: false,
      averageRating: 0
    },
    bookingCount: 23,
    averageRating: 4.6,
    reviewCount: 12,
    tags: ['grooming', 'bath', 'haircut', 'nails'],
    availableLocations: ['San Francisco'],
    requirements: ['Pet must be up to date on vaccinations']
  },
  {
    id: '3',
    name: 'Emergency Consultation',
    category: 'VETERINARY_EMERGENCY',
    description: 'Urgent veterinary consultation for pets experiencing health emergencies or concerning symptoms.',
    duration: 45,
    basePrice: 150,
    isActive: false,
    featured: false,
    requiresApproval: true,
    createdAt: new Date('2025-01-12'),
    provider: {
      id: '2',
      businessName: 'City Vet Clinic',
      user: {
        firstName: 'Dr. James',
        lastName: 'Smith'
      },
      isVerified: true,
      averageRating: 4.8
    },
    bookingCount: 89,
    averageRating: 4.7,
    reviewCount: 34,
    tags: ['emergency', 'urgent', 'consultation'],
    availableLocations: ['San Francisco', 'Oakland', 'San Jose'],
    requirements: ['Describe emergency symptoms', 'Contact information for immediate response']
  },
  {
    id: '4',
    name: 'Dog Training - Basic Obedience',
    category: 'TRAINING',
    description: 'Fundamental obedience training covering sit, stay, come, heel, and basic behavioral correction.',
    duration: 60,
    basePrice: 65,
    isActive: true,
    featured: true,
    requiresApproval: false,
    createdAt: new Date('2025-01-08'),
    provider: {
      id: '4',
      businessName: 'Furry Friends Training',
      user: {
        firstName: 'Mark',
        lastName: 'Johnson'
      },
      isVerified: true,
      averageRating: 4.6
    },
    bookingCount: 76,
    averageRating: 4.8,
    reviewCount: 45,
    tags: ['training', 'obedience', 'behavior', 'dogs'],
    availableLocations: ['San Francisco', 'Berkeley'],
    requirements: ['Dog must be at least 12 weeks old', 'Basic vaccination required']
  },
  {
    id: '5',
    name: 'Pet Sitting - Overnight',
    category: 'PET_SITTING',
    description: 'Professional overnight pet sitting in your home, including feeding, walking, and companionship.',
    duration: 720, // 12 hours
    basePrice: 45,
    isActive: false,
    featured: false,
    requiresApproval: true,
    createdAt: new Date('2025-01-18'),
    provider: {
      id: '3',
      businessName: 'Pet Paradise Boarding',
      user: {
        firstName: 'Lisa',
        lastName: 'Chang'
      },
      isVerified: false,
      averageRating: 0
    },
    bookingCount: 0,
    averageRating: 0,
    reviewCount: 0,
    tags: ['pet-sitting', 'overnight', 'home-care'],
    availableLocations: ['San Francisco', 'Daly City'],
    requirements: ['Home visit consultation required', 'Pet emergency contact information', 'Detailed care instructions']
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
    const category = searchParams.get('category') || 'all'
    const status = searchParams.get('status') || 'all'
    const provider = searchParams.get('provider') || 'all'
    const search = searchParams.get('search') || ''

    // Filter services based on parameters
    let filteredServices = mockServices

    if (category !== 'all') {
      filteredServices = filteredServices.filter(service =>
        service.category === category
      )
    }

    if (status !== 'all') {
      switch (status) {
        case 'active':
          filteredServices = filteredServices.filter(s => s.isActive)
          break
        case 'inactive':
          filteredServices = filteredServices.filter(s => !s.isActive)
          break
        case 'pending_approval':
          filteredServices = filteredServices.filter(s => s.requiresApproval)
          break
        case 'featured':
          filteredServices = filteredServices.filter(s => s.featured)
          break
      }
    }

    if (provider !== 'all') {
      filteredServices = filteredServices.filter(service =>
        service.provider.id === provider
      )
    }

    if (search) {
      filteredServices = filteredServices.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase()) ||
        service.provider.businessName.toLowerCase().includes(search.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }

    // Sort by booking count (popular services first)
    filteredServices.sort((a, b) => b.bookingCount - a.bookingCount)

    // Pagination
    const skip = (page - 1) * limit
    const services = filteredServices.slice(skip, skip + limit)
    const totalCount = filteredServices.length
    const totalPages = Math.ceil(totalCount / limit)

    // Calculate summary stats
    const summary = {
      totalServices: mockServices.length,
      activeServices: mockServices.filter(s => s.isActive).length,
      inactiveServices: mockServices.filter(s => !s.isActive).length,
      featuredServices: mockServices.filter(s => s.featured).length,
      pendingApproval: mockServices.filter(s => s.requiresApproval).length,
      totalBookings: mockServices.reduce((sum, s) => sum + s.bookingCount, 0),
      averageRating: mockServices.reduce((sum, s) => sum + s.averageRating, 0) / mockServices.length,
      categories: [...new Set(mockServices.map(s => s.category))],
      providers: [...new Set(mockServices.map(s => ({ id: s.provider.id, name: s.provider.businessName })))]
    }

    return NextResponse.json({
      services,
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
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { serviceId, action, reason, price, duration } = body

    if (!serviceId || !action) {
      return NextResponse.json({ error: 'Service ID and action are required' }, { status: 400 })
    }

    // Find service in mock data
    const serviceIndex = mockServices.findIndex(service => service.id === serviceId)
    if (serviceIndex === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Update mock service based on action
    switch (action) {
      case 'activate':
        mockServices[serviceIndex].isActive = true
        mockServices[serviceIndex].requiresApproval = false
        break
      case 'deactivate':
        mockServices[serviceIndex].isActive = false
        break
      case 'approve':
        mockServices[serviceIndex].requiresApproval = false
        mockServices[serviceIndex].isActive = true
        break
      case 'reject':
        mockServices[serviceIndex].requiresApproval = true
        mockServices[serviceIndex].isActive = false
        break
      case 'feature':
        mockServices[serviceIndex].featured = true
        break
      case 'unfeature':
        mockServices[serviceIndex].featured = false
        break
      case 'update_price':
        if (price !== undefined) {
          mockServices[serviceIndex].basePrice = parseFloat(price)
        }
        break
      case 'update_duration':
        if (duration !== undefined) {
          mockServices[serviceIndex].duration = parseInt(duration)
        }
        break
      case 'delete':
        mockServices.splice(serviceIndex, 1)
        return NextResponse.json({
          message: 'Service deleted successfully'
        })
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Service updated successfully',
      service: mockServices[serviceIndex]
    })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}