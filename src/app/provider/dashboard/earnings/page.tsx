'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react'

interface Transaction {
  id: string
  type: 'earning' | 'payout' | 'refund'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'processing'
  service?: string
  client?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earning',
    description: 'Dog Grooming - Max',
    amount: 75,
    date: '2024-12-08',
    status: 'completed',
    service: 'Dog Grooming',
    client: 'Sarah Johnson'
  },
  {
    id: '2',
    type: 'earning',
    description: 'Cat Health Checkup - Whiskers',
    amount: 120,
    date: '2024-12-07',
    status: 'completed',
    service: 'Health Checkup',
    client: 'Mike Brown'
  },
  {
    id: '3',
    type: 'payout',
    description: 'Weekly Payout',
    amount: 850,
    date: '2024-12-06',
    status: 'completed'
  },
  {
    id: '4',
    type: 'earning',
    description: 'Pet Training Session - Buddy',
    amount: 90,
    date: '2024-12-05',
    status: 'completed',
    service: 'Pet Training',
    client: 'Lisa Davis'
  },
  {
    id: '5',
    type: 'refund',
    description: 'Cancelled Booking Refund',
    amount: -45,
    date: '2024-12-04',
    status: 'completed',
    client: 'John Smith'
  },
  {
    id: '6',
    type: 'earning',
    description: 'Dog Walking - Charlie',
    amount: 25,
    date: '2024-12-04',
    status: 'completed',
    service: 'Dog Walking',
    client: 'Emma Wilson'
  },
  {
    id: '7',
    type: 'payout',
    description: 'Pending Payout',
    amount: 420,
    date: '2024-12-09',
    status: 'pending'
  }
]

export default function EarningsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [filter, setFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<string>('month')

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true
    return t.type === filter
  })

  const totalEarnings = transactions
    .filter(t => t.type === 'earning' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalPayouts = transactions
    .filter(t => t.type === 'payout' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingPayout = transactions
    .filter(t => t.type === 'payout' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0)

  const currentBalance = totalEarnings - totalPayouts

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning': return <ArrowUpRight className="h-5 w-5 text-green-600" />
      case 'payout': return <ArrowDownRight className="h-5 w-5 text-blue-600" />
      case 'refund': return <ArrowDownRight className="h-5 w-5 text-red-600" />
      default: return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <DollarSign className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Earnings
            </h1>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Earnings</p>
                <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-100">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Current Balance</p>
                <p className="text-3xl font-bold">${currentBalance.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-100">
              Available for payout
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Payouts</p>
                <p className="text-3xl font-bold">${totalPayouts.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-purple-100">
              Withdrawn to bank
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending Payout</p>
                <p className="text-3xl font-bold">${pendingPayout.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-orange-100">
              Processing in 2-3 days
            </div>
          </motion.div>
        </div>

        {/* Payout Request Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Request Payout</h3>
              <p className="text-gray-600">Transfer your earnings to your bank account</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-green-600">${currentBalance.toLocaleString()}</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
                Request Payout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Transactions</option>
              <option value="earning">Earnings</option>
              <option value="payout">Payouts</option>
              <option value="refund">Refunds</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'earning' ? 'bg-green-100' :
                          transaction.type === 'payout' ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          {transaction.client && (
                            <p className="text-sm text-gray-500">{transaction.client}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{transaction.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-semibold ${
                        transaction.type === 'earning' ? 'text-green-600' :
                        transaction.type === 'refund' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {transaction.type === 'earning' ? '+' : transaction.type === 'payout' ? '-' : ''}
                        ${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </ProviderLayout>
  )
}
