'use client'

import { usePathname } from 'next/navigation'
import GlossyHeader from '@/components/ui/glossy-header'
import GlossyFooter from '@/components/ui/glossy-footer'
import { ReactNode } from 'react'

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Check if current route is an admin or provider dashboard route
  const isAdminRoute = pathname?.startsWith('/admin')
  const isProviderDashboardRoute = pathname?.startsWith('/provider/dashboard')
  const shouldHideHeaderFooter = isAdminRoute || isProviderDashboardRoute

  return (
    <>
      {!shouldHideHeaderFooter && <GlossyHeader />}
      <main className={shouldHideHeaderFooter ? '' : 'pt-16'}>
        {children}
      </main>
      {!shouldHideHeaderFooter && <GlossyFooter />}
    </>
  )
}
