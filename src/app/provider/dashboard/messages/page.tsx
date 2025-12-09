'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  Clock,
  Image,
  Smile
} from 'lucide-react'

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file'
}

interface Conversation {
  id: string
  clientName: string
  clientAvatar?: string
  petName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    petName: 'Max',
    lastMessage: 'Thank you so much! Max looks amazing!',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    isOnline: true,
    messages: [
      { id: '1', senderId: 'client', text: 'Hi! I wanted to book a grooming session for Max', timestamp: '10:00 AM', status: 'read', type: 'text' },
      { id: '2', senderId: 'provider', text: 'Hello Sarah! I have availability tomorrow at 2 PM. Would that work?', timestamp: '10:05 AM', status: 'read', type: 'text' },
      { id: '3', senderId: 'client', text: 'Perfect! That works great for us', timestamp: '10:10 AM', status: 'read', type: 'text' },
      { id: '4', senderId: 'provider', text: 'Great! I\'ve scheduled the appointment. See you tomorrow!', timestamp: '10:15 AM', status: 'read', type: 'text' },
      { id: '5', senderId: 'client', text: 'Thank you so much! Max looks amazing!', timestamp: '3:30 PM', status: 'delivered', type: 'text' },
      { id: '6', senderId: 'client', text: 'We\'ll definitely be back! 🐕', timestamp: '3:31 PM', status: 'delivered', type: 'text' }
    ]
  },
  {
    id: '2',
    clientName: 'Mike Brown',
    petName: 'Whiskers',
    lastMessage: 'When is the next available appointment?',
    lastMessageTime: '1 hour ago',
    unreadCount: 1,
    isOnline: false,
    messages: [
      { id: '1', senderId: 'client', text: 'Hi, Whiskers needs her annual checkup', timestamp: '9:00 AM', status: 'read', type: 'text' },
      { id: '2', senderId: 'provider', text: 'Hi Mike! I can see Whiskers this week. What day works best?', timestamp: '9:30 AM', status: 'read', type: 'text' },
      { id: '3', senderId: 'client', text: 'When is the next available appointment?', timestamp: '10:00 AM', status: 'delivered', type: 'text' }
    ]
  },
  {
    id: '3',
    clientName: 'Lisa Davis',
    petName: 'Buddy',
    lastMessage: 'Buddy is doing great with the new commands!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: '1', senderId: 'provider', text: 'Hi Lisa! How is Buddy doing with the training exercises?', timestamp: 'Yesterday', status: 'read', type: 'text' },
      { id: '2', senderId: 'client', text: 'Buddy is doing great with the new commands!', timestamp: 'Yesterday', status: 'read', type: 'text' }
    ]
  },
  {
    id: '4',
    clientName: 'Emma Wilson',
    petName: 'Charlie',
    lastMessage: 'See you tomorrow for the walk!',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: '1', senderId: 'client', text: 'Can we schedule a dog walk for Friday?', timestamp: '2 days ago', status: 'read', type: 'text' },
      { id: '2', senderId: 'provider', text: 'Of course! I\'ll be there at 8 AM', timestamp: '2 days ago', status: 'read', type: 'text' },
      { id: '3', senderId: 'client', text: 'See you tomorrow for the walk!', timestamp: '2 days ago', status: 'read', type: 'text' }
    ]
  }
]

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation?.messages])

  const filteredConversations = conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.petName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'provider',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'text'
    }

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: 'Just now'
        }
      }
      return conv
    }))

    setSelectedConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMsg]
    } : null)

    setNewMessage('')
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="h-3 w-3 text-gray-400" />
      case 'delivered': return <CheckCheck className="h-3 w-3 text-gray-400" />
      case 'read': return <CheckCheck className="h-3 w-3 text-blue-500" />
      default: return <Clock className="h-3 w-3 text-gray-400" />
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <ProviderLayout>
      <div className="h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <MessageSquare className="h-8 w-8 text-teal-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Messages
          </h1>
          {totalUnread > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {totalUnread} new
            </span>
          )}
        </div>

        <div className="flex h-[calc(100%-80px)] bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv)
                    // Mark as read
                    setConversations(prev => prev.map(c => 
                      c.id === conv.id ? { ...c, unreadCount: 0 } : c
                    ))
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-teal-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                        {conv.clientName.charAt(0)}
                      </div>
                      {conv.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 truncate">{conv.clientName}</h4>
                        <span className="text-xs text-gray-500">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conv.petName}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                      {selectedConversation.clientName.charAt(0)}
                    </div>
                    {selectedConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedConversation.clientName}</h4>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.isOnline ? 'Online' : 'Offline'} • {selectedConversation.petName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.senderId === 'provider' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.senderId === 'provider'
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.text}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${
                        message.senderId === 'provider' ? 'text-teal-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.senderId === 'provider' && getMessageStatusIcon(message.status)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Image className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <Smile className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full hover:from-teal-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  )
}
