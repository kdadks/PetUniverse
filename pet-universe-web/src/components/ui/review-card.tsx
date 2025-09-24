'use client'

import { motion } from 'framer-motion'
import { Star, User, Calendar, Heart, Shield } from 'lucide-react'

interface ReviewCardProps {
  review: {
    id: string
    rating: number
    title?: string
    comment?: string
    images: string[]
    isVerified: boolean
    createdAt: string
    customer: {
      firstName: string
      lastName: string
      avatar?: string
    }
    booking?: {
      service: {
        name: string
        category: string
      }
      pet: {
        name: string
        species: string
      }
    }
  }
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-full">
            {review.customer.avatar ? (
              <img
                src={review.customer.avatar}
                alt="Customer"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <User className="h-8 w-8 text-gray-600" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {review.customer.firstName} {review.customer.lastName}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(review.createdAt)}</span>
              {review.isVerified && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= review.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {review.title && (
        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
      )}

      {review.comment && (
        <p className="text-gray-700 mb-4">{review.comment}</p>
      )}

      {review.booking && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
          <div className="text-sm">
            <span className="font-medium text-gray-900">Service:</span> {review.booking.service.name}
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">Pet:</span> {review.booking.pet.name} ({review.booking.pet.species})
          </div>
        </div>
      )}

      {review.images && review.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {review.images.slice(0, 3).map((image, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-gray-400" />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Rating: {review.rating}/5 stars</span>
        <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
          Helpful
        </button>
      </div>
    </motion.div>
  )
}