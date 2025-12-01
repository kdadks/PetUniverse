import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Hash password for all test accounts
  const hashedPassword = await bcrypt.hash('password123', 10)

  // 1. Create CUSTOMER test account
  const customer = await prisma.user.upsert({
    where: { email: 'customer@petuniverse.com' },
    update: {},
    create: {
      email: 'customer@petuniverse.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'CUSTOMER',
      isVerified: true,
      isActive: true,
      phone: '+1-555-100-1000',
      address: {
        street: '123 Pet Lover Lane',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      accounts: {
        create: {
          type: 'credentials',
          provider: 'credentials',
          providerAccountId: 'customer-credentials',
        }
      }
    },
  })

  console.log('✅ Customer account created:', customer.email)

  // 2. Create SERVICE PROVIDER test account
  const provider = await prisma.user.upsert({
    where: { email: 'provider@petuniverse.com' },
    update: {},
    create: {
      email: 'provider@petuniverse.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'SERVICE_PROVIDER',
      isVerified: true,
      isActive: true,
      phone: '+1-555-200-2000',
      address: {
        street: '456 Grooming Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'USA'
      },
      accounts: {
        create: {
          type: 'credentials',
          provider: 'credentials',
          providerAccountId: 'provider-credentials',
        }
      },
      serviceProvider: {
        create: {
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
          policies: {
            cancellation: '24 hours notice required for cancellation',
            refund: 'Full refund if cancelled 48 hours in advance',
            terms: 'Professional grooming services with premium products'
          }
        }
      }
    },
  })

  console.log('✅ Service Provider account created:', provider.email)

  // Create sample services for the provider
  const serviceProvider = await prisma.serviceProvider.findUnique({
    where: { userId: provider.id }
  })

  if (serviceProvider) {
    const services = await prisma.service.createMany({
      data: [
        {
          name: 'Premium Dog Grooming',
          description: 'Complete professional grooming service for dogs of all sizes. Includes bathing, brushing, nail trimming, ear cleaning, and styling.',
          category: 'GROOMING',
          price: 75.00,
          duration: 120,
          providerId: serviceProvider.id,
          isActive: true,
          images: [
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
            'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80'
          ],
          tags: ['dogs', 'grooming', 'bath', 'premium']
        },
        {
          name: 'Cat Grooming & Bath',
          description: 'Specialized cat grooming service with gentle techniques. Includes bathing, brushing, nail trimming, and ear cleaning.',
          category: 'GROOMING',
          price: 65.00,
          duration: 90,
          providerId: serviceProvider.id,
          isActive: true,
          images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'],
          tags: ['cats', 'grooming', 'bath']
        },
        {
          name: 'Puppy First Grooming',
          description: 'Gentle introduction to grooming for puppies. Positive experience with treats and patience.',
          category: 'GROOMING',
          price: 50.00,
          duration: 60,
          providerId: serviceProvider.id,
          isActive: true,
          images: [],
          tags: ['puppy', 'grooming', 'first-time']
        }
      ],
      skipDuplicates: true
    })

    console.log(`✅ Created ${services.count} sample services for provider`)
  }

  // 3. Create ADMIN test account
  const admin = await prisma.user.upsert({
    where: { email: 'admin@petuniverse.com' },
    update: {},
    create: {
      email: 'admin@petuniverse.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true,
      isActive: true,
      phone: '+1-555-300-3000',
      address: {
        street: '789 Admin Plaza',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        country: 'USA'
      },
      accounts: {
        create: {
          type: 'credentials',
          provider: 'credentials',
          providerAccountId: 'admin-credentials',
        }
      }
    },
  })

  console.log('✅ Admin account created:', admin.email)

  // Create sample pets for customer
  const pets = await prisma.pet.createMany({
    data: [
      {
        name: 'Max',
        species: 'DOG',
        breed: 'Golden Retriever',
        age: 3,
        weight: 70.0,
        gender: 'MALE',
        color: 'Golden',
        ownerId: customer.id,
        photos: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'],
        description: 'Friendly and energetic golden retriever'
      },
      {
        name: 'Luna',
        species: 'CAT',
        breed: 'Persian',
        age: 2,
        weight: 10.0,
        gender: 'FEMALE',
        color: 'White',
        ownerId: customer.id,
        photos: ['https://images.unsplash.com/photo-1573865526739-10c1dd2bf2e0?w=400'],
        description: 'Sweet and gentle Persian cat'
      }
    ],
    skipDuplicates: true
  })

  console.log(`✅ Created ${pets.count} sample pets for customer`)

  console.log('\n🎉 Database seeding completed successfully!\n')
  console.log('📝 Test Accounts Created:')
  console.log('┌─────────────────────────────────────────────────────────┐')
  console.log('│ CUSTOMER                                                │')
  console.log('│ Email: customer@petuniverse.com                         │')
  console.log('│ Password: password123                                   │')
  console.log('│ Access: /dashboard                                      │')
  console.log('├─────────────────────────────────────────────────────────┤')
  console.log('│ SERVICE PROVIDER                                        │')
  console.log('│ Email: provider@petuniverse.com                         │')
  console.log('│ Password: password123                                   │')
  console.log('│ Access: /provider/dashboard                             │')
  console.log('├─────────────────────────────────────────────────────────┤')
  console.log('│ ADMIN                                                   │')
  console.log('│ Email: admin@petuniverse.com                            │')
  console.log('│ Password: password123                                   │')
  console.log('│ Access: /admin                                          │')
  console.log('└─────────────────────────────────────────────────────────┘')
  console.log('\n✨ You can now sign in with these accounts!\n')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
