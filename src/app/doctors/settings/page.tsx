'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface WorkingHours {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
}

export default function DoctorSettings() {
  const router = useRouter()
  const [doctorName, setDoctorName] = useState('')
  const [activeTab, setActiveTab] = useState<'schedule' | 'notifications' | 'security'>('schedule')
  
  const [formData, setFormData] = useState({
    workingHours: [
      { day: 'Monday', isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00' },
      { day: 'Tuesday', isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00' },
      { day: 'Wednesday', isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00' },
      { day: 'Thursday', isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00' },
      { day: 'Friday', isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00' },
      { day: 'Saturday', isWorking: false, startTime: '', endTime: '', breakStart: '', breakEnd: '' },
      { day: 'Sunday', isWorking: false, startTime: '', endTime: '', breakStart: '', breakEnd: '' }
    ] as WorkingHours[],
    notifications: {
      email: true,
      appointmentReminders: true,
      cancelledAppointments: true,
      rescheduledAppointments: true
    },
    security: {
      sessionTimeout: '30'
    }
  })

  useEffect(() => {
    const storedDoctorName = localStorage.getItem('doctorName')
    if (!storedDoctorName) {
      router.replace('/doctors/login')
      return
    }
    setDoctorName(storedDoctorName)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save settings logic here
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative w-[40px] h-[40px] flex-shrink-0">
                <Image
                  src="/medib.png"
                  alt="MediConnect Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-[#0D6C7E]">Settings</h1>
            </div>
            
            <Link 
              href="/doctors/dashboard"
              className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] p-6">
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-4 px-4 ${
                activeTab === 'schedule'
                  ? 'border-b-2 border-[#0D6C7E] text-[#0D6C7E]'
                  : 'text-gray-500 hover:text-[#0D6C7E]'
              }`}
            >
              Working Hours
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-4 px-4 ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-[#0D6C7E] text-[#0D6C7E]'
                  : 'text-gray-500 hover:text-[#0D6C7E]'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-4 px-4 ${
                activeTab === 'security'
                  ? 'border-b-2 border-[#0D6C7E] text-[#0D6C7E]'
                  : 'text-gray-500 hover:text-[#0D6C7E]'
              }`}
            >
              Security
            </button>
          </div>

          {/* Working Hours Settings */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0D6C7E]">Working Hours</h3>
              {formData.workingHours.map((day, index) => (
                <div key={day.day} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={day.isWorking}
                        onChange={(e) => {
                          const newHours = [...formData.workingHours]
                          newHours[index].isWorking = e.target.checked
                          setFormData({ ...formData, workingHours: newHours })
                        }}
                        className="h-4 w-4 text-[#0D6C7E]"
                      />
                      <span className="font-medium">{day.day}</span>
                    </div>
                    {day.isWorking && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-500">Working Hours</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={day.startTime}
                              onChange={(e) => {
                                const newHours = [...formData.workingHours]
                                newHours[index].startTime = e.target.value
                                setFormData({ ...formData, workingHours: newHours })
                              }}
                              className="border rounded px-2 py-1"
                            />
                            <span>to</span>
                            <input
                              type="time"
                              value={day.endTime}
                              onChange={(e) => {
                                const newHours = [...formData.workingHours]
                                newHours[index].endTime = e.target.value
                                setFormData({ ...formData, workingHours: newHours })
                              }}
                              className="border rounded px-2 py-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Break Time</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={day.breakStart}
                              onChange={(e) => {
                                const newHours = [...formData.workingHours]
                                newHours[index].breakStart = e.target.value
                                setFormData({ ...formData, workingHours: newHours })
                              }}
                              className="border rounded px-2 py-1"
                            />
                            <span>to</span>
                            <input
                              type="time"
                              value={day.breakEnd}
                              onChange={(e) => {
                                const newHours = [...formData.workingHours]
                                newHours[index].breakEnd = e.target.value
                                setFormData({ ...formData, workingHours: newHours })
                              }}
                              className="border rounded px-2 py-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0D6C7E]">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#04282E]">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, email: e.target.checked }
                    })}
                    className="h-4 w-4 text-[#0D6C7E]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#04282E]">Appointment Reminders</h4>
                    <p className="text-sm text-gray-500">Get reminders for upcoming appointments</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.appointmentReminders}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, appointmentReminders: e.target.checked }
                    })}
                    className="h-4 w-4 text-[#0D6C7E]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#04282E]">Cancelled Appointments</h4>
                    <p className="text-sm text-gray-500">Get notified when appointments are cancelled</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.cancelledAppointments}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, cancelledAppointments: e.target.checked }
                    })}
                    className="h-4 w-4 text-[#0D6C7E]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#04282E]">Rescheduled Appointments</h4>
                    <p className="text-sm text-gray-500">Get notified when appointments are rescheduled</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.rescheduledAppointments}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, rescheduledAppointments: e.target.checked }
                    })}
                    className="h-4 w-4 text-[#0D6C7E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0D6C7E]">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#04282E]">Session Timeout</h4>
                  <p className="text-sm text-gray-500 mb-2">Automatically log out after inactivity</p>
                  <select
                    value={formData.security.sessionTimeout}
                    onChange={(e) => setFormData({
                      ...formData,
                      security: { ...formData.security, sessionTimeout: e.target.value }
                    })}
                    className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={() => router.push('/doctors/change-password')}
                    className="text-[#0D6C7E] hover:text-[#0A5A6A] font-medium"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
} 