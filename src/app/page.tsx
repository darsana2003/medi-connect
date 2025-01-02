import RoleSelection from '@/components/RoleSelection'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-6">
            <Image
              src="/medib.jpg"
              alt="MediConnect Logo"
              width={192}
              height={192}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-[#0D6C7E] mb-2">MediConnect</h1>
          <p className="text-[#04282E]">Healthcare Management System</p>
        </div>
        <RoleSelection />
      </div>
    </main>
  )
}
