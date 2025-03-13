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
  const [activeTab, setActiveTab] = useState('workingHours')
  
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
      appointmentReminders: true,
      appointmentUpdates: true,
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
    <div className="min-h-screen bg-[#F4F4F4] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Settings</h1>
        </div>
        <Link 
          href="/doctors/dashboard"
          className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'workingHours'
                  ? 'border-b-2 border-[#0D6C7E] text-[#0D6C7E]'
                  : 'text-gray-500 hover:text-[#0D6C7E]'
              }`}
              onClick={() => setActiveTab('workingHours')}
            >
              Working Hours
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'security'
                  ? 'border-b-2 border-[#0D6C7E] text-[#0D6C7E]'
                  : 'text-gray-500 hover:text-[#0D6C7E]'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'workingHours' && (
            <div>
              <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Working Hours</h2>
              {formData.workingHours.map((day, index) => (
                <div key={day.day} className="border-b pb-4 last:border-0 text-black">
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

          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Security Settings</h2>
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
                <div className="p-4 border rounded-lg">
                  <div className="mb-4">
                    <p className="font-medium text-black">Change Password</p>
                    <p className="text-sm text-black">Update your account password</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-black mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full p-2 border rounded-lg text-black"
                        placeholder="Enter current password"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-black mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full p-2 border rounded-lg text-black"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full p-2 border rounded-lg text-black"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="flex justify-end mt-4">
                      <button className="bg-[#0D6C7E] text-white px-4 py-2 rounded-lg hover:bg-[#0A5A6A]">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-black">Two-Factor Authentication</p>
                    <p className="text-sm text-black">Add an extra layer of security</p>
                  </div>
                  <button className="text-[#0D6C7E] hover:text-[#0A5A6A] font-medium">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-black">Login History</p>
                    <p className="text-sm text-black">View your recent login activity</p>
                  </div>
                  <button className="text-[#0D6C7E] hover:text-[#0A5A6A] font-medium">
                    View
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
  )
} 