'use client'

import { ReactNode } from 'react'
import ProviderSidebar from './ProviderSidebar'

interface ProviderLayoutProps {
  children: ReactNode
}

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      <ProviderSidebar />
      <main className="ml-[280px] transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
