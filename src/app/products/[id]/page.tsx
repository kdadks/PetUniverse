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
      const mockProduct: Product = {
        id: params.id as string,
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
      }
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

  if (isLoading) {
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
            className="text-blue-600 hover:text-blue-800"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                <div className="text-3xl font-bold text-gray-900">${product.price}</div>
                {product.originalPrice && (
                  <div className="text-xl text-gray-500 line-through">${product.originalPrice}</div>
                )}
                {product.originalPrice && (
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
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