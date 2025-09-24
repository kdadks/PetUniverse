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

    const healthRecords = await prisma.healthRecord.findMany({
      where: { petId },
      orderBy: { recordDate: 'desc' }
    })

    return NextResponse.json({ healthRecords })
  } catch (error) {
    console.error('Error fetching health records:', error)
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
      recordType,
      title,
      description,
      diagnosis,
      treatment,
      medications,
      veterinarian,
      clinicName,
      attachments,
      recordDate
    } = await request.json()

    // Validate required fields
    if (!petId || !recordType || !title || !recordDate) {
      return NextResponse.json(
        { message: 'Pet ID, record type, title, and record date are required' },
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

    const healthRecord = await prisma.healthRecord.create({
      data: {
        petId,
        recordType,
        title,
        description: description || null,
        diagnosis: diagnosis || null,
        treatment: treatment || null,
        medications: medications || null,
        veterinarian: veterinarian || null,
        clinicName: clinicName || null,
        attachments: attachments || [],
        recordDate: new Date(recordDate)
      }
    })

    return NextResponse.json({
      message: 'Health record created successfully',
      healthRecord
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating health record:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}