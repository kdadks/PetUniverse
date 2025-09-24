import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const businessType = searchParams.get('businessType')
    const isVerified = searchParams.get('isVerified')
    const location = searchParams.get('location')

    const whereClause: any = {
      isActive: true
    }

    if (businessType) {
      whereClause.businessType = businessType
    }

    if (isVerified !== null) {
      whereClause.isVerified = isVerified === 'true'
    }

    const serviceProviders = await prisma.serviceProvider.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatar: true
          }
        },
        services: {
          where: { isActive: true },
          take: 5
        },
        _count: {
          select: {
            services: true,
            bookings: true
          }
        }
      },
      orderBy: [
        { isVerified: 'desc' },
        { averageRating: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ serviceProviders })
  } catch (error) {
    console.error('Error fetching service providers:', error)
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

    const body = await request.json()
    const {
      businessName,
      businessType,
      description,
      specializations,
      licenseNumber,
      businessHours,
      serviceArea,
      policies
    } = body

    // Validate required fields
    if (!businessName || !businessType) {
      return NextResponse.json(
        { message: 'Business name and type are required' },
        { status: 400 }
      )
    }

    // Check if user already has a service provider profile
    const existingProvider = await prisma.serviceProvider.findUnique({
      where: { userId: session.user.id }
    })

    if (existingProvider) {
      return NextResponse.json(
        { message: 'User already has a service provider profile' },
        { status: 400 }
      )
    }

    // Update user role to SERVICE_PROVIDER
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: 'SERVICE_PROVIDER' }
    })

    // Create service provider profile
    const serviceProvider = await prisma.serviceProvider.create({
      data: {
        userId: session.user.id,
        businessName,
        businessType,
        description: description || null,
        specializations: specializations || [],
        licenseNumber: licenseNumber || null,
        businessHours: businessHours || null,
        serviceArea: serviceArea || null,
        policies: policies || null
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Service provider profile created successfully',
      serviceProvider
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating service provider:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}