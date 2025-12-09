'use client'

import { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <AdminSidebar />
      <main className="ml-[280px] transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
