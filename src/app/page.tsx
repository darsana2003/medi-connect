'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RoleSelection() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>('')

  const handleContinue = () => {
    if (selectedRole === 'Doctor') {
      router.push('/doctors/login')
    } else if (selectedRole === 'Admin') {
      router.push('/admin')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="max-w-md w-full mx-4">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/medib.png"
            alt="MediConnect Logo"
            width={128}
            height={128}
            className="object-contain"
            priority
          />
          <h1 className="text-3xl font-bold text-[#0D6C7E]">MediConnect</h1>
          <p className="text-[#04282E] mt-2">Healthcare Management System</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E0E0E0]">
          <h2 className="text-center text-lg font-medium text-[#04282E] mb-6">
            Select your role
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => setSelectedRole('Doctor')}
              className={`w-full p-4 rounded-lg border-2 transition-colors duration-200 ${
                selectedRole === 'Doctor'
                  ? 'border-[#0D6C7E] bg-[#F0F7F9] text-[#0D6C7E]'
                  : 'border-gray-200 hover:border-[#0D6C7E] text-[#04282E]'
              }`}
            >
              Doctor
            </button>

            <button
              onClick={() => setSelectedRole('Admin')}
              className={`w-full p-4 rounded-lg border-2 transition-colors duration-200 ${
                selectedRole === 'Admin'
                  ? 'border-[#0D6C7E] bg-[#F0F7F9] text-[#0D6C7E]'
                  : 'border-gray-200 hover:border-[#0D6C7E] text-[#04282E]'
              }`}
            >
              Admin
            </button>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full mt-6 py-3 rounded-lg transition-colors duration-200 ${
              selectedRole
                ? 'bg-[#0D6C7E] text-white hover:bg-[#0A5A6A]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  )
}
