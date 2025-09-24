import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('bookingId')
    const providerId = searchParams.get('providerId')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10

    const whereClause: any = {
      isActive: true
    }

    if (bookingId) {
      whereClause.bookingId = bookingId
    }

    if (providerId) {
      whereClause.booking = {
        providerId: providerId
      }
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        booking: {
          include: {
            service: {
              select: {
                name: true,
                category: true
              }
            },
            pet: {
              select: {
                name: true,
                species: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { bookingId, rating, title, comment, images } = await request.json()

    // Validate required fields
    if (!bookingId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Booking ID and valid rating (1-5) are required' },
        { status: 400 }
      )
    }

    // Check if booking exists and belongs to user
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        customerId: session.user.id,
        status: 'COMPLETED'
      }
    })

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found or not completed' },
        { status: 404 }
      )
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { bookingId }
    })

    if (existingReview) {
      return NextResponse.json(
        { message: 'Review already exists for this booking' },
        { status: 400 }
      )
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        customerId: session.user.id,
        bookingId,
        rating,
        title: title || null,
        comment: comment || null,
        images: images || [],
        isVerified: true // Mark as verified since it's from a completed booking
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        booking: {
          include: {
            service: {
              select: {
                name: true,
                category: true
              }
            },
            pet: {
              select: {
                name: true,
                species: true
              }
            }
          }
        }
      }
    })

    // Update service provider's average rating
    const providerId = booking.providerId
    const providerReviews = await prisma.review.findMany({
      where: {
        booking: {
          providerId: providerId
        },
        isActive: true
      }
    })

    const averageRating = providerReviews.reduce((sum, review) => sum + review.rating, 0) / providerReviews.length
    const totalReviews = providerReviews.length

    await prisma.serviceProvider.update({
      where: { id: providerId },
      data: {
        averageRating,
        totalReviews
      }
    })

    return NextResponse.json({
      message: 'Review created successfully',
      review
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}