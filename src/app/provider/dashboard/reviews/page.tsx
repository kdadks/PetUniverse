'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  Star,
  Search,
  Filter,
  ThumbsUp,
  MessageSquare,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react'

interface Review {
  id: string
  clientName: string
  clientAvatar?: string
  petName: string
  service: string
  rating: number
  comment: string
  date: string
  response?: string
  helpful: number
}

const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    petName: 'Max',
    service: 'Dog Grooming',
    rating: 5,
    comment: 'Amazing service! Max looked so handsome after his grooming session. The groomer was patient and gentle with him. Will definitely be back!',
    date: '2024-12-05',
    response: 'Thank you so much, Sarah! It was a pleasure grooming Max. See you next time!',
    helpful: 12
  },
  {
    id: '2',
    clientName: 'Mike Brown',
    petName: 'Whiskers',
    service: 'Cat Health Checkup',
    rating: 4,
    comment: 'Very thorough checkup. The vet was knowledgeable and answered all my questions. Only minor issue was the wait time.',
    date: '2024-12-03',
    helpful: 8
  },
  {
    id: '3',
    clientName: 'Lisa Davis',
    petName: 'Buddy',
    service: 'Pet Training Session',
    rating: 5,
    comment: 'Incredible results! Buddy learned so many new commands in just a few sessions. The trainer has a real gift with dogs.',
    date: '2024-11-28',
    response: 'Thanks Lisa! Buddy is such a smart pup and a joy to work with!',
    helpful: 15
  },
  {
    id: '4',
    clientName: 'Emma Wilson',
    petName: 'Charlie',
    service: 'Dog Walking',
    rating: 5,
    comment: 'Charlie absolutely loves his walks! Always comes back happy and tired. Reliable and trustworthy service.',
    date: '2024-11-25',
    helpful: 6
  },
  {
    id: '5',
    clientName: 'John Smith',
    petName: 'Luna',
    service: 'Pet Sitting',
    rating: 4,
    comment: 'Luna was well taken care of during our vacation. Received regular updates and photos. Would recommend!',
    date: '2024-11-20',
    helpful: 10
  }
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState<string>('all')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter)
    return matchesSearch && matchesRating
  })

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }))

  const handleReply = (reviewId: string) => {
    if (replyText.trim()) {
      setReviews(prev => prev.map(r => 
        r.id === reviewId ? { ...r, response: replyText } : r
      ))
      setReplyText('')
      setReplyingTo(null)
    }
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Star className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Reviews
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rating Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="text-center mb-4">
              <p className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              <div className="flex justify-center my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 w-3">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">5-Star Reviews</span>
                </div>
                <span className="font-bold text-green-600">
                  {reviews.filter(r => r.rating === 5).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Responses</span>
                </div>
                <span className="font-bold text-blue-600">
                  {reviews.filter(r => r.response).length}/{reviews.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ThumbsUp className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Helpful Votes</span>
                </div>
                <span className="font-bold text-purple-600">
                  {reviews.reduce((sum, r) => sum + r.helpful, 0)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Achievement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 shadow-xl text-white"
          >
            <div className="text-center">
              <Award className="h-16 w-16 mx-auto mb-4 text-yellow-200" />
              <h3 className="text-xl font-bold mb-2">Top Rated Provider</h3>
              <p className="text-yellow-100">You&apos;re in the top 10% of providers!</p>
              <div className="mt-4 bg-white/20 rounded-lg p-3">
                <p className="text-sm">Keep up the great work to maintain your status.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                    {review.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.clientName}</h4>
                    <p className="text-sm text-gray-600">{review.service} for {review.petName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1 flex items-center justify-end">
                    <Calendar className="h-3 w-3 mr-1" />
                    {review.date}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              {review.response && (
                <div className="bg-teal-50 rounded-lg p-4 mb-4 border-l-4 border-teal-500">
                  <p className="text-sm font-medium text-teal-800 mb-1">Your Response:</p>
                  <p className="text-gray-700">{review.response}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{review.helpful} helpful</span>
                  </button>
                </div>
                {!review.response && (
                  <button
                    onClick={() => setReplyingTo(review.id)}
                    className="flex items-center space-x-2 text-teal-600 hover:text-teal-800 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">Reply</span>
                  </button>
                )}
              </div>

              {replyingTo === review.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your response..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReply(review.id)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Post Reply
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </ProviderLayout>
  )
}
