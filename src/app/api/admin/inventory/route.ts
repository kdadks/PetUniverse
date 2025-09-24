import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock inventory data
const mockInventory = [
  {
    id: '1',
    name: 'Premium Dog Food',
    category: 'Food',
    sku: 'PDF001',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    price: 29.99,
    cost: 18.50,
    supplier: 'PetNutrition Co.',
    lastRestocked: new Date('2025-01-20'),
    status: 'In Stock',
    location: 'Warehouse A - Section 1',
    description: 'High-quality premium dog food for adult dogs'
  },
  {
    id: '2',
    name: 'Cat Litter Premium',
    category: 'Hygiene',
    sku: 'CLP002',
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    price: 15.99,
    cost: 9.75,
    supplier: 'Clean Paws Ltd.',
    lastRestocked: new Date('2025-01-15'),
    status: 'Low Stock',
    location: 'Warehouse B - Section 2',
    description: 'Clumping cat litter with odor control'
  },
  {
    id: '3',
    name: 'Dog Toy - Rope Ball',
    category: 'Toys',
    sku: 'DTR003',
    currentStock: 0,
    minStock: 20,
    maxStock: 150,
    price: 12.99,
    cost: 7.25,
    supplier: 'Fun Pet Toys',
    lastRestocked: new Date('2025-01-10'),
    status: 'Out of Stock',
    location: 'Warehouse A - Section 3',
    description: 'Durable rope ball toy for medium to large dogs'
  },
  {
    id: '4',
    name: 'Bird Seed Mix',
    category: 'Food',
    sku: 'BSM004',
    currentStock: 32,
    minStock: 12,
    maxStock: 60,
    price: 8.99,
    cost: 5.50,
    supplier: 'Avian Delights',
    lastRestocked: new Date('2025-01-22'),
    status: 'In Stock',
    location: 'Warehouse C - Section 1',
    description: 'Nutritious seed mix for various bird species'
  },
  {
    id: '5',
    name: 'Fish Tank Filter',
    category: 'Aquarium',
    sku: 'FTF005',
    currentStock: 18,
    minStock: 8,
    maxStock: 40,
    price: 24.99,
    cost: 14.25,
    supplier: 'AquaTech Solutions',
    lastRestocked: new Date('2025-01-18'),
    status: 'In Stock',
    location: 'Warehouse B - Section 4',
    description: 'High-efficiency filter for medium-sized aquariums'
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
    const category = searchParams.get('category') || 'all'
    const status = searchParams.get('status') || 'all'
    const search = searchParams.get('search') || ''

    // Filter inventory based on parameters
    let filteredInventory = mockInventory

    if (category !== 'all') {
      filteredInventory = filteredInventory.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (status !== 'all') {
      filteredInventory = filteredInventory.filter(item =>
        item.status.toLowerCase().replace(' ', '_') === status.toLowerCase()
      )
    }

    if (search) {
      filteredInventory = filteredInventory.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.supplier.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sort by stock level (low stock items first)
    filteredInventory.sort((a, b) => {
      if (a.status === 'Out of Stock' && b.status !== 'Out of Stock') return -1
      if (a.status === 'Low Stock' && b.status === 'In Stock') return -1
      return 0
    })

    // Pagination
    const skip = (page - 1) * limit
    const inventory = filteredInventory.slice(skip, skip + limit)
    const totalCount = filteredInventory.length
    const totalPages = Math.ceil(totalCount / limit)

    // Calculate summary stats
    const summary = {
      totalItems: mockInventory.length,
      inStock: mockInventory.filter(item => item.status === 'In Stock').length,
      lowStock: mockInventory.filter(item => item.status === 'Low Stock').length,
      outOfStock: mockInventory.filter(item => item.status === 'Out of Stock').length,
      totalValue: mockInventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0),
      categories: [...new Set(mockInventory.map(item => item.category))]
    }

    return NextResponse.json({
      inventory,
      summary,
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
    console.error('Error fetching inventory:', error)
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { itemId, action, quantity, price, cost } = body

    if (!itemId || !action) {
      return NextResponse.json({ error: 'Item ID and action are required' }, { status: 400 })
    }

    // Find item in mock data
    const itemIndex = mockInventory.findIndex(item => item.id === itemId)
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Update mock inventory based on action
    switch (action) {
      case 'restock':
        if (!quantity || quantity <= 0) {
          return NextResponse.json({ error: 'Valid quantity is required for restocking' }, { status: 400 })
        }
        mockInventory[itemIndex].currentStock += parseInt(quantity)
        mockInventory[itemIndex].lastRestocked = new Date()
        // Update status based on new stock level
        if (mockInventory[itemIndex].currentStock > mockInventory[itemIndex].minStock) {
          mockInventory[itemIndex].status = 'In Stock'
        }
        break
      case 'adjust_stock':
        if (quantity === undefined) {
          return NextResponse.json({ error: 'Quantity is required for stock adjustment' }, { status: 400 })
        }
        mockInventory[itemIndex].currentStock = parseInt(quantity)
        // Update status based on new stock level
        if (mockInventory[itemIndex].currentStock === 0) {
          mockInventory[itemIndex].status = 'Out of Stock'
        } else if (mockInventory[itemIndex].currentStock <= mockInventory[itemIndex].minStock) {
          mockInventory[itemIndex].status = 'Low Stock'
        } else {
          mockInventory[itemIndex].status = 'In Stock'
        }
        break
      case 'update_price':
        if (price !== undefined) {
          mockInventory[itemIndex].price = parseFloat(price)
        }
        if (cost !== undefined) {
          mockInventory[itemIndex].cost = parseFloat(cost)
        }
        break
      case 'update_thresholds':
        if (body.minStock !== undefined) {
          mockInventory[itemIndex].minStock = parseInt(body.minStock)
        }
        if (body.maxStock !== undefined) {
          mockInventory[itemIndex].maxStock = parseInt(body.maxStock)
        }
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Inventory updated successfully',
      item: mockInventory[itemIndex]
    })
  } catch (error) {
    console.error('Error updating inventory:', error)
    return NextResponse.json({ error: 'Failed to update inventory' }, { status: 500 })
  }
}