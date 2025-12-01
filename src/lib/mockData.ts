// Mock data for local storage (temporary until Supabase is implemented)

export const initializeMockData = () => {
  if (typeof window === 'undefined') return

  // Check if data already exists
  if (localStorage.getItem('petuniverse_initialized')) return

  // Customer data
  const customerData = {
    id: 'customer-1',
    email: 'customer@petuniverse.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'CUSTOMER',
    phone: '+1-555-100-1000',
    address: {
      street: '123 Pet Lover Lane',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    pets: [
      {
        id: 'pet-1',
        name: 'Max',
        species: 'DOG',
        breed: 'Golden Retriever',
        age: 3,
        weight: 70.0,
        gender: 'MALE',
        color: 'Golden',
        photos: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'],
        description: 'Friendly and energetic golden retriever'
      },
      {
        id: 'pet-2',
        name: 'Luna',
        species: 'CAT',
        breed: 'Persian',
        age: 2,
        weight: 10.0,
        gender: 'FEMALE',
        color: 'White',
        photos: ['https://images.unsplash.com/photo-1573865526739-10c1dd2bf2e0?w=400'],
        description: 'Sweet and gentle Persian cat'
      }
    ]
  }

  // Provider data
  const providerData = {
    id: 'provider-1',
    email: 'provider@petuniverse.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'SERVICE_PROVIDER',
    phone: '+1-555-200-2000',
    address: {
      street: '456 Grooming Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA'
    },
    serviceProvider: {
      businessName: 'Pawsome Grooming Studio',
      description: 'Passionate pet groomer with over 8 years of experience specializing in all breeds. I believe every pet deserves to look and feel their best.',
      specializations: ['Long-haired breeds', 'Sensitive skin care', 'Show dog preparation', 'Creative grooming', 'Senior pet care'],
      licenseNumber: 'PG-2024-001',
      isVerified: true,
      averageRating: 4.8,
      totalReviews: 127,
      businessHours: {
        monday: { open: '09:00', close: '18:00', closed: false },
        tuesday: { open: '09:00', close: '18:00', closed: false },
        wednesday: { open: '09:00', close: '18:00', closed: false },
        thursday: { open: '09:00', close: '18:00', closed: false },
        friday: { open: '09:00', close: '18:00', closed: false },
        saturday: { open: '10:00', close: '16:00', closed: false },
        sunday: { open: '', close: '', closed: true }
      },
      serviceArea: {
        radius: 20,
        cities: ['New York', 'Brooklyn', 'Queens'],
        description: 'Serving NYC and surrounding boroughs'
      },
      gallery: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
        'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&q=80',
        'https://images.unsplash.com/photo-1581888227599-779811939961?w=800&q=80',
        'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=800&q=80',
        'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80'
      ],
      videos: [
        {
          id: 'video-1',
          title: 'Golden Retriever Full Grooming Session',
          thumbnail: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
          id: 'video-2',
          title: 'Poodle Creative Grooming',
          thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
          id: 'video-3',
          title: 'Cat Grooming Techniques',
          thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
          id: 'video-4',
          title: 'Puppy First Grooming Experience',
          thumbnail: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
      ],
      certifications: [
        'Certified Professional Groomer (CPG)',
        'National Dog Groomers Association Member',
        'Pet First Aid & CPR Certified',
        'Advanced Creative Grooming Certificate'
      ]
    },
    services: [
      {
        id: 'service-1',
        name: 'Premium Dog Grooming',
        description: 'Complete professional grooming service for dogs of all sizes. Includes bathing, brushing, nail trimming, ear cleaning, and styling.',
        category: 'GROOMING',
        price: 75.00,
        duration: 120,
        isActive: true,
        images: [
          'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80'
        ],
        tags: ['dogs', 'grooming', 'bath', 'premium'],
        features: [
          'Full bath with premium shampoo',
          'Blow dry and brush out',
          'Nail trimming and filing',
          'Ear cleaning',
          'Sanitary trim',
          'Professional styling',
          'Cologne spray',
          'Bandana or bow tie'
        ]
      },
      {
        id: 'service-2',
        name: 'Cat Grooming & Bath',
        description: 'Specialized cat grooming service with gentle techniques. Includes bathing, brushing, nail trimming, and ear cleaning.',
        category: 'GROOMING',
        price: 65.00,
        duration: 90,
        isActive: true,
        images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'],
        tags: ['cats', 'grooming', 'bath'],
        features: [
          'Gentle bath with cat-safe products',
          'Thorough brushing',
          'Nail trimming',
          'Ear cleaning',
          'Mat removal',
          'Stress-free handling'
        ]
      },
      {
        id: 'service-3',
        name: 'Puppy First Grooming',
        description: 'Gentle introduction to grooming for puppies. Positive experience with treats and patience.',
        category: 'GROOMING',
        price: 50.00,
        duration: 60,
        isActive: true,
        images: [],
        tags: ['puppy', 'grooming', 'first-time'],
        features: [
          'Gentle introduction to grooming',
          'Positive reinforcement',
          'Light bath',
          'Nail trimming introduction',
          'Brush and cuddle time',
          'Puppy-safe products'
        ]
      }
    ]
  }

  // Admin data
  const adminData = {
    id: 'admin-1',
    email: 'admin@petuniverse.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    phone: '+1-555-300-3000',
    address: {
      street: '789 Admin Plaza',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      country: 'USA'
    }
  }

  // Store in localStorage
  localStorage.setItem('petuniverse_customer', JSON.stringify(customerData))
  localStorage.setItem('petuniverse_provider', JSON.stringify(providerData))
  localStorage.setItem('petuniverse_admin', JSON.stringify(adminData))
  localStorage.setItem('petuniverse_initialized', 'true')

  console.log('✅ Mock data initialized in localStorage')
}

// Get user data by email
export const getUserByEmail = (email: string) => {
  if (typeof window === 'undefined') return null

  const customerData = localStorage.getItem('petuniverse_customer')
  const providerData = localStorage.getItem('petuniverse_provider')
  const adminData = localStorage.getItem('petuniverse_admin')

  if (customerData) {
    const customer = JSON.parse(customerData)
    if (customer.email === email) return customer
  }

  if (providerData) {
    const provider = JSON.parse(providerData)
    if (provider.email === email) return provider
  }

  if (adminData) {
    const admin = JSON.parse(adminData)
    if (admin.email === email) return admin
  }

  return null
}

// Get provider services
export const getProviderServices = (providerId: string) => {
  if (typeof window === 'undefined') return []

  const providerData = localStorage.getItem('petuniverse_provider')
  if (!providerData) return []

  const provider = JSON.parse(providerData)
  if (provider.id === providerId) {
    return provider.services || []
  }

  return []
}

// Update provider services
export const updateProviderServices = (providerId: string, services: any[]) => {
  if (typeof window === 'undefined') return false

  const providerData = localStorage.getItem('petuniverse_provider')
  if (!providerData) return false

  const provider = JSON.parse(providerData)
  if (provider.id === providerId) {
    provider.services = services
    localStorage.setItem('petuniverse_provider', JSON.stringify(provider))
    return true
  }

  return false
}

// Update provider profile
export const updateProviderProfile = (providerId: string, updates: any) => {
  if (typeof window === 'undefined') return false

  const providerData = localStorage.getItem('petuniverse_provider')
  if (!providerData) return false

  const provider = JSON.parse(providerData)
  if (provider.id === providerId) {
    Object.assign(provider, updates)
    localStorage.setItem('petuniverse_provider', JSON.stringify(provider))
    return true
  }

  return false
}
