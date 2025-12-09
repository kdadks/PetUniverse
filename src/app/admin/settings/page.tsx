'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import { Settings } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="h-8 w-8 text-blue-600" />
              Settings
            </h1>
            <p className="text-gray-600 mt-1">Manage system configuration and preferences</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center py-12">
            <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-500">System settings will be available soon.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
