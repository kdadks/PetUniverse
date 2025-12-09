'use client'

import { usePathname } from 'next/navigation'
import GlossyHeader from '@/components/ui/glossy-header'
import GlossyFooter from '@/components/ui/glossy-footer'
import { ReactNode } from 'react'

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Check if current route is an admin route
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <GlossyHeader />}
      <main className={isAdminRoute ? '' : 'pt-16'}>
        {children}
      </main>
      {!isAdminRoute && <GlossyFooter />}
    </>
  )
}
