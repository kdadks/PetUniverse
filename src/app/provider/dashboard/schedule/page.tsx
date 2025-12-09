'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  Clock,
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  X
} from 'lucide-react'

interface TimeSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

interface Appointment {
  id: string
  title: string
  client: string
  pet: string
  service: string
  date: string
  startTime: string
  endTime: string
  color: string
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`)

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Dog Grooming',
    client: 'Sarah Johnson',
    pet: 'Max',
    service: 'Grooming',
    date: '2024-12-09',
    startTime: '09:00',
    endTime: '10:00',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Cat Checkup',
    client: 'Mike Brown',
    pet: 'Whiskers',
    service: 'Health Checkup',
    date: '2024-12-09',
    startTime: '11:00',
    endTime: '11:30',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Pet Training',
    client: 'Lisa Davis',
    pet: 'Buddy',
    service: 'Training',
    date: '2024-12-10',
    startTime: '14:00',
    endTime: '16:00',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Dog Walking',
    client: 'Emma Wilson',
    pet: 'Charlie',
    service: 'Walking',
    date: '2024-12-11',
    startTime: '08:00',
    endTime: '09:00',
    color: 'bg-orange-500'
  }
]

const defaultAvailability: TimeSlot[] = [
  { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: '2', day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: '3', day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: '4', day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: '5', day: 'Friday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: '6', day: 'Saturday', startTime: '10:00', endTime: '14:00', isAvailable: true },
  { id: '7', day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
]

export default function SchedulePage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [availability, setAvailability] = useState<TimeSlot[]>(defaultAvailability)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'week' | 'availability'>('week')
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null)

  const getWeekDates = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start)
      date.setDate(date.getDate() + i)
      return date
    })
  }

  const weekDates = getWeekDates()

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return appointments.filter(apt => apt.date === dateStr)
  }

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + (direction * 7))
    setCurrentDate(newDate)
  }

  const toggleAvailability = (slotId: string) => {
    setAvailability(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
    ))
  }

  const updateSlotTimes = (slotId: string, startTime: string, endTime: string) => {
    setAvailability(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, startTime, endTime } : slot
    ))
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Clock className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Schedule
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === 'week' ? 'bg-white shadow text-teal-600' : 'text-gray-600'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setView('availability')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === 'availability' ? 'bg-white shadow text-teal-600' : 'text-gray-600'
                }`}
              >
                Availability
              </button>
            </div>
          </div>
        </div>

        {view === 'week' ? (
          <>
            {/* Week Navigation */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/20">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h2>
              </div>
              <button
                onClick={() => navigateWeek(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Week Calendar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden"
            >
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-600">Time</div>
                {weekDates.map((date, idx) => (
                  <div
                    key={idx}
                    className={`p-4 text-center border-l border-gray-200 ${
                      formatDate(date) === formatDate(new Date()) ? 'bg-teal-50' : 'bg-gray-50'
                    }`}
                  >
                    <p className="text-xs text-gray-500">{daysOfWeek[date.getDay()]}</p>
                    <p className={`text-lg font-semibold ${
                      formatDate(date) === formatDate(new Date()) ? 'text-teal-600' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b border-gray-100">
                    <div className="p-4 text-sm text-gray-500 bg-gray-50">{time}</div>
                    {weekDates.map((date, idx) => {
                      const dayAppointments = getAppointmentsForDate(date).filter(
                        apt => apt.startTime === time
                      )
                      return (
                        <div
                          key={idx}
                          className="p-2 border-l border-gray-100 min-h-[60px] hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          {dayAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              className={`${apt.color} text-white text-xs p-2 rounded-lg mb-1`}
                            >
                              <p className="font-medium">{apt.title}</p>
                              <p className="opacity-80">{apt.client}</p>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Today's Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Schedule</h3>
              <div className="space-y-3">
                {getAppointmentsForDate(new Date()).length > 0 ? (
                  getAppointmentsForDate(new Date()).map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-12 ${apt.color} rounded-full`} />
                        <div>
                          <p className="font-medium text-gray-900">{apt.title}</p>
                          <p className="text-sm text-gray-600">{apt.client} - {apt.pet}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{apt.startTime} - {apt.endTime}</p>
                        <p className="text-sm text-gray-600">{apt.service}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No appointments scheduled for today</p>
                )}
              </div>
            </motion.div>
          </>
        ) : (
          /* Availability View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Availability</h3>
              <p className="text-sm text-gray-600">Set your regular working hours</p>
            </div>

            <div className="space-y-4">
              {availability.map((slot) => (
                <div
                  key={slot.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    slot.isAvailable ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleAvailability(slot.id)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        slot.isAvailable ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          slot.isAvailable ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                    <span className="font-medium text-gray-900 w-24">{slot.day}</span>
                  </div>

                  {slot.isAvailable && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => updateSlotTimes(slot.id, e.target.value, slot.endTime)}
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateSlotTimes(slot.id, slot.startTime, e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {!slot.isAvailable && (
                    <span className="text-gray-500 text-sm">Not available</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
                Save Availability
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </ProviderLayout>
  )
}
