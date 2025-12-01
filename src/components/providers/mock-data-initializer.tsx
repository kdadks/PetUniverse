'use client'

import { useEffect } from 'react'
import { initializeMockData } from '@/lib/mockData'

export default function MockDataInitializer() {
  useEffect(() => {
    // Initialize mock data on client-side mount
    initializeMockData()
  }, [])

  return null
}
