'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import {
  Star,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  User,
  Shield,
  Phone,
  Mail,
  Heart,
  ArrowLeft,
  CheckCircle,
  Award
} from 'lucide-react'
import { useCurrency } from '@/lib/useCurrency'

interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  provider: {
    businessName: string
    averageRating: number
    totalReviews: number
    isVerified: boolean
    user: {
      firstName: string
      lastName: string
    }
    location: string
    experience: string
    specialties: string[]
    contact: {
      phone: string
      email: string
    }
  }
  features: string[]
  gallery: string[]
}

export default function ServiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { formatPrice, isLoading: currencyLoading } = useCurrency()
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  useEffect(() => {
    fetchServiceDetails()
  }, [params.id])

  const fetchServiceDetails = async () => {
    try {
      // Mock service details - replace with actual API
      const serviceId = params.id as string

      const mockServices: Record<string, Service> = {
        '1': {
          id: '1',
          name: 'Premium Dog Grooming',
          category: 'GROOMING',
          description: 'Complete professional grooming service for dogs of all sizes. Our experienced groomers provide full-service care including bathing, brushing, nail trimming, ear cleaning, and styling. We use only premium, pet-safe products and ensure your furry friend feels comfortable throughout the entire process.',
          price: 75,
          duration: 120,
          provider: {
            businessName: 'Pawsome Grooming Studio',
            averageRating: 4.8,
            totalReviews: 127,
            isVerified: true,
            user: { firstName: 'Sarah', lastName: 'Johnson' },
            location: 'Downtown Pet District',
            experience: '8 years of professional pet grooming',
            specialties: ['Long-haired breeds', 'Sensitive skin care', 'Show dog preparation'],
            contact: { phone: '(555) 123-4567', email: 'sarah@pawsomestudio.com' }
          },
          features: [
            'Premium organic shampoos', 'Nail trimming and filing', 'Ear cleaning and inspection',
            'Teeth brushing', 'Full coat brushing and de-shedding', 'Sanitary trim',
            'Blow dry and styling', 'Complimentary nail polish'
          ],
          gallery: []
        },
        '2': {
          id: '2',
          name: 'Cat Grooming & Bath',
          category: 'GROOMING',
          description: 'Specialized cat grooming service including gentle bathing, brushing, nail trimming, and ear cleaning. We use cat-specific products and techniques to ensure a calm, stress-free experience for your feline friend.',
          price: 65,
          duration: 90,
          provider: {
            businessName: 'Feline Fine Grooming',
            averageRating: 4.7,
            totalReviews: 89,
            isVerified: true,
            user: { firstName: 'Maria', lastName: 'Garcia' },
            location: 'Cat Care Center',
            experience: '6 years specializing in cat grooming',
            specialties: ['Persian cats', 'Long-haired breeds', 'Senior cat care', 'Anxious cats'],
            contact: { phone: '(555) 234-5678', email: 'maria@felinefine.com' }
          },
          features: [
            'Gentle cat-safe bathing',
            'Specialized brushing and de-matting',
            'Nail trimming',
            'Ear cleaning',
            'Sanitary trim',
            'Soft paw nail caps (optional)',
            'Stress-free handling techniques',
            'Lion cut or breed-specific styling'
          ],
          gallery: []
        },
        '3': {
          id: '3',
          name: 'Veterinary Consultation',
          category: 'VETERINARY_CONSULTATION',
          description: 'Comprehensive veterinary examination for pets including physical assessment, diagnostic consultation, treatment recommendations, and preventive care advice. Perfect for wellness checks or addressing health concerns.',
          price: 95,
          duration: 45,
          provider: {
            businessName: 'Pet Health Clinic',
            averageRating: 4.9,
            totalReviews: 243,
            isVerified: true,
            user: { firstName: 'Dr. Emily', lastName: 'Chen' },
            location: 'Downtown Veterinary Center',
            experience: '12 years of veterinary medicine',
            specialties: ['Internal medicine', 'Preventive care', 'Diagnostic imaging', 'Senior pet health'],
            contact: { phone: '(555) 345-6789', email: 'dr.chen@pethealth.com' }
          },
          features: [
            'Complete physical examination',
            'Health history review',
            'Vaccination assessment',
            'Diagnostic recommendations',
            'Treatment plan development',
            'Nutritional counseling',
            'Behavioral consultation',
            'Follow-up care instructions'
          ],
          gallery: []
        },
        '4': {
          id: '4',
          name: 'Professional Dog Training',
          category: 'TRAINING',
          description: 'Personalized dog training sessions covering obedience, behavior modification, and socialization. Uses positive reinforcement techniques to build a strong, trusting relationship with your dog.',
          price: 120,
          duration: 60,
          provider: {
            businessName: 'Canine Behavior Academy',
            averageRating: 4.8,
            totalReviews: 156,
            isVerified: true,
            user: { firstName: 'Mark', lastName: 'Thompson' },
            location: 'Training Center',
            experience: '10 years of professional dog training',
            specialties: ['Obedience training', 'Behavior modification', 'Puppy training', 'Aggression management'],
            contact: { phone: '(555) 456-7890', email: 'mark@canineacademy.com' }
          },
          features: [
            'Custom training program',
            'Positive reinforcement methods',
            'Basic obedience commands',
            'Leash training',
            'Socialization techniques',
            'Problem behavior correction',
            'Owner education and coaching',
            'Progress tracking and reports'
          ],
          gallery: []
        },
        '5': {
          id: '5',
          name: 'Pet Sitting Service',
          category: 'PET_SITTING',
          description: 'Reliable in-home pet sitting for dogs, cats, and small pets. Includes feeding, playtime, medication administration, and lots of love and attention while you\'re away.',
          price: 50,
          duration: 60,
          provider: {
            businessName: 'Loving Pet Care',
            averageRating: 4.6,
            totalReviews: 78,
            isVerified: false,
            user: { firstName: 'Emma', lastName: 'Wilson' },
            location: 'Mobile Pet Services',
            experience: '5 years of pet sitting and care',
            specialties: ['Multiple pet households', 'Medication administration', 'Senior pet care', 'Special needs pets'],
            contact: { phone: '(555) 567-8901', email: 'emma@lovingpetcare.com' }
          },
          features: [
            'In-home pet care',
            'Feeding and fresh water',
            'Playtime and exercise',
            'Medication administration',
            'Litter box or potty breaks',
            'Mail and plant watering',
            'Photo updates',
            'Overnight stays available'
          ],
          gallery: []
        },
        '6': {
          id: '6',
          name: 'Dog Walking Service',
          category: 'WALKING',
          description: '30-minute neighborhood walk with exercise and socialization for your dog. Perfect for busy pet parents or dogs needing extra activity during the day.',
          price: 25,
          duration: 30,
          provider: {
            businessName: 'Active Paws',
            averageRating: 4.5,
            totalReviews: 203,
            isVerified: true,
            user: { firstName: 'Jake', lastName: 'Miller' },
            location: 'Dog Walking Services',
            experience: '7 years of professional dog walking',
            specialties: ['High-energy dogs', 'Reactive dogs', 'Senior dogs', 'Small breeds'],
            contact: { phone: '(555) 678-9012', email: 'jake@activepaws.com' }
          },
          features: [
            '30-minute neighborhood walk',
            'One-on-one attention',
            'Basic obedience reinforcement',
            'Waste cleanup included',
            'Fresh water upon return',
            'GPS tracking available',
            'Photo updates',
            'Flexible scheduling'
          ],
          gallery: []
        },
        '7': {
          id: '7',
          name: 'Cat Hotel & Boarding',
          category: 'BOARDING',
          description: 'Luxury cat boarding with private suites and play areas. Your cat will enjoy comfortable accommodations, playtime, and personalized attention in a cats-only environment.',
          price: 85,
          duration: 1440,
          provider: {
            businessName: 'Whiskers Paradise',
            averageRating: 4.7,
            totalReviews: 67,
            isVerified: true,
            user: { firstName: 'Sophie', lastName: 'Chen' },
            location: 'Cat Boarding Facility',
            experience: '8 years of cat boarding and care',
            specialties: ['Senior cats', 'Medical needs', 'Shy cats', 'Multi-cat families'],
            contact: { phone: '(555) 789-0123', email: 'sophie@whiskersparadise.com' }
          },
          features: [
            'Private luxury suites',
            'Climate-controlled environment',
            'Daily playtime sessions',
            'Premium food and treats',
            'Medication administration',
            'Daily photo updates',
            'Webcam access available',
            'Veterinary care on-call'
          ],
          gallery: []
        },
        '8': {
          id: '8',
          name: 'Puppy Training Basics',
          category: 'TRAINING',
          description: 'Essential puppy training covering socialization, potty training, basic commands, and bite inhibition. Set your puppy up for success with early positive training.',
          price: 100,
          duration: 60,
          provider: {
            businessName: 'Puppy School Plus',
            averageRating: 4.9,
            totalReviews: 134,
            isVerified: true,
            user: { firstName: 'Jessica', lastName: 'Lee' },
            location: 'Puppy Training Center',
            experience: '9 years specializing in puppy development',
            specialties: ['Early socialization', 'Potty training', 'Puppy behavior', 'First-time owners'],
            contact: { phone: '(555) 890-1234', email: 'jessica@puppyschool.com' }
          },
          features: [
            'Age-appropriate training',
            'Socialization exercises',
            'Potty training guidance',
            'Basic commands (sit, stay, come)',
            'Bite inhibition training',
            'Crate training tips',
            'Puppy play sessions',
            'Owner education materials'
          ],
          gallery: []
        },
        '9': {
          id: '9',
          name: 'Bird Care & Wellness Check',
          category: 'VETERINARY_CONSULTATION',
          description: 'Specialized avian veterinary care including physical examination, wing and nail trimming, nutritional assessment, and behavior consultation for all bird species.',
          price: 80,
          duration: 45,
          provider: {
            businessName: 'Avian Health Specialists',
            averageRating: 4.8,
            totalReviews: 56,
            isVerified: true,
            user: { firstName: 'Dr. Rachel', lastName: 'Patel' },
            location: 'Avian Veterinary Clinic',
            experience: '11 years of avian medicine',
            specialties: ['Parrots', 'Exotic birds', 'Avian nutrition', 'Feather disorders'],
            contact: { phone: '(555) 901-2345', email: 'dr.patel@avianhealth.com' }
          },
          features: [
            'Complete physical examination',
            'Wing trimming (if requested)',
            'Nail and beak trimming',
            'Weight assessment',
            'Nutritional counseling',
            'Behavioral consultation',
            'Disease screening',
            'Husbandry recommendations'
          ],
          gallery: []
        },
        '10': {
          id: '10',
          name: 'Dog Boarding & Daycare',
          category: 'BOARDING',
          description: 'Safe and comfortable boarding for weekend getaways or extended trips. Includes playtime, exercise, and socialization with other friendly dogs in a supervised environment.',
          price: 150,
          duration: 2880,
          provider: {
            businessName: 'Cozy Pet Hotel',
            averageRating: 4.4,
            totalReviews: 92,
            isVerified: true,
            user: { firstName: 'Tom', lastName: 'Anderson' },
            location: 'Pet Boarding Facility',
            experience: '13 years of pet boarding services',
            specialties: ['Large dogs', 'Special diets', 'Senior dogs', 'Extended stays'],
            contact: { phone: '(555) 012-3456', email: 'tom@cozypethotel.com' }
          },
          features: [
            'Comfortable sleeping quarters',
            'Multiple daily play sessions',
            'Supervised group play',
            'Individual attention',
            'Special diet accommodation',
            'Medication administration',
            'Daily exercise and walks',
            'Photo and video updates'
          ],
          gallery: []
        },
        '11': {
          id: '11',
          name: 'Rabbit & Small Pet Care',
          category: 'PET_SITTING',
          description: 'Specialized care for rabbits, guinea pigs, hamsters, and other small pets. Includes feeding, habitat cleaning, exercise time, and health monitoring.',
          price: 35,
          duration: 45,
          provider: {
            businessName: 'Small Paws Pet Care',
            averageRating: 4.6,
            totalReviews: 45,
            isVerified: true,
            user: { firstName: 'Lisa', lastName: 'Brown' },
            location: 'Small Animal Services',
            experience: '6 years of small pet care',
            specialties: ['Rabbits', 'Guinea pigs', 'Hamsters', 'Exotic small pets'],
            contact: { phone: '(555) 123-4567', email: 'lisa@smallpaws.com' }
          },
          features: [
            'Daily feeding and fresh water',
            'Habitat cleaning',
            'Exercise and play time',
            'Health monitoring',
            'Nail trimming',
            'Medication if needed',
            'Enrichment activities',
            'Photo updates'
          ],
          gallery: []
        },
        '12': {
          id: '12',
          name: 'Aquarium Maintenance Service',
          category: 'BOARDING',
          description: 'Weekly aquarium cleaning, water changes, and fish feeding service. Keep your aquatic pets healthy and your tank beautiful with professional maintenance.',
          price: 40,
          duration: 60,
          provider: {
            businessName: 'AquaCare Services',
            averageRating: 4.5,
            totalReviews: 134,
            isVerified: true,
            user: { firstName: 'David', lastName: 'Kumar' },
            location: 'Aquatic Services',
            experience: '10 years of aquarium maintenance',
            specialties: ['Freshwater tanks', 'Saltwater aquariums', 'Reef systems', 'Koi ponds'],
            contact: { phone: '(555) 234-5678', email: 'david@aquacare.com' }
          },
          features: [
            'Water quality testing',
            'Partial water changes',
            'Filter cleaning and maintenance',
            'Algae removal',
            'Glass cleaning',
            'Gravel vacuuming',
            'Equipment inspection',
            'Fish health assessment'
          ],
          gallery: []
        },
        '13': {
          id: '13',
          name: 'Cattle Veterinary Checkup',
          category: 'LIVESTOCK_VETERINARY',
          description: 'Comprehensive health examination for cattle including physical assessment, disease screening, health certification, and preventive care recommendations. Our experienced large animal veterinarians provide thorough evaluations to ensure your cattle maintain optimal health and productivity.',
          price: 200,
          duration: 120,
          provider: {
            businessName: 'Farm Vet Services',
            averageRating: 4.9,
            totalReviews: 145,
            isVerified: true,
            user: { firstName: 'Dr. Robert', lastName: 'Miller' },
            location: 'Rural Veterinary District',
            experience: '15 years of large animal veterinary medicine',
            specialties: ['Cattle health management', 'Disease prevention', 'Herd health programs', 'Reproduction management'],
            contact: { phone: '(555) 234-5678', email: 'dr.miller@farmvet.com' }
          },
          features: [
            'Complete physical examination',
            'Disease screening and testing',
            'Health certificate issuance',
            'Nutritional assessment',
            'Reproductive health check',
            'Parasite screening',
            'Vaccination status review',
            'Treatment recommendations'
          ],
          gallery: []
        },
        '14': {
          id: '14',
          name: 'Horse Health & Wellness Visit',
          category: 'LIVESTOCK_VETERINARY',
          description: 'Complete equine health check covering dental examination, hoof inspection, body condition scoring, and overall wellness assessment. Perfect for routine health maintenance or pre-purchase examinations.',
          price: 250,
          duration: 180,
          provider: {
            businessName: 'Equine Care Specialists',
            averageRating: 4.8,
            totalReviews: 98,
            isVerified: true,
            user: { firstName: 'Dr. Jennifer', lastName: 'Thompson' },
            location: 'Equestrian Center Area',
            experience: '12 years of equine veterinary practice',
            specialties: ['Equine dentistry', 'Lameness evaluation', 'Performance horses', 'Geriatric horse care'],
            contact: { phone: '(555) 345-6789', email: 'dr.thompson@equinecare.com' }
          },
          features: [
            'Comprehensive physical exam',
            'Dental examination and floating',
            'Hoof health assessment',
            'Body condition scoring',
            'Joint and mobility evaluation',
            'Respiratory system check',
            'Digital pulse examination',
            'Wellness recommendations'
          ],
          gallery: []
        },
        '15': {
          id: '15',
          name: 'Goat & Sheep Vaccination',
          category: 'VACCINATION',
          description: 'Standard vaccination protocol for goats and sheep including CDT (Clostridium perfringens types C & D and tetanus), deworming, and health assessment. Protects your herd from common diseases and parasites.',
          price: 80,
          duration: 60,
          provider: {
            businessName: 'Livestock Health Pro',
            averageRating: 4.7,
            totalReviews: 112,
            isVerified: true,
            user: { firstName: 'Dr. William', lastName: 'Harris' },
            location: 'Small Ruminant Services',
            experience: '10 years specializing in small ruminants',
            specialties: ['Sheep health', 'Goat diseases', 'Herd management', 'Parasite control'],
            contact: { phone: '(555) 456-7890', email: 'dr.harris@livestockhealth.com' }
          },
          features: [
            'CDT vaccination administration',
            'Comprehensive deworming protocol',
            'Health status assessment',
            'Body condition evaluation',
            'Parasite screening',
            'Vaccination record update',
            'Next vaccination scheduling',
            'Herd health consultation'
          ],
          gallery: []
        },
        '16': {
          id: '16',
          name: 'Cattle Breeding Consultation',
          category: 'BREEDING_SERVICES',
          description: 'Professional breeding guidance including genetic selection, breeding schedule planning, bull selection advice, and reproductive management strategies to improve your herd genetics and productivity.',
          price: 350,
          duration: 240,
          provider: {
            businessName: 'Premium Livestock Genetics',
            averageRating: 4.9,
            totalReviews: 76,
            isVerified: true,
            user: { firstName: 'James', lastName: 'Anderson' },
            location: 'Genetics & Breeding Center',
            experience: '20 years in livestock genetics and breeding',
            specialties: ['Cattle genetics', 'Breeding program design', 'EPD analysis', 'Crossbreeding systems'],
            contact: { phone: '(555) 567-8901', email: 'james@premiumgenetics.com' }
          },
          features: [
            'Genetic evaluation of current herd',
            'Breeding goal establishment',
            'Bull selection criteria development',
            'Breeding schedule optimization',
            'EPD (Expected Progeny Difference) analysis',
            'Crossbreeding recommendations',
            'Record keeping system setup',
            'Follow-up support included'
          ],
          gallery: []
        },
        '17': {
          id: '17',
          name: 'Artificial Insemination Service',
          category: 'ARTIFICIAL_INSEMINATION',
          description: 'Professional AI service for cattle, buffalo, and dairy animals using certified high-quality semen from superior genetics. Includes heat detection, optimal timing, and proper technique for maximum conception rates.',
          price: 150,
          duration: 90,
          provider: {
            businessName: 'Dairy Breeding Solutions',
            averageRating: 4.8,
            totalReviews: 134,
            isVerified: true,
            user: { firstName: 'Michael', lastName: 'Davis' },
            location: 'Dairy Services Region',
            experience: '18 years of AI technician experience',
            specialties: ['Cattle AI', 'Buffalo breeding', 'Heat detection', 'Reproductive efficiency'],
            contact: { phone: '(555) 678-9012', email: 'michael@dairybreeding.com' }
          },
          features: [
            'Premium certified semen',
            'Heat detection assistance',
            'Optimal timing determination',
            'Professional AI technique',
            'Post-AI care instructions',
            'Pregnancy check scheduling',
            'Breeding records maintenance',
            'Conception rate tracking'
          ],
          gallery: []
        },
        '18': {
          id: '18',
          name: 'Dairy Milk Quality Testing',
          category: 'MILK_TESTING',
          description: 'Complete milk analysis including fat content, protein levels, bacterial count, somatic cell count, and adulteration testing. Get detailed reports to ensure premium milk quality and compliance with standards.',
          price: 120,
          duration: 30,
          provider: {
            businessName: 'Dairy Lab Services',
            averageRating: 4.6,
            totalReviews: 89,
            isVerified: true,
            user: { firstName: 'Dr. Susan', lastName: 'White' },
            location: 'Dairy Quality Lab',
            experience: '14 years in dairy science and quality control',
            specialties: ['Milk composition analysis', 'Quality standards', 'Lab diagnostics', 'Food safety'],
            contact: { phone: '(555) 789-0123', email: 'dr.white@dairylab.com' }
          },
          features: [
            'Fat percentage analysis',
            'Protein content measurement',
            'Total bacterial count',
            'Somatic cell count (SCC)',
            'Adulteration testing',
            'Antibiotic residue screening',
            'Detailed quality report',
            'Recommendations for improvement'
          ],
          gallery: []
        },
        '19': {
          id: '19',
          name: 'Livestock Nutrition Consultation',
          category: 'FEED_CONSULTATION',
          description: 'Custom feed plan development for optimal animal health and productivity. Includes nutritional assessment, ration formulation, feed quality evaluation, and ongoing monitoring for best results.',
          price: 180,
          duration: 120,
          provider: {
            businessName: 'Farm Nutrition Experts',
            averageRating: 4.7,
            totalReviews: 67,
            isVerified: true,
            user: { firstName: 'Dr. Richard', lastName: 'Brown' },
            location: 'Agricultural Nutrition Center',
            experience: '16 years as livestock nutritionist',
            specialties: ['Ration formulation', 'Feed analysis', 'Metabolic disorders', 'Growth optimization'],
            contact: { phone: '(555) 890-1234', email: 'dr.brown@farmnutrition.com' }
          },
          features: [
            'Complete nutritional assessment',
            'Custom ration formulation',
            'Feed quality evaluation',
            'Cost-benefit analysis',
            'Body condition scoring',
            'Growth rate optimization',
            'Supplement recommendations',
            'Quarterly follow-up included'
          ],
          gallery: []
        },
        '20': {
          id: '20',
          name: 'Complete Farm Health Visit',
          category: 'FARM_VISIT',
          description: 'Comprehensive on-farm visit for herd health assessment, disease prevention planning, biosecurity evaluation, and overall farm management consultation. Ideal for maintaining healthy, productive livestock.',
          price: 300,
          duration: 240,
          provider: {
            businessName: 'Mobile Farm Veterinary',
            averageRating: 4.9,
            totalReviews: 156,
            isVerified: true,
            user: { firstName: 'Dr. Thomas', lastName: 'Wilson' },
            location: 'Mobile Veterinary Services',
            experience: '22 years of farm animal practice',
            specialties: ['Herd health programs', 'Disease prevention', 'Biosecurity', 'Production medicine'],
            contact: { phone: '(555) 901-2345', email: 'dr.wilson@mobilefarmvet.com' }
          },
          features: [
            'Comprehensive herd examination',
            'Disease screening and testing',
            'Biosecurity assessment',
            'Facility evaluation',
            'Vaccination program review',
            'Parasite control planning',
            'Nutrition assessment',
            'Written health report with recommendations'
          ],
          gallery: []
        },
        '21': {
          id: '21',
          name: 'Buffalo Health Management',
          category: 'LIVESTOCK_VETERINARY',
          description: 'Specialized health care for water buffalo including vaccination, disease control, reproductive health, and general wellness. Our veterinarians have extensive experience with buffalo-specific health needs.',
          price: 220,
          duration: 150,
          provider: {
            businessName: 'Buffalo Care Center',
            averageRating: 4.8,
            totalReviews: 82,
            isVerified: true,
            user: { firstName: 'Dr. Maria', lastName: 'Rodriguez' },
            location: 'Buffalo Health Specialists',
            experience: '11 years specializing in buffalo health',
            specialties: ['Buffalo diseases', 'Dairy buffalo', 'Reproduction', 'Preventive care'],
            contact: { phone: '(555) 012-3456', email: 'dr.rodriguez@buffalocare.com' }
          },
          features: [
            'Complete health examination',
            'Buffalo-specific vaccinations',
            'Reproductive health assessment',
            'Mastitis prevention and treatment',
            'Parasite control program',
            'Nutritional counseling',
            'Milk production optimization',
            'Health certificate issuance'
          ],
          gallery: []
        },
        '22': {
          id: '22',
          name: 'Camel Health & Vaccination',
          category: 'VACCINATION',
          description: 'Specialized camel health services including routine vaccines (PPR, camel pox), parasite control, and health assessment. Our veterinarians understand the unique health requirements of camels in various climates.',
          price: 280,
          duration: 120,
          provider: {
            businessName: 'Desert Animal Care',
            averageRating: 4.7,
            totalReviews: 45,
            isVerified: true,
            user: { firstName: 'Dr. Ahmed', lastName: 'Hassan' },
            location: 'Camel Health Services',
            experience: '13 years of camel veterinary medicine',
            specialties: ['Camel diseases', 'Desert livestock', 'Racing camels', 'Breeding management'],
            contact: { phone: '(555) 123-4567', email: 'dr.hassan@desertanimal.com' }
          },
          features: [
            'PPR vaccination',
            'Camel pox immunization',
            'Comprehensive parasite control',
            'Health status evaluation',
            'Skin condition assessment',
            'Foot pad examination',
            'Digestive health check',
            'Climate-specific care advice'
          ],
          gallery: []
        }
      }

      const mockService = mockServices[serviceId] || mockServices['1']
      setService(mockService)
    } catch (error) {
      console.error('Error fetching service details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBooking = () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    // Handle booking logic here
    alert('Booking functionality would be implemented here')
  }

  if (isLoading || currencyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <button
            onClick={() => router.back()}
            className="text-teal-600 hover:text-teal-800"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Services</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{service.provider.averageRating}</span>
                      <span>({service.provider.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-5 w-5" />
                      <span>{service.duration} minutes</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{formatPrice(service.price)}</div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors duration-300 mt-2">
                    <Heart className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Provider Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">About the Provider</h2>
                <button
                  onClick={() => router.push(`/provider/${service.provider.user.firstName.toLowerCase()}-${service.provider.user.lastName.toLowerCase()}`)}
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                  View Full Profile →
                </button>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.provider.user.firstName} {service.provider.user.lastName}
                    </h3>
                    {service.provider.isVerified && (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        <Shield className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{service.provider.businessName}</p>
                  <p className="text-gray-600 mb-3">{service.provider.experience}</p>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.provider.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{service.provider.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{service.provider.totalReviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Book This Service</h2>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Service Price</span>
                  <span className="font-medium">{formatPrice(service.price)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{service.duration} min</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>{formatPrice(service.price)}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 mb-4"
              >
                {session ? 'Book Now' : 'Sign In to Book'}
              </button>

              {/* Contact Provider */}
              <div className="space-y-2">
                <a
                  href={`tel:${service.provider.contact.phone}`}
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Provider</span>
                </a>
                <a
                  href={`mailto:${service.provider.contact.email}`}
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Provider</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}