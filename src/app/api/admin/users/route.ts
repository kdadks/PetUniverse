import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock users data
const mockUsers = [
  {
    id: '1',
    email: 'sarah.johnson@email.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'CUSTOMER',
    isActive: true,
    isVerified: true,
    avatar: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-20'),
    _count: { pets: 2, orders: 5, reviews: 3 }
  },
  {
    id: '2',
    email: 'mike.brown@email.com',
    firstName: 'Mike',
    lastName: 'Brown',
    role: 'SERVICE_PROVIDER',
    isActive: true,
    isVerified: true,
    avatar: null,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-18'),
    _count: { pets: 0, orders: 0, reviews: 0 }
  },
  {
    id: '3',
    email: 'emma.davis@email.com',
    firstName: 'Emma',
    lastName: 'Davis',
    role: 'CUSTOMER',
    isActive: false,
    isVerified: true,
    avatar: null,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-15'),
    _count: { pets: 1, orders: 2, reviews: 1 }
  },
  {
    id: '4',
    email: 'john.wilson@email.com',
    firstName: 'John',
    lastName: 'Wilson',
    role: 'CUSTOMER',
    isActive: true,
    isVerified: false,
    avatar: null,
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-19'),
    _count: { pets: 1, orders: 1, reviews: 0 }
  },
  {
    id: '5',
    email: 'lisa.garcia@email.com',
    firstName: 'Lisa',
    lastName: 'Garcia',
    role: 'SERVICE_PROVIDER',
    isActive: true,
    isVerified: false,
    avatar: null,
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-16'),
    _count: { pets: 0, orders: 0, reviews: 0 }
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
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const role = searchParams.get('role') || 'all'

    // Filter mock users based on search and status
    let filteredUsers = mockUsers

    if (search) {
      const searchLower = search.toLowerCase()
      filteredUsers = filteredUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    }

    if (status !== 'all') {
      filteredUsers = filteredUsers.filter(user =>
        status === 'active' ? user.isActive : !user.isActive
      )
    }

    if (role !== 'all') {
      filteredUsers = filteredUsers.filter(user =>
        user.role === role.toUpperCase()
      )
    }

    // Pagination
    const skip = (page - 1) * limit
    const users = filteredUsers.slice(skip, skip + limit)
    const totalCount = filteredUsers.length
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      users,
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
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userId, action } = body

    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID and action are required' }, { status: 400 })
    }

    // Find user in mock data
    const userIndex = mockUsers.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update mock user based on action
    switch (action) {
      case 'activate':
        mockUsers[userIndex].isActive = true
        break
      case 'deactivate':
        mockUsers[userIndex].isActive = false
        break
      case 'verify':
        mockUsers[userIndex].isVerified = true
        break
      case 'unverify':
        mockUsers[userIndex].isVerified = false
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    mockUsers[userIndex].updatedAt = new Date()

    return NextResponse.json({
      message: 'User updated successfully',
      user: mockUsers[userIndex]
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}