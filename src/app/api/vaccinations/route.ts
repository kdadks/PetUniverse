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

    const { searchParams } = new URL(request.url)
    const petId = searchParams.get('petId')

    if (!petId) {
      return NextResponse.json(
        { message: 'Pet ID is required' },
        { status: 400 }
      )
    }

    // Verify pet ownership
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        ownerId: session.user.id,
        isActive: true
      }
    })

    if (!pet) {
      return NextResponse.json(
        { message: 'Pet not found' },
        { status: 404 }
      )
    }

    const vaccinations = await prisma.vaccination.findMany({
      where: { petId },
      orderBy: { dateGiven: 'desc' }
    })

    // Get upcoming vaccinations (due within next 30 days)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    const upcomingVaccinations = await prisma.vaccination.findMany({
      where: {
        petId,
        nextDueDate: {
          gte: new Date(),
          lte: thirtyDaysFromNow
        }
      },
      orderBy: { nextDueDate: 'asc' }
    })

    return NextResponse.json({
      vaccinations,
      upcomingVaccinations
    })
  } catch (error) {
    console.error('Error fetching vaccinations:', error)
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

    const {
      petId,
      vaccineName,
      vaccineType,
      manufacturer,
      batchNumber,
      dateGiven,
      nextDueDate,
      veterinarian,
      clinicName,
      notes
    } = await request.json()

    // Validate required fields
    if (!petId || !vaccineName || !vaccineType || !dateGiven) {
      return NextResponse.json(
        { message: 'Pet ID, vaccine name, type, and date given are required' },
        { status: 400 }
      )
    }

    // Verify pet ownership
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        ownerId: session.user.id,
        isActive: true
      }
    })

    if (!pet) {
      return NextResponse.json(
        { message: 'Pet not found' },
        { status: 404 }
      )
    }

    const vaccination = await prisma.vaccination.create({
      data: {
        petId,
        vaccineName,
        vaccineType,
        manufacturer: manufacturer || null,
        batchNumber: batchNumber || null,
        dateGiven: new Date(dateGiven),
        nextDueDate: nextDueDate ? new Date(nextDueDate) : null,
        veterinarian: veterinarian || null,
        clinicName: clinicName || null,
        notes: notes || null
      }
    })

    return NextResponse.json({
      message: 'Vaccination record created successfully',
      vaccination
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating vaccination record:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}