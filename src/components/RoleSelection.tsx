'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RoleSelection = () => {
  const router = useRouter()
  const [role, setRole] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role) {
      router.push(`/${role.toLowerCase()}`)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-[#E0E0E0]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-medium text-[#04282E]">Select your role</p>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setRole('Doctor')}
              className={`flex-1 py-4 px-6 rounded-lg border transition-colors duration-200 ${
                role === 'Doctor'
                  ? 'bg-[#0D6C7E] text-white border-[#0D6C7E]'
                  : 'bg-white text-[#04282E] border-[#E0E0E0] hover:bg-[#F4F4F4]'
              }`}
            >
              Doctor
            </button>
            
            <button
              type="button"
              onClick={() => setRole('Admin')}
              className={`flex-1 py-4 px-6 rounded-lg border transition-colors duration-200 ${
                role === 'Admin'
                  ? 'bg-[#0D6C7E] text-white border-[#0D6C7E]'
                  : 'bg-white text-[#04282E] border-[#E0E0E0] hover:bg-[#F4F4F4]'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!role}
          className="w-full py-4 px-6 border border-transparent rounded-lg shadow-sm text-white
                   bg-[#F4A261] hover:bg-[#E76F51] transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4A261]
                   disabled:bg-[#E0E0E0] disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default RoleSelection 