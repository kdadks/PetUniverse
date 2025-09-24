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
    const receiverId = searchParams.get('receiverId')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50

    if (!receiverId) {
      return NextResponse.json(
        { message: 'Receiver ID is required' },
        { status: 400 }
      )
    }

    const messages = await prisma.chatMessage.findMany({
      where: {
        OR: [
          {
            senderId: session.user.id,
            receiverId: receiverId
          },
          {
            senderId: receiverId,
            receiverId: session.user.id
          }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    // Mark messages as read
    await prisma.chatMessage.updateMany({
      where: {
        senderId: receiverId,
        receiverId: session.user.id,
        isRead: false
      },
      data: { isRead: true }
    })

    return NextResponse.json({ messages: messages.reverse() })
  } catch (error) {
    console.error('Error fetching messages:', error)
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

    const { receiverId, content, messageType = 'TEXT', attachments } = await request.json()

    // Validate required fields
    if (!receiverId || !content) {
      return NextResponse.json(
        { message: 'Receiver ID and content are required' },
        { status: 400 }
      )
    }

    // Verify receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId }
    })

    if (!receiver) {
      return NextResponse.json(
        { message: 'Receiver not found' },
        { status: 404 }
      )
    }

    const message = await prisma.chatMessage.create({
      data: {
        senderId: session.user.id,
        receiverId,
        content,
        messageType,
        attachments: attachments || []
      }
    })

    return NextResponse.json({
      message: 'Message sent successfully',
      chatMessage: message
    }, { status: 201 })

  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}