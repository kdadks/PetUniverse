import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Mock admin stats data
    const stats = {
      totalUsers: 12456,
      totalServiceProviders: 347,
      totalBookings: 8934,
      totalRevenue: 284750,
      totalProducts: 1247,
      activeUsers: 3456,
      pendingApprovals: 23,
      recentActivity: [
        { id: 1, type: 'user_signup', message: 'New user Sarah Johnson signed up', time: '2 minutes ago' },
        { id: 2, type: 'provider_application', message: 'Happy Paws Grooming applied to become a provider', time: '15 minutes ago' },
        { id: 3, type: 'booking_completed', message: 'Booking #8934 completed successfully', time: '1 hour ago' },
        { id: 4, type: 'product_added', message: 'New product "Premium Dog Food" added', time: '2 hours ago' },
        { id: 5, type: 'review_submitted', message: 'New 5-star review for City Vet Clinic', time: '3 hours ago' }
      ]
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 })
  }
}