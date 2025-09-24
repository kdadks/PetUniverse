import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock bookings data
const mockBookings = [
  {
    id: '1',
    status: 'COMPLETED',
    scheduledDate: new Date('2025-01-15'),
    scheduledTime: '10:00',
    duration: 60,
    totalAmount: 75,
    currency: 'USD',
    notes: 'Annual checkup for Buddy',
    createdAt: new Date('2025-01-10'),
    customer: {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com'
    },
    service: {
      id: '1',
      name: 'Routine Checkup',
      category: 'VETERINARY_CONSULTATION',
      duration: 60
    },
    provider: {
      id: '2',
      businessName: 'City Vet Clinic',
      user: {
        firstName: 'Dr. James',
        lastName: 'Smith'
      }
    },
    pet: {
      id: '1',
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever'
    },
    payment: {
      id: '1',
      status: 'COMPLETED',
      paymentMethod: 'card'
    }
  },
  {
    id: '2',
    status: 'PENDING',
    scheduledDate: new Date('2025-01-25'),
    scheduledTime: '14:30',
    duration: 90,
    totalAmount: 120,
    currency: 'USD',
    notes: 'Full grooming service',
    createdAt: new Date('2025-01-20'),
    customer: {
      id: '3',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.davis@email.com'
    },
    service: {
      id: '3',
      name: 'Full Grooming',
      category: 'GROOMING',
      duration: 90
    },
    provider: {
      id: '1',
      businessName: 'Happy Paws Grooming',
      user: {
        firstName: 'Maria',
        lastName: 'Rodriguez'
      }
    },
    pet: {
      id: '2',
      name: 'Whiskers',
      species: 'Cat',
      breed: 'Persian'
    },
    payment: {
      id: '2',
      status: 'PENDING',
      paymentMethod: 'card'
    }
  },
  {
    id: '3',
    status: 'CONFIRMED',
    scheduledDate: new Date('2025-01-28'),
    scheduledTime: '09:00',
    duration: 120,
    totalAmount: 150,
    currency: 'USD',
    notes: 'Basic obedience training',
    createdAt: new Date('2025-01-22'),
    customer: {
      id: '4',
      firstName: 'John',
      lastName: 'Wilson',
      email: 'john.wilson@email.com'
    },
    service: {
      id: '4',
      name: 'Basic Obedience',
      category: 'TRAINING',
      duration: 120
    },
    provider: {
      id: '4',
      businessName: 'Furry Friends Training',
      user: {
        firstName: 'Mark',
        lastName: 'Johnson'
      }
    },
    pet: {
      id: '3',
      name: 'Max',
      species: 'Dog',
      breed: 'Labrador'
    },
    payment: {
      id: '3',
      status: 'PENDING',
      paymentMethod: 'card'
    }
  },
  {
    id: '4',
    status: 'CANCELLED',
    scheduledDate: new Date('2025-01-20'),
    scheduledTime: '16:00',
    duration: 45,
    totalAmount: 45,
    currency: 'USD',
    notes: 'Vaccination appointment',
    cancellationReason: 'Pet was sick',
    createdAt: new Date('2025-01-18'),
    customer: {
      id: '5',
      firstName: 'Lisa',
      lastName: 'Garcia',
      email: 'lisa.garcia@email.com'
    },
    service: {
      id: '2',
      name: 'Vaccination',
      category: 'VETERINARY_APPOINTMENT',
      duration: 45
    },
    provider: {
      id: '2',
      businessName: 'City Vet Clinic',
      user: {
        firstName: 'Dr. James',
        lastName: 'Smith'
      }
    },
    pet: {
      id: '4',
      name: 'Luna',
      species: 'Cat',
      breed: 'Siamese'
    },
    payment: {
      id: '4',
      status: 'CANCELLED',
      paymentMethod: 'card'
    }
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
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // Filter mock bookings based on status and date range
    let filteredBookings = mockBookings

    if (status !== 'all') {
      filteredBookings = filteredBookings.filter(booking =>
        booking.status === status.toUpperCase()
      )
    }

    if (dateFrom || dateTo) {
      filteredBookings = filteredBookings.filter(booking => {
        const bookingDate = new Date(booking.scheduledDate)
        let inRange = true

        if (dateFrom) {
          inRange = inRange && bookingDate >= new Date(dateFrom)
        }
        if (dateTo) {
          inRange = inRange && bookingDate <= new Date(dateTo)
        }

        return inRange
      })
    }

    // Sort by scheduled date (desc)
    filteredBookings.sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())

    // Pagination
    const skip = (page - 1) * limit
    const bookings = filteredBookings.slice(skip, skip + limit)
    const totalCount = filteredBookings.length
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      bookings,
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
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { bookingId, action, reason } = body

    if (!bookingId || !action) {
      return NextResponse.json({ error: 'Booking ID and action are required' }, { status: 400 })
    }

    // Find booking in mock data
    const bookingIndex = mockBookings.findIndex(booking => booking.id === bookingId)
    if (bookingIndex === -1) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Update mock booking based on action
    switch (action) {
      case 'cancel':
        mockBookings[bookingIndex].status = 'CANCELLED'
        mockBookings[bookingIndex].cancellationReason = reason || 'Cancelled by admin'
        break
      case 'confirm':
        mockBookings[bookingIndex].status = 'CONFIRMED'
        break
      case 'complete':
        mockBookings[bookingIndex].status = 'COMPLETED'
        break
      case 'no_show':
        mockBookings[bookingIndex].status = 'NO_SHOW'
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Booking updated successfully',
      booking: mockBookings[bookingIndex]
    })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}