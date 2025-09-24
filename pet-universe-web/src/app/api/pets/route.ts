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

    const pets = await prisma.pet.findMany({
      where: {
        ownerId: session.user.id,
        isActive: true
      },
      include: {
        healthRecords: {
          orderBy: { recordDate: 'desc' },
          take: 5
        },
        vaccinations: {
          orderBy: { dateGiven: 'desc' },
          take: 10
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ pets })
  } catch (error) {
    console.error('Error fetching pets:', error)
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
      name,
      species,
      breed,
      age,
      weight,
      gender,
      color,
      microchipId,
      description
    } = body

    // Validate required fields
    if (!name || !species || !breed) {
      return NextResponse.json(
        { message: 'Name, species, and breed are required' },
        { status: 400 }
      )
    }

    const pet = await prisma.pet.create({
      data: {
        name,
        species,
        breed,
        age: age ? parseInt(age) : null,
        weight: weight ? parseFloat(weight) : null,
        gender: gender || null,
        color: color || null,
        microchipId: microchipId || null,
        description: description || null,
        ownerId: session.user.id
      },
      include: {
        healthRecords: true,
        vaccinations: true
      }
    })

    return NextResponse.json({
      message: 'Pet created successfully',
      pet
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating pet:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}