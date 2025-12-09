'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Warehouse, Package, CheckCircle, AlertTriangle } from 'lucide-react'

interface InventorySummary {
  totalItems?: number
  inStock?: number
  lowStock?: number
  outOfStock?: number
}

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([])
  const [inventoryLoading, setInventoryLoading] = useState(false)
  const [inventorySummary, setInventorySummary] = useState<InventorySummary>({})

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async (category = 'all', status = 'all', page = 1) => {
    setInventoryLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        category,
        status
      })

      const response = await fetch(`/api/admin/inventory?${params}`)
      if (!response.ok) throw new Error('Failed to fetch inventory')

      const data = await response.json()
      setInventory(data.inventory)
      setInventorySummary(data.summary)
    } catch (error) {
      console.error('Error fetching inventory:', error)
      setInventory([])
    } finally {
      setInventoryLoading(false)
    }
  }

  const handleInventoryAction = async (itemId: string, action: string, data?: any) => {
    try {
      const response = await fetch('/api/admin/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, action, ...data })
      })

      if (!response.ok) throw new Error('Failed to update inventory')

      await fetchInventory()
    } catch (error) {
      console.error('Error updating inventory:', error)
      alert('Failed to update inventory')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Warehouse className="h-8 w-8 text-blue-600" />
              Inventory Management
            </h1>
            <p className="text-gray-600 mt-1">Manage product inventory and stock levels</p>
          </div>
        </div>

        {/* Inventory Summary */}
        {inventorySummary && Object.keys(inventorySummary).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Items</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{inventorySummary.totalItems}</p>
                </div>
                <Package className="h-12 w-12 text-blue-600 opacity-50" />
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">In Stock</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">{inventorySummary.inStock}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600 opacity-50" />
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Low Stock</p>
                  <p className="text-3xl font-bold text-yellow-900 mt-1">{inventorySummary.lowStock}</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-yellow-600 opacity-50" />
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Out of Stock</p>
                  <p className="text-3xl font-bold text-red-900 mt-1">{inventorySummary.outOfStock}</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-red-600 opacity-50" />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">All Inventory</h3>
            <div className="flex space-x-3">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => fetchInventory('all', e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <button
                onClick={() => fetchInventory()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Refresh
              </button>
            </div>
          </div>

          {inventoryLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">SKU</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Stock</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Supplier</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.length > 0 ? inventory.map((item: any) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.sku}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{item.currentStock} / {item.maxStock}</div>
                          <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">${item.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                          item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.supplier}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 text-sm"
                            onClick={() => handleInventoryAction(item.id, 'restock', { quantity: 50 })}
                          >
                            Restock
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900 text-sm"
                            onClick={() => handleInventoryAction(item.id, 'adjust_stock')}
                          >
                            Adjust
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500">
                        No inventory items found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
