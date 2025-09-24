import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const pet = await prisma.pet.findFirst({
      where: {
        id: params.id,
        ownerId: session.user.id,
        isActive: true
      },
      include: {
        healthRecords: {
          orderBy: { recordDate: 'desc' }
        },
        vaccinations: {
          orderBy: { dateGiven: 'desc' }
        },
        bookings: {
          include: {
            service: true,
            provider: {
              include: {
                user: true
              }
            }
          },
          orderBy: { scheduledDate: 'desc' }
        }
      }
    })

    if (!pet) {
      return NextResponse.json(
        { message: 'Pet not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ pet })
  } catch (error) {
    console.error('Error fetching pet:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if pet exists and belongs to user
    const existingPet = await prisma.pet.findFirst({
      where: {
        id: params.id,
        ownerId: session.user.id,
        isActive: true
      }
    })

    if (!existingPet) {
      return NextResponse.json(
        { message: 'Pet not found' },
        { status: 404 }
      )
    }

    const pet = await prisma.pet.update({
      where: { id: params.id },
      data: {
        name: name || existingPet.name,
        species: species || existingPet.species,
        breed: breed || existingPet.breed,
        age: age !== undefined ? (age ? parseInt(age) : null) : existingPet.age,
        weight: weight !== undefined ? (weight ? parseFloat(weight) : null) : existingPet.weight,
        gender: gender !== undefined ? gender : existingPet.gender,
        color: color !== undefined ? color : existingPet.color,
        microchipId: microchipId !== undefined ? microchipId : existingPet.microchipId,
        description: description !== undefined ? description : existingPet.description,
        updatedAt: new Date()
      },
      include: {
        healthRecords: true,
        vaccinations: true
      }
    })

    return NextResponse.json({
      message: 'Pet updated successfully',
      pet
    })

  } catch (error) {
    console.error('Error updating pet:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if pet exists and belongs to user
    const existingPet = await prisma.pet.findFirst({
      where: {
        id: params.id,
        ownerId: session.user.id,
        isActive: true
      }
    })

    if (!existingPet) {
      return NextResponse.json(
        { message: 'Pet not found' },
        { status: 404 }
      )
    }

    // Soft delete - mark as inactive
    await prisma.pet.update({
      where: { id: params.id },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      message: 'Pet deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting pet:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}