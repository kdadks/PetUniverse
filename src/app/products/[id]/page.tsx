'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle,
  Info,
  Share2
} from 'lucide-react'
import { useCurrency } from '@/lib/useCurrency'

interface Product {
  id: string
  name: string
  category: string
  description: string
  brand: string
  images: string[]
  price: number
  originalPrice?: number
  stockQuantity: number
  averageRating: number
  totalReviews: number
  specifications: any
  tags: string[]
  features: string[]
  ingredients?: string
  directions?: string
  reviews: {
    rating: number
    comment: string
    reviewer: string
    date: string
  }[]
}

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { formatPrice, isLoading: currencyLoading } = useCurrency()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState('description')

  useEffect(() => {
    fetchProductDetails()
  }, [params.id])

  const fetchProductDetails = async () => {
    try {
      // Mock product details - replace with actual API
      const productId = params.id as string

      const mockProducts: Record<string, Product> = {
        '2': {
          id: '2',
          name: 'Premium Dog Food - Chicken & Rice',
          category: 'FOOD',
          description: 'High-quality dry dog food made with real chicken as the first ingredient and wholesome brown rice. This formula provides complete and balanced nutrition for adult dogs of all breeds. Formulated by veterinarians and nutritionists for optimal health.',
          brand: 'PetNutrition Pro',
          images: [
            'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80',
            'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80',
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
            'https://images.unsplash.com/photo-1558929996-da64ba858215?w=800&q=80'
          ],
          price: 45.99,
          originalPrice: 52.99,
          stockQuantity: 50,
          averageRating: 4.8,
          totalReviews: 156,
          specifications: {
            weight: '15 lbs',
            proteinContent: '26%',
            fatContent: '15%',
            fiberContent: '4%',
            moistureContent: '10%'
          },
          tags: ['premium', 'natural', 'adult-dog', 'chicken', 'wholesome'],
          features: [
            'Real chicken as first ingredient',
            'Wholesome brown rice for energy',
            'No corn, wheat, or soy',
            'Added glucosamine for joint health',
            'Omega-6 fatty acids for healthy skin',
            'Natural fiber for digestion',
            'Antioxidants for immune support',
            'Made in USA with quality ingredients'
          ],
          ingredients: 'Chicken, Chicken Meal, Brown Rice, Oatmeal, Barley, Chicken Fat (preserved with Mixed Tocopherols), Dried Beet Pulp, Natural Chicken Flavor, Flaxseed, Fish Oil, Glucosamine Hydrochloride, Chondroitin Sulfate, Vitamin E Supplement, L-Carnitine.',
          directions: 'Feed according to your dog\'s weight. Adult dogs 10-25 lbs: 1-2 cups daily. 25-50 lbs: 2-3 cups daily. 50-75 lbs: 3-4 cups daily. Divide into 2 meals. Adjust portions based on activity level.',
          reviews: [
            {
              rating: 5,
              comment: 'My dog loves this food! His coat is shinier and he has more energy.',
              reviewer: 'Jennifer K.',
              date: '2024-10-20'
            },
            {
              rating: 5,
              comment: 'Great quality ingredients. My picky eater actually finishes his meals now!',
              reviewer: 'Mark T.',
              date: '2024-10-15'
            },
            {
              rating: 4,
              comment: 'Good food, reasonable price. Dog is doing well on it.',
              reviewer: 'Lisa M.',
              date: '2024-10-10'
            }
          ]
        },
        '3': {
          id: '3',
          name: 'Tropical Fish Flakes - Premium Blend',
          category: 'FOOD',
          description: 'Nutritious tropical fish flakes formulated with enhanced colors and essential vitamins for healthy, vibrant fish. This premium blend contains spirulina, krill, and natural color enhancers to bring out the best in your tropical fish.',
          brand: 'AquaNutrition',
          images: [
            'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80',
            'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80',
            'https://images.unsplash.com/photo-1520990269312-a0d71b6f6e79?w=800&q=80'
          ],
          price: 16.99,
          stockQuantity: 85,
          averageRating: 4.6,
          totalReviews: 127,
          specifications: {
            weight: '2.2 oz',
            type: 'Floating flakes',
            proteinContent: '48%',
            fatContent: '8%',
            fiberContent: '2%'
          },
          tags: ['tropical', 'colorful', 'vitamins', 'flakes', 'aquarium'],
          features: [
            'Enhanced color formula with spirulina',
            'Vitamin-enriched for immune health',
            'Floating flakes stay fresh longer',
            'Won\'t cloud aquarium water',
            'Contains natural krill for protein',
            'Promotes vibrant fish coloration',
            'Easy to digest formula',
            'Suitable for all tropical fish'
          ],
          ingredients: 'Fish Meal, Spirulina, Krill Meal, Wheat Flour, Soybean Meal, Lecithin, Vitamins (A, D3, E, B1, B2, B6, B12), Minerals, Natural Color Enhancers.',
          directions: 'Feed 2-3 times daily, only what fish can consume in 2-3 minutes. Remove uneaten food. For best results, vary diet with frozen or live foods.',
          reviews: [
            {
              rating: 5,
              comment: 'My fish colors have never looked better! They love these flakes.',
              reviewer: 'David L.',
              date: '2024-09-25'
            },
            {
              rating: 4,
              comment: 'Good quality food, fish are healthy and active.',
              reviewer: 'Amanda R.',
              date: '2024-09-18'
            }
          ]
        },
        '1': {
          id: '1',
          name: 'Premium Cat Food - Tuna & Salmon',
          category: 'FOOD',
          description: 'This premium grain-free wet cat food is made with real tuna and salmon, providing your feline friend with the protein they need for optimal health. Rich in omega-3 fatty acids, this formula supports healthy skin and coat while delivering exceptional taste that cats love.',
          brand: 'FelineChoice',
          images: [
            'https://images.unsplash.com/photo-1589662804145-dd62f31e7c1f?w=800&q=80',
            'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=800&q=80',
            'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&q=80',
            'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80'
          ],
          price: 28.99,
          originalPrice: 34.99,
          stockQuantity: 65,
          averageRating: 4.9,
          totalReviews: 234,
          specifications: {
            weight: '12 cans (3 oz each)',
            ingredients: 'Tuna, Salmon, Peas, Carrots',
            proteinContent: '12%',
            fatContent: '3%',
            moistureContent: '78%'
          },
          tags: ['grain-free', 'wet-food', 'protein-rich', 'omega-3'],
          features: [
            'Real tuna and salmon as first ingredients',
            'Grain-free formula for sensitive stomachs',
            'Rich in omega-3 fatty acids',
            'No artificial colors or preservatives',
            'Supports healthy skin and coat',
            'High moisture content for hydration',
            'Perfect for adult cats',
            'Made in USA'
          ],
          ingredients: 'Tuna, Salmon, Fish Broth, Peas, Carrots, Natural Flavors, Guar Gum, Potassium Chloride, Salt, Choline Chloride, Taurine, Zinc Proteinate, Iron Proteinate, Vitamin E Supplement, Thiamine Mononitrate, Copper Proteinate, Manganese Proteinate, Sodium Selenite, Niacin Supplement, d-Calcium Pantothenate, Pyridoxine Hydrochloride, Riboflavin Supplement, Vitamin A Supplement, Biotin, Potassium Iodide, Vitamin D3 Supplement, Vitamin B12 Supplement, Folic Acid.',
          directions: 'Feed according to your cat\'s weight and activity level. For adult cats, feed 1 can per 6-8 lbs of body weight daily. Divide into 2 meals. Refrigerate unused portion and use within 3 days.',
          reviews: [
            {
              rating: 5,
              comment: 'My cat absolutely loves this food! Great quality and he has more energy.',
              reviewer: 'Sarah J.',
              date: '2024-01-15'
            },
            {
              rating: 5,
              comment: 'Excellent ingredients, no fillers. Worth the price for premium quality.',
              reviewer: 'Mike R.',
              date: '2024-01-10'
            }
          ]
        },
        '13': {
          id: '13',
          name: 'Aquarium Water Test Kit - Complete',
          category: 'GROOMING_SUPPLIES',
          description: 'Complete water testing kit for pH, ammonia, nitrite, and nitrate levels. Essential for maintaining a healthy aquarium environment. Includes 150 tests with easy-to-read color charts. Accurate results in minutes for both freshwater and saltwater tanks.',
          brand: 'AquaTest',
          images: [
            'https://images.unsplash.com/photo-1520990269312-a0d71b6f6e79?w=800&q=80',
            'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80',
            'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80'
          ],
          price: 32.99,
          stockQuantity: 35,
          averageRating: 4.7,
          totalReviews: 143,
          specifications: {
            tests: '150 total tests',
            parameters: '4 (pH, ammonia, nitrite, nitrate)',
            suitable: 'Freshwater & Saltwater',
            expiration: '2 years from manufacture'
          },
          tags: ['water-test', 'aquarium', 'health', 'pH', 'ammonia'],
          features: [
            'Tests 4 critical water parameters',
            '150 total tests included',
            'Easy-to-read color charts',
            'Accurate results in 5 minutes',
            'Suitable for all aquariums',
            'Includes detailed instruction booklet',
            'Essential for fish health',
            'Professional-grade accuracy'
          ],
          directions: 'Follow instructions for each test parameter. Use clean test tubes. Compare results to color chart in good lighting. Test weekly or when adding new fish. Store in cool, dry place.',
          reviews: [
            {
              rating: 5,
              comment: 'Essential for any aquarium owner. Very accurate results.',
              reviewer: 'Greg M.',
              date: '2024-10-21'
            },
            {
              rating: 5,
              comment: 'Easy to use and reliable. Helps keep my tank healthy.',
              reviewer: 'Maria G.',
              date: '2024-10-14'
            }
          ]
        },
        '15': {
          id: '15',
          name: 'Cat Calming Supplement - Natural Formula',
          category: 'HEALTH_SUPPLEMENTS',
          description: 'Natural calming supplement with L-theanine and chamomile for anxious cats. Veterinarian-formulated soft chews help reduce stress during travel, vet visits, or environmental changes. Made with natural ingredients, no artificial additives.',
          brand: 'CalmCat',
          images: [
            'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80',
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
            'https://images.unsplash.com/photo-1573865526739-10c1dd4e1f43?w=800&q=80'
          ],
          price: 26.99,
          stockQuantity: 45,
          averageRating: 4.4,
          totalReviews: 112,
          specifications: {
            pills: '30 soft chews',
            type: 'Soft chewable treats',
            activeIngredients: 'L-theanine, Chamomile, Passion Flower',
            suitable: 'Cats over 12 weeks'
          },
          tags: ['calming', 'natural', 'anxiety', 'stress-relief', 'vet-formulated'],
          features: [
            'Veterinarian-formulated blend',
            'Natural L-theanine and chamomile',
            'Helps reduce anxiety and stress',
            'Great for travel and vet visits',
            'Soft chew format cats love',
            'No artificial colors or flavors',
            'Made in USA with quality ingredients',
            'Safe for daily use'
          ],
          directions: 'Give 1-2 soft chews 30 minutes before stressful event. Can be given daily for ongoing support. Consult vet before use if cat is on medication. Store in cool, dry place.',
          reviews: [
            {
              rating: 5,
              comment: 'Really helps my anxious cat during thunderstorms!',
              reviewer: 'Beth K.',
              date: '2024-10-17'
            },
            {
              rating: 4,
              comment: 'My cat actually eats these willingly. Noticeable calming effect.',
              reviewer: 'Paul D.',
              date: '2024-10-09'
            }
          ]
        },
        '16': {
          id: '16',
          name: 'Fish Tank Filter - Bio-Media System',
          category: 'ACCESSORIES',
          description: 'High-efficiency aquarium filter for tanks up to 50 gallons with bio-media. Features multi-stage filtration including mechanical, chemical, and biological. Quiet operation and adjustable flow rate for optimal water circulation.',
          brand: 'ClearWater',
          images: [
            'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80',
            'https://images.unsplash.com/photo-1520990269312-a0d71b6f6e79?w=800&q=80',
            'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80'
          ],
          price: 54.99,
          stockQuantity: 25,
          averageRating: 4.8,
          totalReviews: 87,
          specifications: {
            capacity: 'Up to 50 gallons',
            flow: '200 GPH (gallons per hour)',
            stages: '3-stage filtration',
            power: '15W'
          },
          tags: ['filter', 'bio-media', 'efficient', 'aquarium', 'quiet'],
          features: [
            'Multi-stage filtration system',
            'Includes bio-media for beneficial bacteria',
            'Adjustable flow rate',
            'Quiet operation (whisper quiet)',
            'Easy cartridge replacement',
            'Suitable for fresh and saltwater',
            'Energy efficient 15W motor',
            'Crystal clear water results'
          ],
          directions: 'Install according to tank size guidelines. Prime filter before first use. Replace cartridge monthly. Clean bio-media every 2-3 months. Adjust flow as needed for fish comfort.',
          reviews: [
            {
              rating: 5,
              comment: 'Best filter I\'ve owned! Water is crystal clear.',
              reviewer: 'Tom S.',
              date: '2024-10-19'
            },
            {
              rating: 5,
              comment: 'Very quiet and effective. Easy to maintain.',
              reviewer: 'Lisa W.',
              date: '2024-10-11'
            }
          ]
        },
        '17': {
          id: '17',
          name: 'Cat Safety Collar with Bell',
          category: 'ACCESSORIES',
          description: 'Breakaway safety collar with bell and ID tag holder. Adjustable and comfortable for cats of all sizes. Features quick-release breakaway buckle for safety if collar gets caught. Includes bell to alert wildlife.',
          brand: 'SafePaws',
          images: [
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
            'https://images.unsplash.com/photo-1573865526739-10c1dd4e1f43?w=800&q=80',
            'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80'
          ],
          price: 8.99,
          stockQuantity: 150,
          averageRating: 4.3,
          totalReviews: 267,
          specifications: {
            material: 'Durable nylon webbing',
            breakaway: 'Yes - safety buckle',
            adjustable: '8-12 inches',
            includes: 'Bell and D-ring for ID tag'
          },
          tags: ['safety', 'breakaway', 'bell', 'adjustable', 'collar'],
          features: [
            'Breakaway safety buckle',
            'Adjustable 8-12 inch fit',
            'Durable nylon construction',
            'Includes jingle bell',
            'D-ring for ID tag attachment',
            'Comfortable for all-day wear',
            'Machine washable',
            'Available in multiple colors'
          ],
          directions: 'Adjust to fit snugly with room for 2 fingers underneath. Check fit regularly as cat grows. Replace if frayed or damaged. Attach ID tag to D-ring.',
          reviews: [
            {
              rating: 5,
              comment: 'Perfect collar! Breakaway feature gives me peace of mind.',
              reviewer: 'Helen T.',
              date: '2024-10-26'
            },
            {
              rating: 4,
              comment: 'Good quality for the price. Bell alerts birds nicely.',
              reviewer: 'Jeff M.',
              date: '2024-10-20'
            }
          ]
        },
        '18': {
          id: '18',
          name: 'Joint Health Supplement for Dogs',
          category: 'HEALTH_SUPPLEMENTS',
          description: 'Glucosamine and chondroitin supplement for joint health and mobility support. Veterinarian-recommended formula helps maintain healthy cartilage and reduce joint discomfort. Perfect for senior dogs or active breeds prone to joint issues.',
          brand: 'VetHealth',
          images: [
            'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80',
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
            'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80'
          ],
          price: 34.99,
          stockQuantity: 60,
          averageRating: 4.4,
          totalReviews: 98,
          specifications: {
            pills: '60 chewable tablets',
            type: 'Chicken-flavored chews',
            activeIngredients: 'Glucosamine, Chondroitin, MSM',
            suitable: 'Dogs 25+ lbs'
          },
          tags: ['joint-health', 'glucosamine', 'senior-dogs', 'mobility', 'vet-recommended'],
          features: [
            'Veterinarian-recommended formula',
            'Glucosamine & chondroitin blend',
            'Includes MSM for added support',
            'Helps maintain healthy cartilage',
            'Reduces joint discomfort',
            'Improves mobility and flexibility',
            'Chicken-flavored chewable tablets',
            'Made in USA with quality ingredients'
          ],
          directions: 'Dogs 25-50 lbs: 1 tablet daily. Dogs 50-100 lbs: 2 tablets daily. Dogs over 100 lbs: 3 tablets daily. Can be given with or without food. Allow 4-6 weeks for full benefits.',
          reviews: [
            {
              rating: 5,
              comment: 'My senior dog is moving much better! Highly recommend.',
              reviewer: 'Carol J.',
              date: '2024-10-24'
            },
            {
              rating: 4,
              comment: 'Good supplement. Dog eats them easily, seems to help.',
              reviewer: 'Richard P.',
              date: '2024-10-16'
            }
          ]
        },
        '19': {
          id: '19',
          name: 'Premium Cattle Feed - 50 lbs',
          category: 'CATTLE_FEED',
          description: 'High-quality complete cattle feed formulated for optimal growth, milk production, and overall health. Contains balanced protein, energy, vitamins, and minerals specifically designed for dairy and beef cattle. Made with premium grains and fortified with essential nutrients.',
          brand: 'FarmGold',
          images: [
            'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
            'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
            'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=800&q=80'
          ],
          price: 45.99,
          originalPrice: 52.99,
          stockQuantity: 145,
          averageRating: 4.8,
          totalReviews: 187,
          specifications: {
            weight: '50 lbs',
            proteinContent: '16%',
            fatContent: '4%',
            fiberContent: '12%',
            calciumContent: '1.2%',
            phosphorusContent: '0.8%'
          },
          tags: ['cattle', 'complete-nutrition', 'dairy', 'beef', 'fortified'],
          features: [
            'Balanced protein for muscle development',
            'Energy-dense formula for production',
            'Fortified with vitamins A, D, and E',
            'Optimal calcium-phosphorus ratio',
            'Supports healthy rumen function',
            'No artificial hormones or antibiotics',
            'Suitable for dairy and beef cattle',
            'Made in USA'
          ],
          ingredients: 'Corn, Soybean Meal, Wheat Middlings, Molasses, Calcium Carbonate, Dicalcium Phosphate, Salt, Vitamin A Supplement, Vitamin D3 Supplement, Vitamin E Supplement, Copper Sulfate, Zinc Oxide, Manganous Oxide, Sodium Selenite, Cobalt Carbonate, Potassium Iodide.',
          directions: 'Feed 5-10 lbs per head per day depending on animal weight, age, and production level. Provide free access to clean fresh water at all times. Introduce gradually over 7-10 days when changing feed.',
          reviews: [
            {
              rating: 5,
              comment: 'Best feed we\'ve used! Our cows are healthier and milk production has increased.',
              reviewer: 'John M.',
              date: '2024-09-15'
            },
            {
              rating: 5,
              comment: 'Excellent quality feed. Our cattle love it and we\'ve seen great results.',
              reviewer: 'David R.',
              date: '2024-09-10'
            }
          ]
        },
        '4': {
          id: '4',
          name: 'Interactive Cat Feather Wand',
          category: 'TOYS',
          description: 'Extendable feather wand toy that drives cats wild with natural hunting instincts. Features premium natural feathers, durable construction, and an extendable wand for interactive play. Perfect for bonding with your cat and providing essential exercise.',
          brand: 'CatPlay',
          images: [
            'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&q=80',
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
            'https://images.unsplash.com/photo-1573865526739-10c1dd4e1f43?w=800&q=80'
          ],
          price: 14.99,
          stockQuantity: 120,
          averageRating: 4.8,
          totalReviews: 189,
          specifications: {
            length: '36 inches extended',
            material: 'Natural feathers, flexible wire',
            weight: '2 oz',
            colors: 'Assorted natural'
          },
          tags: ['interactive', 'feathers', 'exercise', 'play', 'hunting'],
          features: [
            'Extendable up to 36 inches',
            'Premium natural feathers',
            'Durable flexible wire construction',
            'Stimulates natural hunting instincts',
            'Great for exercise and bonding',
            'Lightweight and easy to use',
            'Replacement feathers available',
            'Suitable for cats of all ages'
          ],
          directions: 'Supervise play sessions. Move wand in unpredictable patterns to mimic prey. Store away from cats when not in use. Replace worn feathers as needed.',
          reviews: [
            {
              rating: 5,
              comment: 'My cat goes absolutely crazy for this! Best toy we\'ve ever bought.',
              reviewer: 'Emily S.',
              date: '2024-10-28'
            },
            {
              rating: 5,
              comment: 'Great quality, the feathers last a long time. My cats play with it every day.',
              reviewer: 'Tom H.',
              date: '2024-10-22'
            }
          ]
        },
        '6': {
          id: '6',
          name: 'Interactive Puzzle Ball for Dogs',
          category: 'TOYS',
          description: 'Mental stimulation toy that keeps dogs engaged and entertained for hours. This puzzle ball dispenses treats as your dog plays, encouraging problem-solving and reducing boredom. Adjustable difficulty levels make it perfect for dogs of all intelligence levels.',
          brand: 'SmartPaws',
          images: [
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
            'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80',
            'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80'
          ],
          price: 19.99,
          stockQuantity: 75,
          averageRating: 4.6,
          totalReviews: 89,
          specifications: {
            material: 'Non-toxic BPA-free plastic',
            size: 'Medium (4 inches diameter)',
            weight: '8 oz',
            capacity: 'Up to 1 cup of treats'
          },
          tags: ['interactive', 'puzzle', 'mental-stimulation', 'treat-dispenser'],
          features: [
            'Adjustable difficulty settings',
            'Non-toxic BPA-free materials',
            'Holds up to 1 cup of treats',
            'Easy to clean and refill',
            'Reduces destructive behavior',
            'Slows down fast eaters',
            'Durable construction',
            'Suitable for medium to large dogs'
          ],
          directions: 'Fill with your dog\'s favorite treats or kibble. Adjust difficulty level as needed. Supervise initial play sessions. Clean regularly with warm soapy water.',
          reviews: [
            {
              rating: 5,
              comment: 'Keeps my dog busy for hours! Great for mental stimulation.',
              reviewer: 'Rachel P.',
              date: '2024-10-15'
            },
            {
              rating: 4,
              comment: 'Good quality toy. My dog loves the challenge.',
              reviewer: 'Kevin M.',
              date: '2024-10-08'
            }
          ]
        },
        '7': {
          id: '7',
          name: 'Luxury Memory Foam Cat Bed',
          category: 'BEDDING',
          description: 'Ultra-soft and comfortable memory foam bed perfect for cats who love to sleep in style. This premium bed features orthopedic memory foam that conforms to your cat\'s body, providing superior support and comfort. The removable, machine-washable cover makes cleaning a breeze.',
          brand: 'ComfyPaws',
          images: [
            'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&q=80',
            'https://images.unsplash.com/photo-1569866593264-60fa153ab53e?w=800&q=80',
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80'
          ],
          price: 68.99,
          stockQuantity: 25,
          averageRating: 4.9,
          totalReviews: 203,
          specifications: {
            material: 'Memory foam, microfiber cover',
            size: 'Large (24" x 18" x 4")',
            weight: '3 lbs',
            washable: 'Yes - machine washable cover'
          },
          tags: ['luxury', 'comfortable', 'washable', 'orthopedic', 'memory-foam'],
          features: [
            'Premium memory foam construction',
            'Orthopedic support for joints',
            'Removable machine-washable cover',
            'Non-slip bottom',
            'Hypoallergenic materials',
            'Perfect for senior cats',
            'Retains shape after washing',
            'Available in multiple colors'
          ],
          directions: 'Place in your cat\'s favorite sleeping area. Remove and wash cover as needed. Air out foam periodically. Not suitable for outdoor use.',
          reviews: [
            {
              rating: 5,
              comment: 'My senior cat loves this bed! She sleeps in it every night.',
              reviewer: 'Patricia W.',
              date: '2024-10-25'
            },
            {
              rating: 5,
              comment: 'Best cat bed we\'ve ever purchased. Quality is outstanding.',
              reviewer: 'James L.',
              date: '2024-10-18'
            }
          ]
        },
        '20': {
          id: '20',
          name: 'Premium Horse Grain Mix - 40 lbs',
          category: 'LIVESTOCK_FEED',
          description: 'Specially formulated complete grain mix for horses of all ages and activity levels. Provides balanced nutrition with quality proteins, essential vitamins, and minerals. Perfect for performance horses, pleasure riding, and general maintenance.',
          brand: 'EquineElite',
          images: [
            'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
            'https://images.unsplash.com/photo-1551817958-11e0f7bbea4a?w=800&q=80',
            'https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?w=800&q=80',
            'https://images.unsplash.com/photo-1534960282920-bb5783c7f090?w=800&q=80'
          ],
          price: 38.99,
          stockQuantity: 98,
          averageRating: 4.9,
          totalReviews: 156,
          specifications: {
            weight: '40 lbs',
            proteinContent: '14%',
            fatContent: '6%',
            fiberContent: '15%',
            calciumContent: '1.0%',
            phosphorusContent: '0.7%'
          },
          tags: ['horse', 'grain-mix', 'performance', 'complete-nutrition'],
          features: [
            'Balanced nutrition for all horses',
            'Enhanced with omega-3 fatty acids',
            'Supports hoof and coat health',
            'Highly digestible ingredients',
            'No added sugars or molasses',
            'Fortified with vitamins and minerals',
            'Promotes muscle development',
            'Low dust formula'
          ],
          ingredients: 'Oats, Barley, Corn, Soybean Meal, Wheat Bran, Flaxseed, Dicalcium Phosphate, Calcium Carbonate, Salt, Vitamin E Supplement, Selenium Yeast, Biotin, Zinc Proteinate, Copper Proteinate, Manganese Proteinate.',
          directions: 'Feed 5-12 lbs per day based on horse weight and activity level. Split into 2-3 feedings. Always provide quality hay and fresh water. Adjust amount based on body condition.',
          reviews: [
            {
              rating: 5,
              comment: 'My horse looks amazing! Great coat condition and lots of energy.',
              reviewer: 'Jennifer T.',
              date: '2024-08-20'
            }
          ]
        },
        '21': {
          id: '21',
          name: 'Complete Goat Feed - 25 lbs',
          category: 'LIVESTOCK_FEED',
          description: 'Nutritionally balanced complete feed for meat and dairy goats. Formulated to support growth, milk production, and overall health. Contains essential minerals and vitamins specific to goat nutritional needs.',
          brand: 'CaprineCare',
          images: [
            'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80',
            'https://images.unsplash.com/photo-1550852382-d86c3fb05c88?w=800&q=80',
            'https://images.unsplash.com/photo-1567137137831-4f2b87f11efd?w=800&q=80'
          ],
          price: 29.99,
          stockQuantity: 112,
          averageRating: 4.7,
          totalReviews: 94,
          specifications: {
            weight: '25 lbs',
            proteinContent: '16%',
            fatContent: '3.5%',
            fiberContent: '14%',
            copperContent: '35 ppm'
          },
          tags: ['goat', 'dairy', 'meat', 'complete-feed'],
          features: [
            'Formulated specifically for goats',
            'Higher copper content for goat health',
            'Supports milk production',
            'Promotes healthy growth',
            'Contains Ammonium Chloride for urinary health',
            'No urea or animal by-products',
            'Pelleted for reduced waste',
            'Suitable for all ages'
          ],
          ingredients: 'Ground Corn, Soybean Meal, Wheat Middlings, Alfalfa Meal, Molasses, Ammonium Chloride, Calcium Carbonate, Salt, Copper Sulfate, Vitamin A, Vitamin D3, Vitamin E.',
          directions: 'Feed 1-3 lbs per head daily depending on size and production. Provide quality hay ad libitum. Always ensure access to clean fresh water and loose minerals.',
          reviews: [
            {
              rating: 5,
              comment: 'Our goats love this feed! Milk production is excellent.',
              reviewer: 'Maria G.',
              date: '2024-09-05'
            }
          ]
        },
        '12': {
          id: '12',
          name: 'Professional Cat Grooming Brush',
          category: 'GROOMING_SUPPLIES',
          description: 'Self-cleaning slicker brush perfect for removing loose fur, preventing matting, and maintaining a healthy coat. Features retractable pins for easy cleaning and an ergonomic handle for comfortable grooming sessions. Suitable for cats with medium to long hair.',
          brand: 'FelineGroom',
          images: [
            'https://images.unsplash.com/photo-1589662804145-dd62f31e7c1f?w=800&q=80',
            'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80'
          ],
          price: 24.99,
          stockQuantity: 55,
          averageRating: 4.6,
          totalReviews: 178,
          specifications: {
            material: 'Stainless steel pins, ABS plastic handle',
            size: 'Medium (5" x 3")',
            pinType: 'Fine bent wire',
            weight: '4 oz'
          },
          tags: ['self-cleaning', 'slicker', 'anti-mat', 'grooming', 'professional'],
          features: [
            'Self-cleaning retractable pins',
            'Gentle on sensitive skin',
            'Removes loose undercoat effectively',
            'Prevents matting and tangles',
            'Ergonomic non-slip handle',
            'Stainless steel pins won\'t rust',
            'Reduces shedding up to 95%',
            'Suitable for daily use'
          ],
          directions: 'Brush in the direction of hair growth with gentle strokes. Use 2-3 times per week for maintenance. Press button to retract pins and remove collected fur. Clean pins regularly.',
          reviews: [
            {
              rating: 5,
              comment: 'Best brush I\'ve ever used! My cat actually enjoys being brushed now.',
              reviewer: 'Michelle D.',
              date: '2024-10-20'
            },
            {
              rating: 5,
              comment: 'Self-cleaning feature is amazing. Removes so much loose fur!',
              reviewer: 'Robert K.',
              date: '2024-10-12'
            }
          ]
        },
        '14': {
          id: '14',
          name: 'Professional Pet Grooming Kit - 8 Pieces',
          category: 'GROOMING_SUPPLIES',
          description: 'Complete professional grooming kit with everything you need for at-home pet grooming. Includes nail clippers, scissors, combs, brushes, and more. High-quality stainless steel tools designed for both dogs and cats. Perfect for beginners and experienced groomers alike.',
          brand: 'GroomPro',
          images: [
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
            'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80'
          ],
          price: 89.99,
          stockQuantity: 30,
          averageRating: 4.5,
          totalReviews: 124,
          specifications: {
            items: '8 professional tools',
            material: 'Stainless steel, rubber grips',
            includes: 'Clippers, scissors, brushes, comb',
            case: 'Premium storage case included'
          },
          tags: ['professional', 'complete-kit', 'durable', 'stainless-steel'],
          features: [
            'Professional-grade stainless steel tools',
            'Nail clippers with safety guard',
            'Grooming scissors with rounded tips',
            'Slicker brush for detangling',
            'Metal comb for finishing',
            'Premium storage case included',
            'Ergonomic rubber grip handles',
            'Suitable for all breeds and sizes'
          ],
          directions: 'Use appropriate tool for each grooming task. Clean and dry tools after each use. Store in provided case. Refer to included guide for best practices.',
          reviews: [
            {
              rating: 5,
              comment: 'Excellent quality kit! Saves so much money on professional grooming.',
              reviewer: 'Sandra M.',
              date: '2024-10-15'
            },
            {
              rating: 4,
              comment: 'Good value for the price. Tools are well-made and durable.',
              reviewer: 'Brian W.',
              date: '2024-10-05'
            }
          ]
        },
        '5': {
          id: '5',
          name: 'Aquarium Treasure Chest Decoration',
          category: 'TOYS',
          description: 'Realistic treasure chest that opens and closes, perfect for fish tank decoration. This handcrafted resin decoration adds a touch of adventure to your aquarium while providing hiding spots for fish. Safe for both freshwater and saltwater aquariums.',
          brand: 'AquaDecor',
          images: [
            'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80',
            'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80',
            'https://images.unsplash.com/photo-1520990269312-a0d71b6f6e79?w=800&q=80'
          ],
          price: 22.99,
          stockQuantity: 45,
          averageRating: 4.5,
          totalReviews: 78,
          specifications: {
            size: '4 inches (L x W x H)',
            material: 'Non-toxic resin',
            weight: '6 oz',
            waterType: 'Freshwater & Saltwater safe'
          },
          tags: ['decoration', 'aquarium', 'treasure', 'hiding-spot', 'resin'],
          features: [
            'Realistic treasure chest design',
            'Opens and closes for interactive play',
            'Safe non-toxic resin material',
            'Provides hiding spots for fish',
            'Won\'t affect water parameters',
            'Easy to clean and maintain',
            'Suitable for all aquarium sizes',
            'Adds visual interest to tank'
          ],
          directions: 'Rinse thoroughly before placing in aquarium. Secure on substrate or attach to background. Clean during regular tank maintenance with aquarium-safe brush.',
          reviews: [
            {
              rating: 5,
              comment: 'My fish love hiding in this! Looks amazing in my tank.',
              reviewer: 'Alex T.',
              date: '2024-10-18'
            },
            {
              rating: 4,
              comment: 'Good quality decoration. Opening mechanism works well.',
              reviewer: 'Jessica M.',
              date: '2024-10-10'
            }
          ]
        },
        '8': {
          id: '8',
          name: 'Cozy Cat Cave Bed',
          category: 'BEDDING',
          description: 'Cozy enclosed cat bed that provides security and warmth for anxious cats. Made from premium felt wool, this cave-style bed offers a private retreat where cats feel safe and comfortable. Perfect for cats who love to burrow and hide.',
          brand: 'HideawayPets',
          images: [
            'https://images.unsplash.com/photo-1569866593264-60fa153ab53e?w=800&q=80',
            'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&q=80',
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80'
          ],
          price: 39.99,
          stockQuantity: 40,
          averageRating: 4.7,
          totalReviews: 156,
          specifications: {
            material: 'Premium felt wool',
            size: 'Medium (16" diameter, 12" height)',
            weight: '2 lbs',
            washable: 'Yes - hand wash or gentle cycle'
          },
          tags: ['cave', 'security', 'warm', 'felt', 'enclosed'],
          features: [
            'Premium felt wool construction',
            'Enclosed cave design for security',
            'Naturally temperature regulating',
            'Perfect for anxious cats',
            'Soft cushioned bottom',
            'Collapsible for easy storage',
            'Eco-friendly materials',
            'Available in multiple colors'
          ],
          directions: 'Place in quiet area away from high traffic. Gently wash when needed and air dry flat. Do not use harsh chemicals. Reshape if compressed during shipping.',
          reviews: [
            {
              rating: 5,
              comment: 'My shy cat loves this cave! She sleeps in it all the time.',
              reviewer: 'Laura S.',
              date: '2024-10-25'
            },
            {
              rating: 5,
              comment: 'Beautiful quality and my cat approved immediately!',
              reviewer: 'Chris B.',
              date: '2024-10-19'
            }
          ]
        },
        '9': {
          id: '9',
          name: 'Freeze-Dried Tuna Cat Treats',
          category: 'TREATS',
          description: 'Pure freeze-dried tuna treats with no additives, perfect for training rewards or healthy snacks. Made with 100% wild-caught tuna, these single-ingredient treats are ideal for cats with food sensitivities. High in protein and irresistible to even the pickiest cats.',
          brand: 'PureTreats',
          images: [
            'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=800&q=80',
            'https://images.unsplash.com/photo-1589662804145-dd62f31e7c1f?w=800&q=80',
            'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80'
          ],
          price: 18.99,
          stockQuantity: 90,
          averageRating: 4.8,
          totalReviews: 145,
          specifications: {
            weight: '1.5 oz',
            ingredients: '100% Wild-Caught Tuna',
            proteinContent: '80%',
            process: 'Freeze-dried'
          },
          tags: ['freeze-dried', 'pure', 'training', 'single-ingredient', 'tuna'],
          features: [
            '100% wild-caught tuna',
            'Single ingredient - no additives',
            'Freeze-dried to preserve nutrients',
            'High protein content (80%)',
            'Perfect for training rewards',
            'Grain-free and gluten-free',
            'Suitable for sensitive stomachs',
            'Resealable bag for freshness'
          ],
          directions: 'Feed as treats between meals. Recommended: 3-5 treats per day for average adult cat. Can be crumbled over food. Always provide fresh water. Store in cool, dry place.',
          reviews: [
            {
              rating: 5,
              comment: 'My cat goes crazy for these! Great for training.',
              reviewer: 'Nancy P.',
              date: '2024-10-23'
            },
            {
              rating: 5,
              comment: 'Pure ingredients, no junk. My picky cat loves them.',
              reviewer: 'Daniel R.',
              date: '2024-10-16'
            }
          ]
        },
        '10': {
          id: '10',
          name: 'Freeze-Dried Bloodworm Fish Treats',
          category: 'TREATS',
          description: 'Freeze-dried bloodworms, perfect high-protein treat for tropical fish. These premium bloodworms are a natural source of protein and essential nutrients. Ideal for bettas, goldfish, and other tropical species. Promotes vibrant colors and healthy growth.',
          brand: 'AquaTreats',
          images: [
            'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80',
            'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80',
            'https://images.unsplash.com/photo-1520990269312-a0d71b6f6e79?w=800&q=80'
          ],
          price: 12.99,
          stockQuantity: 70,
          averageRating: 4.5,
          totalReviews: 92,
          specifications: {
            weight: '0.7 oz',
            type: 'Freeze-dried bloodworms',
            proteinContent: '60%',
            suitable: 'All tropical fish'
          },
          tags: ['bloodworms', 'protein', 'tropical', 'freeze-dried', 'treats'],
          features: [
            'Premium freeze-dried bloodworms',
            'High protein content (60%)',
            'Rich in vitamins and minerals',
            'Promotes color enhancement',
            'Easily digestible',
            'No refrigeration needed',
            'Long shelf life when stored properly',
            'Perfect for conditioning breeding fish'
          ],
          directions: 'Feed 2-3 times weekly as a supplement to regular diet. Soak in tank water for 1 minute before feeding. Feed only what fish can consume in 3 minutes. Store in airtight container.',
          reviews: [
            {
              rating: 5,
              comment: 'My betta fish love these! Great quality bloodworms.',
              reviewer: 'Mike H.',
              date: '2024-10-14'
            },
            {
              rating: 4,
              comment: 'Good treat for variety. Fish go crazy for them.',
              reviewer: 'Amy L.',
              date: '2024-10-08'
            }
          ]
        },
        '11': {
          id: '11',
          name: 'Natural Salmon Dog Treats - Grain Free',
          category: 'TREATS',
          description: 'All-natural freeze-dried salmon treats packed with omega-3 fatty acids for healthy skin and coat. Made with 100% wild-caught salmon with no additives or preservatives. Perfect as a training reward or healthy snack for dogs of all sizes.',
          brand: 'NatureTreats',
          images: [
            'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&q=80',
            'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80',
            'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80'
          ],
          price: 12.99,
          stockQuantity: 100,
          averageRating: 4.7,
          totalReviews: 67,
          specifications: {
            weight: '8 oz',
            ingredients: '100% Wild-Caught Salmon',
            proteinContent: '75%',
            process: 'Freeze-dried'
          },
          tags: ['natural', 'salmon', 'healthy', 'grain-free', 'omega-3'],
          features: [
            '100% wild-caught salmon',
            'Grain-free and gluten-free',
            'Rich in omega-3 fatty acids',
            'No artificial preservatives',
            'Freeze-dried to lock in nutrients',
            'Supports healthy skin and coat',
            'Perfect for training rewards',
            'Suitable for dogs with sensitivities'
          ],
          directions: 'Feed as treats between meals. Recommended serving: 1-3 treats per day based on dog size. Use as training rewards. Always provide fresh water. Store in cool, dry place.',
          reviews: [
            {
              rating: 5,
              comment: 'My dog loves these treats! His coat looks amazing.',
              reviewer: 'Karen P.',
              date: '2024-10-22'
            },
            {
              rating: 5,
              comment: 'Great for training. Single ingredient, nothing artificial.',
              reviewer: 'Steve R.',
              date: '2024-10-18'
            }
          ]
        },
        '22': {
          id: '22',
          name: 'Automatic Milking Machine',
          category: 'MILKING_EQUIPMENT',
          description: 'Professional-grade automatic milking machine suitable for cows, goats, and sheep. Features dual vacuum pump system, stainless steel construction, and easy-to-clean design. Perfect for small to medium dairy operations.',
          brand: 'DairyPro',
          images: [
            'https://images.unsplash.com/photo-1605522561255-3ac1b6e0c2e6?w=800&q=80',
            'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
            'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80'
          ],
          price: 1899.99,
          stockQuantity: 15,
          averageRating: 4.8,
          totalReviews: 43,
          specifications: {
            pumpType: 'Dual Vacuum Pump',
            bucketCapacity: '25 liters',
            material: 'Stainless Steel',
            voltage: '110V',
            powerOutput: '1.5 HP',
            pulsationRate: '60 cycles/min'
          },
          tags: ['milking', 'dairy-equipment', 'automatic', 'professional'],
          features: [
            'Dual vacuum pump for efficient milking',
            'Stainless steel food-grade construction',
            'Easy to assemble and clean',
            'Adjustable vacuum pressure',
            'Suitable for cows, goats, and sheep',
            '25-liter capacity bucket',
            'Includes all accessories',
            '1-year manufacturer warranty'
          ],
          directions: 'Clean and sanitize all parts before first use. Connect to power source, attach inflation clusters, and adjust vacuum pressure according to animal type. Clean thoroughly after each use. See manual for detailed operating instructions.',
          reviews: [
            {
              rating: 5,
              comment: 'Excellent machine! Makes milking so much easier and faster.',
              reviewer: 'Robert M.',
              date: '2024-07-15'
            },
            {
              rating: 5,
              comment: 'Great quality, easy to use and clean. Highly recommend!',
              reviewer: 'Susan W.',
              date: '2024-06-20'
            }
          ]
        },
        '23': {
          id: '23',
          name: 'Premium English Saddle',
          category: 'SADDLES_TACK',
          description: 'High-quality English all-purpose saddle made from premium leather. Features deep seat, adjustable stirrups, and ergonomic design for rider comfort. Suitable for training, showing, and pleasure riding.',
          brand: 'EquiLeather',
          images: [
            'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
            'https://images.unsplash.com/photo-1551817958-11e0f7bbea4a?w=800&q=80',
            'https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?w=800&q=80'
          ],
          price: 649.99,
          originalPrice: 799.99,
          stockQuantity: 8,
          averageRating: 4.9,
          totalReviews: 67,
          specifications: {
            seatSize: '17 inches',
            material: 'Premium Leather',
            treeType: 'Adjustable',
            weight: '18 lbs',
            color: 'Dark Brown'
          },
          tags: ['saddle', 'english', 'leather', 'all-purpose'],
          features: [
            'Premium top-grain leather',
            'Deep, secure seat',
            'Adjustable stirrup bars',
            'Ergonomic knee rolls',
            'Fits most horses',
            'Hand-crafted quality',
            'Easy to clean and maintain',
            'Includes stirrups and leathers'
          ],
          directions: 'Clean and condition leather regularly with appropriate saddle soap and leather conditioner. Store in dry location away from direct sunlight. Check girth and stirrup leathers before each use.',
          reviews: [
            {
              rating: 5,
              comment: 'Beautiful saddle! Very comfortable for both horse and rider.',
              reviewer: 'Emily R.',
              date: '2024-08-10'
            }
          ]
        },
        '24': {
          id: '24',
          name: 'Mineral Block for Livestock - 50 lbs',
          category: 'MINERAL_SUPPLEMENTS',
          description: 'Complete trace mineral supplement block for cattle, horses, sheep, and goats. Provides essential minerals including copper, zinc, manganese, and selenium for optimal health and performance. Weather-resistant formula ensures minerals remain available year-round.',
          brand: 'FarmNutrition',
          images: [
            'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
            'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
            'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=800&q=80'
          ],
          price: 34.99,
          stockQuantity: 185,
          averageRating: 4.6,
          totalReviews: 142,
          specifications: {
            weight: '50 lbs',
            salt: '95%',
            zinc: '3500 ppm',
            manganese: '2800 ppm',
            copper: '280 ppm',
            selenium: '35 ppm'
          },
          tags: ['mineral', 'supplement', 'livestock', 'trace-minerals'],
          features: [
            'Complete trace mineral formula',
            'Weather-resistant block',
            'Free-choice supplement',
            'Promotes healthy growth',
            'Supports immune function',
            'Improves coat condition',
            'Suitable for all livestock',
            'Long-lasting formula'
          ],
          directions: 'Place in covered mineral feeder accessible to livestock. Animals will consume as needed. Provide fresh water at all times. One block typically lasts 3-6 months for 10-15 head.',
          reviews: [
            {
              rating: 5,
              comment: 'Our cattle look healthier since using this mineral block.',
              reviewer: 'Thomas W.',
              date: '2024-09-01'
            }
          ]
        },
        '25': {
          id: '25',
          name: 'Premium Poultry Feed - 40 lbs',
          category: 'POULTRY_FEED',
          description: 'Complete layer feed formulated for maximum egg production and health. Contains balanced protein, calcium, and essential nutrients for laying hens. Produces strong shells and rich, golden yolks. Made with non-GMO corn and fortified with vitamins.',
          brand: 'FarmFresh',
          images: [
            'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80',
            'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=800&q=80',
            'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=800&q=80',
            'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80'
          ],
          price: 24.99,
          stockQuantity: 203,
          averageRating: 4.8,
          totalReviews: 256,
          specifications: {
            weight: '40 lbs',
            proteinContent: '16%',
            calciumContent: '3.5%',
            fatContent: '3%',
            fiberContent: '5%'
          },
          tags: ['chicken', 'poultry', 'layer-feed', 'egg-production'],
          features: [
            'Balanced nutrition for laying hens',
            'High calcium for strong eggshells',
            'Contains omega-3 fatty acids',
            'No antibiotics or hormones',
            'Promotes golden egg yolks',
            'Supports overall hen health',
            'Pelleted for easy feeding',
            'Made with non-GMO corn'
          ],
          ingredients: 'Corn, Soybean Meal, Wheat, Calcium Carbonate, Oyster Shell, Flaxseed, Salt, Vitamin A, Vitamin D3, Vitamin E, Riboflavin, Niacin, Pantothenic Acid.',
          directions: 'Feed free-choice to laying hens. Each hen will consume approximately 1/4 lb per day. Provide clean water and grit. Store in cool, dry place.',
          reviews: [
            {
              rating: 5,
              comment: 'Best layer feed! My hens are laying consistently with strong shells.',
              reviewer: 'Lisa G.',
              date: '2024-10-01'
            }
          ]
        },
        '26': {
          id: '26',
          name: 'Large Livestock Water Trough - 100 Gallon',
          category: 'FARM_TOOLS',
          description: 'Heavy-duty polyethylene water trough for livestock. UV-resistant, freeze-resistant, and built to last. Features drain plug for easy cleaning and refilling. Perfect for cattle, horses, and other large animals.',
          brand: 'RanchMaster',
          images: [
            'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
            'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80'
          ],
          price: 189.99,
          stockQuantity: 34,
          averageRating: 4.7,
          totalReviews: 89,
          specifications: {
            capacity: '100 gallons',
            material: 'Polyethylene',
            dimensions: '72" L x 24" W x 18" H',
            weight: '45 lbs',
            color: 'Black'
          },
          tags: ['water-trough', 'livestock', 'heavy-duty', 'farm-equipment'],
          features: [
            '100-gallon capacity',
            'UV-resistant polyethylene',
            'Freeze-resistant construction',
            'Built-in drain plug',
            'Rounded corners for safety',
            'Non-toxic materials',
            'Durable and long-lasting',
            'Easy to clean and maintain'
          ],
          directions: 'Place on level ground. Fill with fresh water. Clean and refill regularly. Drain completely for winter storage in freezing climates or use with tank heater.',
          reviews: [
            {
              rating: 5,
              comment: 'Excellent quality trough. Very durable and easy to clean.',
              reviewer: 'Michael B.',
              date: '2024-07-25'
            }
          ]
        },
        '27': {
          id: '27',
          name: 'Cattle Halter & Lead Rope Set',
          category: 'HALTERS_LEADS',
          description: 'Adjustable rope halter and lead rope set for cattle. Made from durable braided nylon for strength and longevity. Features adjustable fit for various sizes and secure knot design.',
          brand: 'LivestockGear',
          images: [
            'https://images.unsplash.com/photo-1551817958-11e0f7bbea4a?w=800&q=80',
            'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80'
          ],
          price: 29.99,
          stockQuantity: 76,
          averageRating: 4.5,
          totalReviews: 64,
          specifications: {
            material: 'Braided Nylon',
            halterSize: 'Adjustable',
            ropeLength: '10 feet',
            diameter: '1/2 inch',
            color: 'Navy Blue'
          },
          tags: ['halter', 'lead-rope', 'cattle', 'training'],
          features: [
            'Adjustable fit for various sizes',
            'Durable braided nylon construction',
            '10-foot lead rope included',
            'Secure knot design',
            'Weather-resistant',
            'Easy to clean',
            'Comfortable handling',
            'Suitable for training and showing'
          ],
          directions: 'Adjust halter to fit snugly around animal\'s head. Attach lead rope securely. Never leave halter on unattended animal. Clean regularly and inspect for wear.',
          reviews: [
            {
              rating: 5,
              comment: 'Great quality halter. Very sturdy and easy to adjust.',
              reviewer: 'David A.',
              date: '2024-08-15'
            }
          ]
        },
        '28': {
          id: '28',
          name: 'Veterinary Medicine Kit for Livestock',
          category: 'VETERINARY_MEDICINES',
          description: 'Comprehensive first aid and medicine kit for livestock emergencies. Includes antibiotics, wound care supplies, syringes, and essential medications. Perfect for farm and ranch use.',
          brand: 'VetCare Pro',
          images: [
            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
            'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80'
          ],
          price: 159.99,
          stockQuantity: 42,
          averageRating: 4.8,
          totalReviews: 78,
          specifications: {
            components: '25+ items',
            storage: 'Weatherproof Case',
            includes: 'Medications, Syringes, Bandages',
            suitable: 'Cattle, Horses, Sheep, Goats'
          },
          tags: ['veterinary', 'first-aid', 'livestock', 'emergency'],
          features: [
            'Comprehensive medication kit',
            'Weatherproof storage case',
            'Includes syringes and needles',
            'Wound care supplies',
            'Antibiotic ointments',
            'Thermometer and gloves',
            'Instruction guide included',
            'Essential for every farm'
          ],
          directions: 'Store in cool, dry location. Check expiration dates regularly. Follow label directions for all medications. Consult veterinarian for serious conditions. Keep out of reach of children.',
          reviews: [
            {
              rating: 5,
              comment: 'Every farmer should have this kit. Very comprehensive and well-organized.',
              reviewer: 'John D.',
              date: '2024-06-30'
            }
          ]
        }
      }

      const mockProduct = mockProducts[productId] || mockProducts['1']
      setProduct(mockProduct)
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = () => {
    // Handle add to cart logic here
    alert(`Added ${quantity} ${product?.name} to cart`)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 0)) {
      setQuantity(newQuantity)
    }
  }

  if (isLoading || currencyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
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
          <span>Back to Products</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20"
          >
            <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
              ) : (
                <div className="text-8xl">📦</div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-300">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-300">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              {product.stockQuantity < 10 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Low Stock - {product.stockQuantity} left
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="text-blue-600 font-medium mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.averageRating}</span>
                  <span className="text-gray-600">({product.totalReviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</div>
                {product.originalPrice && (
                  <div className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                )}
                {product.originalPrice && (
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full transition-colors duration-300"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full transition-colors duration-300"
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockQuantity} in stock
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - {formatPrice(product.price * quantity)}</span>
              </button>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
        >
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {['description', 'features', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 capitalize ${
                    selectedTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {selectedTab === 'description' && (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                {product.ingredients && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ingredients:</h3>
                    <p className="text-gray-700 text-sm">{product.ingredients}</p>
                  </div>
                )}
                {product.directions && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Feeding Directions:</h3>
                    <p className="text-gray-700 text-sm">{product.directions}</p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-700">{value as string}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Customer Reviews ({product.totalReviews})
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{product.averageRating} out of 5</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-900">{review.reviewer}</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}