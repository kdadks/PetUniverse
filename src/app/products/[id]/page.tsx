'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
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
        '1': {
          id: '1',
          name: 'Premium Cat Food - Tuna & Salmon',
          category: 'FOOD',
          description: 'This premium grain-free wet cat food is made with real tuna and salmon, providing your feline friend with the protein they need for optimal health. Rich in omega-3 fatty acids, this formula supports healthy skin and coat while delivering exceptional taste that cats love.',
          brand: 'FelineChoice',
          images: [],
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
        '19': {
          id: '19',
          name: 'Premium Cattle Feed - 50 lbs',
          category: 'CATTLE_FEED',
          description: 'High-quality complete cattle feed formulated for optimal growth, milk production, and overall health. Contains balanced protein, energy, vitamins, and minerals specifically designed for dairy and beef cattle. Made with premium grains and fortified with essential nutrients.',
          brand: 'FarmGold',
          images: [],
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
        '20': {
          id: '20',
          name: 'Premium Horse Grain Mix - 40 lbs',
          category: 'LIVESTOCK_FEED',
          description: 'Specially formulated complete grain mix for horses of all ages and activity levels. Provides balanced nutrition with quality proteins, essential vitamins, and minerals. Perfect for performance horses, pleasure riding, and general maintenance.',
          brand: 'EquineElite',
          images: [],
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
          images: [],
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
        '22': {
          id: '22',
          name: 'Automatic Milking Machine',
          category: 'MILKING_EQUIPMENT',
          description: 'Professional-grade automatic milking machine suitable for cows, goats, and sheep. Features dual vacuum pump system, stainless steel construction, and easy-to-clean design. Perfect for small to medium dairy operations.',
          brand: 'DairyPro',
          images: [],
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
          images: [],
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
          description: 'Complete trace mineral supplement block for cattle, horses, sheep, and goats. Provides essential minerals including copper, zinc, manganese, and selenium for optimal health and performance.',
          brand: 'FarmNutrition',
          images: [],
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
          description: 'Complete layer feed formulated for maximum egg production and health. Contains balanced protein, calcium, and essential nutrients for laying hens. Produces strong shells and rich, golden yolks.',
          brand: 'FarmFresh',
          images: [],
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
          images: [],
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
          images: [],
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
          images: [],
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
            <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
              <div className="text-8xl">📦</div>
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