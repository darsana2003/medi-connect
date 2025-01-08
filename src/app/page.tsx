'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RolePage() {
  const router = useRouter()

  const handleAdminClick = () => {
    router.push('/admin/login')
  }

  const handleDoctorClick = () => {
    router.push('/doctor/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-60 h-60 relative mb-4">
          <Image
            src="/LOGO_NO_BG.png"
            alt="MediConnect Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mt-4 text-[#0D6C7E]">
          MediConnect
        </h1>
      </div>

      <div className="w-full max-w-md space-y-4 p-4">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
          Select your role
        </h2>
        
        <button
          onClick={handleDoctorClick}
          className="w-full p-4 text-center bg-white rounded-lg border-2 border-gray-200 
                   hover:border-[#0D6C7E] hover:bg-[#F0F7F9] transition-all duration-200 
                   text-gray-700 hover:text-[#0D6C7E]"
        >
          Doctor
        </button>

        <button
          onClick={handleAdminClick}
          className="w-full p-4 text-center bg-white rounded-lg border-2 border-gray-200 
                   hover:border-[#0D6C7E] hover:bg-[#F0F7F9] transition-all duration-200 
                   text-gray-700 hover:text-[#0D6C7E]"
        >
          Admin
        </button>
      </div>
    </div>
  )
}
