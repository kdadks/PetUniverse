'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  Star,
  Heart,
  Filter,
  Package,
  Truck,
  Shield,
  Plus,
  Minus
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
  stockQuantity: number
  averageRating: number
  totalReviews: number
  specifications: any
  tags: string[]
  isActive: boolean
}

const productCategories = [
  { id: 'ALL', name: 'All Products', icon: Package },
  // Pet Products
  { id: 'FOOD', name: 'Pet Food', icon: '🍖' },
  { id: 'TREATS', name: 'Treats', icon: '🦴' },
  { id: 'TOYS', name: 'Toys', icon: '🎾' },
  { id: 'ACCESSORIES', name: 'Accessories', icon: '🎀' },
  { id: 'HEALTH_SUPPLEMENTS', name: 'Health Supplements', icon: '💊' },
  { id: 'GROOMING_SUPPLIES', name: 'Grooming', icon: '✂️' },
  { id: 'BEDDING', name: 'Bedding', icon: '🛏️' },
  { id: 'CARRIERS', name: 'Carriers', icon: '👜' },
  // Livestock Products
  { id: 'LIVESTOCK_FEED', name: 'Livestock Feed', icon: '🌾' },
  { id: 'CATTLE_FEED', name: 'Cattle Feed', icon: '🐄' },
  { id: 'POULTRY_FEED', name: 'Poultry Feed', icon: '🐔' },
  { id: 'MINERAL_SUPPLEMENTS', name: 'Mineral Supplements', icon: '⚡' },
  { id: 'VETERINARY_MEDICINES', name: 'Vet Medicines', icon: '💉' },
  { id: 'MILKING_EQUIPMENT', name: 'Milking Equipment', icon: '🥛' },
  { id: 'FARM_TOOLS', name: 'Farm Tools', icon: '🔧' },
  { id: 'SADDLES_TACK', name: 'Saddles & Tack', icon: '🐴' },
  { id: 'HALTERS_LEADS', name: 'Halters & Leads', icon: '🪢' },
]

export default function ProductsPage() {
  const { formatPrice, isLoading: currencyLoading } = useCurrency()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState('popularity')
  const [cart, setCart] = useState<{[key: string]: number}>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchQuery, priceRange, sortBy])

  const fetchProducts = async () => {
    try {
      // Mock products data - replace with actual API
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Dog Food - Chicken & Rice',
          category: 'FOOD',
          description: 'High-quality dry dog food made with real chicken and brown rice. Perfect for adult dogs.',
          brand: 'PetNutrition Pro',
          images: [],
          price: 45.99,
          stockQuantity: 50,
          averageRating: 4.8,
          totalReviews: 156,
          specifications: { weight: '15 lbs', ingredients: 'Chicken, Brown Rice, Vegetables' },
          tags: ['premium', 'natural', 'adult'],
          isActive: true
        },
        {
          id: '2',
          name: 'Premium Cat Food - Tuna & Salmon',
          category: 'FOOD',
          description: 'Grain-free wet cat food with real tuna and salmon. Rich in protein and omega-3.',
          brand: 'FelineChoice',
          images: [],
          price: 28.99,
          stockQuantity: 65,
          averageRating: 4.9,
          totalReviews: 234,
          specifications: { weight: '12 cans', ingredients: 'Tuna, Salmon, Peas' },
          tags: ['grain-free', 'wet-food', 'protein-rich'],
          isActive: true
        },
        {
          id: '3',
          name: 'Tropical Fish Flakes',
          category: 'FOOD',
          description: 'Nutritious tropical fish flakes with enhanced colors and vitamins for healthy fish.',
          brand: 'AquaNutrition',
          images: [],
          price: 16.99,
          stockQuantity: 85,
          averageRating: 4.6,
          totalReviews: 127,
          specifications: { weight: '2.2 oz', type: 'Floating flakes' },
          tags: ['tropical', 'colorful', 'vitamins'],
          isActive: true
        },
        {
          id: '4',
          name: 'Interactive Cat Feather Wand',
          category: 'TOYS',
          description: 'Extendable feather wand toy that drives cats wild with natural hunting instincts.',
          brand: 'CatPlay',
          images: [],
          price: 14.99,
          stockQuantity: 120,
          averageRating: 4.8,
          totalReviews: 189,
          specifications: { length: '36 inches', material: 'Natural feathers' },
          tags: ['interactive', 'feathers', 'exercise'],
          isActive: true
        },
        {
          id: '5',
          name: 'Aquarium Treasure Chest Decoration',
          category: 'TOYS',
          description: 'Realistic treasure chest that opens and closes, perfect for fish tank decoration.',
          brand: 'AquaDecor',
          images: [],
          price: 22.99,
          stockQuantity: 45,
          averageRating: 4.5,
          totalReviews: 78,
          specifications: { size: '4 inches', material: 'Resin' },
          tags: ['decoration', 'aquarium', 'treasure'],
          isActive: true
        },
        {
          id: '6',
          name: 'Interactive Puzzle Ball',
          category: 'TOYS',
          description: 'Mental stimulation toy that keeps dogs engaged and entertained for hours.',
          brand: 'SmartPaws',
          images: [],
          price: 19.99,
          stockQuantity: 75,
          averageRating: 4.6,
          totalReviews: 89,
          specifications: { material: 'Non-toxic plastic', size: 'Medium' },
          tags: ['interactive', 'puzzle', 'mental-stimulation'],
          isActive: true
        },
        {
          id: '7',
          name: 'Luxury Cat Bed',
          category: 'BEDDING',
          description: 'Ultra-soft and comfortable bed perfect for cats who love to sleep in style.',
          brand: 'ComfyPaws',
          images: [],
          price: 68.99,
          stockQuantity: 25,
          averageRating: 4.9,
          totalReviews: 203,
          specifications: { material: 'Memory foam', size: 'Large', washable: true },
          tags: ['luxury', 'comfortable', 'washable'],
          isActive: true
        },
        {
          id: '8',
          name: 'Cat Cave Bed',
          category: 'BEDDING',
          description: 'Cozy enclosed cat bed that provides security and warmth for anxious cats.',
          brand: 'HideawayPets',
          images: [],
          price: 39.99,
          stockQuantity: 40,
          averageRating: 4.7,
          totalReviews: 156,
          specifications: { material: 'Felt wool', size: 'Medium', washable: true },
          tags: ['cave', 'security', 'warm'],
          isActive: true
        },
        {
          id: '9',
          name: 'Freeze-Dried Tuna Cat Treats',
          category: 'TREATS',
          description: 'Pure freeze-dried tuna treats with no additives. Perfect training reward.',
          brand: 'PureTreats',
          images: [],
          price: 18.99,
          stockQuantity: 90,
          averageRating: 4.8,
          totalReviews: 145,
          specifications: { weight: '1.5 oz', ingredients: '100% Tuna' },
          tags: ['freeze-dried', 'pure', 'training'],
          isActive: true
        },
        {
          id: '10',
          name: 'Bloodworm Fish Treats',
          category: 'TREATS',
          description: 'Freeze-dried bloodworms, perfect high-protein treat for tropical fish.',
          brand: 'AquaTreats',
          images: [],
          price: 12.99,
          stockQuantity: 70,
          averageRating: 4.5,
          totalReviews: 92,
          specifications: { weight: '0.7 oz', type: 'Freeze-dried' },
          tags: ['bloodworms', 'protein', 'tropical'],
          isActive: true
        },
        {
          id: '11',
          name: 'Natural Dog Treats - Salmon',
          category: 'TREATS',
          description: 'All-natural salmon treats packed with omega-3 fatty acids for healthy skin and coat.',
          brand: 'NatureTreats',
          images: [],
          price: 12.99,
          stockQuantity: 100,
          averageRating: 4.7,
          totalReviews: 67,
          specifications: { weight: '8 oz', ingredients: '100% Salmon' },
          tags: ['natural', 'salmon', 'healthy'],
          isActive: true
        },
        {
          id: '12',
          name: 'Cat Grooming Brush',
          category: 'GROOMING_SUPPLIES',
          description: 'Self-cleaning slicker brush perfect for removing loose fur and preventing matting.',
          brand: 'FelineGroom',
          images: [],
          price: 24.99,
          stockQuantity: 55,
          averageRating: 4.6,
          totalReviews: 178,
          specifications: { material: 'Stainless steel pins', size: 'Medium' },
          tags: ['self-cleaning', 'slicker', 'anti-mat'],
          isActive: true
        },
        {
          id: '13',
          name: 'Aquarium Water Test Kit',
          category: 'GROOMING_SUPPLIES',
          description: 'Complete water testing kit for pH, ammonia, nitrite, and nitrate levels.',
          brand: 'AquaTest',
          images: [],
          price: 32.99,
          stockQuantity: 35,
          averageRating: 4.7,
          totalReviews: 143,
          specifications: { tests: 150, parameters: 4 },
          tags: ['water-test', 'aquarium', 'health'],
          isActive: true
        },
        {
          id: '14',
          name: 'Professional Grooming Kit',
          category: 'GROOMING_SUPPLIES',
          description: 'Complete grooming kit with brushes, nail clippers, and grooming tools.',
          brand: 'GroomPro',
          images: [],
          price: 89.99,
          stockQuantity: 30,
          averageRating: 4.5,
          totalReviews: 124,
          specifications: { items: 8, material: 'Stainless steel' },
          tags: ['professional', 'complete-kit', 'durable'],
          isActive: true
        },
        {
          id: '15',
          name: 'Cat Calming Supplement',
          category: 'HEALTH_SUPPLEMENTS',
          description: 'Natural calming supplement with L-theanine and chamomile for anxious cats.',
          brand: 'CalmCat',
          images: [],
          price: 26.99,
          stockQuantity: 45,
          averageRating: 4.4,
          totalReviews: 112,
          specifications: { pills: 30, type: 'Soft chews' },
          tags: ['calming', 'natural', 'anxiety'],
          isActive: true
        },
        {
          id: '16',
          name: 'Fish Tank Filter',
          category: 'ACCESSORIES',
          description: 'High-efficiency aquarium filter for tanks up to 50 gallons with bio-media.',
          brand: 'ClearWater',
          images: [],
          price: 54.99,
          stockQuantity: 25,
          averageRating: 4.8,
          totalReviews: 87,
          specifications: { capacity: '50 gallons', flow: '200 GPH' },
          tags: ['filter', 'bio-media', 'efficient'],
          isActive: true
        },
        {
          id: '17',
          name: 'Cat Collar with Bell',
          category: 'ACCESSORIES',
          description: 'Breakaway safety collar with bell and ID tag holder. Adjustable and comfortable.',
          brand: 'SafePaws',
          images: [],
          price: 8.99,
          stockQuantity: 150,
          averageRating: 4.3,
          totalReviews: 267,
          specifications: { material: 'Nylon', breakaway: true },
          tags: ['safety', 'breakaway', 'bell'],
          isActive: true
        },
        {
          id: '18',
          name: 'Joint Health Supplement',
          category: 'HEALTH_SUPPLEMENTS',
          description: 'Glucosamine and chondroitin supplement for joint health and mobility support.',
          brand: 'VetHealth',
          images: [],
          price: 34.99,
          stockQuantity: 60,
          averageRating: 4.4,
          totalReviews: 98,
          specifications: { pills: 60, type: 'Chewable tablets' },
          tags: ['joint-health', 'glucosamine', 'senior-dogs'],
          isActive: true
        },
        // Livestock Products
        {
          id: '19',
          name: 'Premium Cattle Feed - 50 lbs',
          category: 'CATTLE_FEED',
          description: 'High-protein cattle feed with balanced nutrition for optimal growth and milk production.',
          brand: 'FarmGold',
          images: [],
          price: 45.99,
          stockQuantity: 200,
          averageRating: 4.8,
          totalReviews: 156,
          specifications: { weight: '50 lbs', protein: '16%', fiber: '12%' },
          tags: ['cattle', 'dairy', 'high-protein'],
          isActive: true
        },
        {
          id: '20',
          name: 'Poultry Layer Feed - 40 lbs',
          category: 'POULTRY_FEED',
          description: 'Complete nutrition for laying hens, promotes strong shells and consistent egg production.',
          brand: 'ChickenChoice',
          images: [],
          price: 32.99,
          stockQuantity: 180,
          averageRating: 4.7,
          totalReviews: 134,
          specifications: { weight: '40 lbs', protein: '18%', calcium: '4%' },
          tags: ['poultry', 'layers', 'eggs'],
          isActive: true
        },
        {
          id: '21',
          name: 'Livestock Mineral Supplement',
          category: 'MINERAL_SUPPLEMENTS',
          description: 'Essential minerals and vitamins for cattle, goats, and sheep health.',
          brand: 'MineralPro',
          images: [],
          price: 58.99,
          stockQuantity: 95,
          averageRating: 4.9,
          totalReviews: 89,
          specifications: { weight: '25 lbs', type: 'Loose mineral' },
          tags: ['minerals', 'vitamins', 'livestock'],
          isActive: true
        },
        {
          id: '22',
          name: 'Automatic Milking Machine',
          category: 'MILKING_EQUIPMENT',
          description: 'Efficient portable milking machine for cows, goats, and sheep. Easy to clean.',
          brand: 'DairyTech',
          images: [],
          price: 189.99,
          stockQuantity: 25,
          averageRating: 4.6,
          totalReviews: 67,
          specifications: { capacity: '25L', power: 'Electric', warranty: '2 years' },
          tags: ['milking', 'dairy', 'equipment'],
          isActive: true
        },
        {
          id: '23',
          name: 'Horse Saddle - Western Style',
          category: 'SADDLES_TACK',
          description: 'Premium leather western saddle with comfortable seat and durable construction.',
          brand: 'EquiPro',
          images: [],
          price: 450.00,
          stockQuantity: 15,
          averageRating: 4.8,
          totalReviews: 45,
          specifications: { material: 'Genuine leather', size: 'Medium', weight: '35 lbs' },
          tags: ['saddle', 'western', 'horse'],
          isActive: true
        },
        {
          id: '24',
          name: 'Cattle Halter & Lead Rope Set',
          category: 'HALTERS_LEADS',
          description: 'Heavy-duty rope halter with 10ft lead rope, perfect for cattle and horses.',
          brand: 'StrongHold',
          images: [],
          price: 28.99,
          stockQuantity: 85,
          averageRating: 4.7,
          totalReviews: 112,
          specifications: { material: 'Polypropylene', length: '10 ft', strength: '1200 lbs' },
          tags: ['halter', 'rope', 'training'],
          isActive: true
        },
        {
          id: '25',
          name: 'Livestock Dewormer - Ivermectin',
          category: 'VETERINARY_MEDICINES',
          description: 'Broad-spectrum dewormer for cattle, sheep, goats, and horses.',
          brand: 'VetMed Pro',
          images: [],
          price: 42.99,
          stockQuantity: 55,
          averageRating: 4.9,
          totalReviews: 98,
          specifications: { volume: '250ml', type: 'Injectable', dosage: '1ml per 50kg' },
          tags: ['dewormer', 'parasite-control', 'veterinary'],
          isActive: true
        },
        {
          id: '26',
          name: 'Goat & Sheep Mineral Feeder',
          category: 'FARM_TOOLS',
          description: 'Weather-resistant mineral feeder with covered design to keep minerals dry.',
          brand: 'FarmEssentials',
          images: [],
          price: 65.99,
          stockQuantity: 40,
          averageRating: 4.5,
          totalReviews: 76,
          specifications: { capacity: '50 lbs', material: 'Galvanized steel' },
          tags: ['feeder', 'minerals', 'equipment'],
          isActive: true
        },
        {
          id: '27',
          name: 'Horse Grooming Kit - Complete',
          category: 'GROOMING_SUPPLIES',
          description: 'Professional 9-piece grooming kit including brushes, hoof pick, and curry comb.',
          brand: 'EquiCare',
          images: [],
          price: 75.99,
          stockQuantity: 50,
          averageRating: 4.8,
          totalReviews: 134,
          specifications: { items: 9, material: 'Wood and metal', case: 'Included' },
          tags: ['grooming', 'horse', 'complete-kit'],
          isActive: true
        },
        {
          id: '28',
          name: 'Buffalo & Cattle Vitamin Supplement',
          category: 'MINERAL_SUPPLEMENTS',
          description: 'Complete vitamin and mineral supplement for dairy and beef cattle.',
          brand: 'NutriBoost',
          images: [],
          price: 68.99,
          stockQuantity: 70,
          averageRating: 4.7,
          totalReviews: 89,
          specifications: { weight: '20 kg', type: 'Powder', duration: '30 days' },
          tags: ['vitamins', 'cattle', 'buffalo'],
          isActive: true
        }
      ]
      setProducts(mockProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating)
        break
      case 'popularity':
      default:
        filtered.sort((a, b) => b.totalReviews - a.totalReviews)
        break
    }

    setFilteredProducts(filtered)
  }

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId]--
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId)
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  if (isLoading || currencyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16">
      <div className="bg-gradient-to-r from-teal-100/80 via-cyan-100/80 to-emerald-100/80 backdrop-blur-sm shadow-lg pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Pet Products
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{filteredProducts.length} products</span>
              <div className="relative">
                <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-3 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                {getCartItemsCount() > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {getCartItemsCount()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products for pets, livestock, farm animals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <div>
                <select
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    setPriceRange([min, max])
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="0-200">All Prices</option>
                  <option value="0-25">Under $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100+</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </div>
              {getCartTotal() > 0 && (
                <div className="text-lg font-semibold text-green-600">
                  Cart Total: {formatPrice(getCartTotal())}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Categories</h2>
            <div className="flex flex-wrap gap-3">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <span className="text-lg">{typeof category.icon === 'string' ? category.icon : '📦'}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-300">
                    <Heart className="h-5 w-5" />
                  </button>
                  {product.stockQuantity < 10 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Low Stock
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-600">{product.brand}</p>
                  </div>

                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.averageRating}</span>
                    <span className="text-xs text-gray-500">({product.totalReviews})</span>
                  </div>

                  <p className="text-gray-700 text-xs mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</div>
                    <div className="text-xs text-gray-500">{product.stockQuantity} in stock</div>
                  </div>

                  <div className="flex items-center justify-between">
                    {cart[product.id] ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full transition-colors duration-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium">{cart[product.id]}</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="bg-teal-500 hover:bg-teal-600 text-white p-1 rounded-full transition-colors duration-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                    <Link
                      href={`/products/${product.id}`}
                      className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </motion.div>
          )}

          {/* Floating Cart Button */}
          {getCartItemsCount() > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">
                  Checkout ({getCartItemsCount()}) - {formatPrice(getCartTotal())}
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}