'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import Toast from '@/components/Toast'

interface HospitalInfo {
  name: string;
  state: string;
  district: string;
  location: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialization: string;
  licenseNumber: string;
  hospitals: HospitalInfo[];
  numHospitals: number;
}

const statesAndDistricts = {
  "Kerala": [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod"
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Tiruchirappalli",
    "Tirunelveli",
    "Vellore",
    "Erode",
    "Thoothukkudi",
    "Dindigul"
  ],
  "Karnataka": [
    "Bangalore",
    "Mysore",
    "Hubli",
    "Mangalore",
    "Belgaum",
    "Gulbarga",
    "Davanagere",
    "Bellary",
    "Shimoga",
    "Tumkur"
  ]
  // Add more states and districts as needed
};

export default function DoctorSignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    licenseNumber: '',
    numHospitals: 1,
    hospitals: [{ name: '', state: '', district: '', location: '' }]
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'numHospitals') {
      const numHospitals = parseInt(value);
      setFormData(prev => ({
        ...prev,
        numHospitals,
        hospitals: Array(numHospitals).fill({ name: '', state: '', district: '', location: '' })
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getDistricts = (state: string) => {
    return statesAndDistricts[state as keyof typeof statesAndDistricts] || [];
  };

  const handleHospitalChange = (index: number, field: keyof HospitalInfo, value: string) => {
    setFormData(prev => {
      const updatedHospitals = [...prev.hospitals];
      updatedHospitals[index] = {
        ...updatedHospitals[index],
        [field]: value
      };
      return {
        ...prev,
        hospitals: updatedHospitals
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: formData.name,
        specialization: formData.specialization,
        licenseNumber: formData.licenseNumber,
        hospitals: formData.hospitals,
        role: 'doctor',
        createdAt: new Date().toISOString()
      };

      // First create auth user
      const userCredential = await signUp(formData.email, formData.password, userData, 'doctor');

      // Add to web_users collection
      await setDoc(doc(db, 'web_users', userCredential.user.uid), {
        ...userData,
        email: formData.email,
        userId: userCredential.user.uid
      });

      setToast({
        message: 'Account created successfully! Redirecting to login...',
        type: 'success'
      });

      setTimeout(() => {
        router.push('/doctors/login');
      }, 2000);

    } catch (error: any) {
      setToast({
        message: error.message || 'Failed to create account',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-md w-full mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-[80px] h-[80px] flex-shrink-0">
            <Image
              src="/medib.png"
              alt="MediConnect Logo"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Doctor Sign Up</h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E0E0E0]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#04282E]">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  required
                />
              </div>

              {/* 2. Email */}
              <div>
                <label className="block text-sm font-medium text-[#04282E]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  required
                />
              </div>

              {/* 3. Medical ID */}
              <div>
                <label className="block text-sm font-medium text-[#04282E]">Medical ID</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  placeholder="Enter your Medical ID"
                  required
                />
              </div>

              {/* 4. Specialization */}
              <div>
                <label className="block text-sm font-medium text-[#04282E]">Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Family Medicine">Family Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="ENT">ENT (Otolaryngology)</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Plastic Surgery">Plastic Surgery</option>
                  <option value="Cardiac Surgery">Cardiac Surgery</option>
                  <option value="Neurosurgery">Neurosurgery</option>
                  <option value="Urology">Urology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Nephrology">Nephrology</option>
                  <option value="Rheumatology">Rheumatology</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Infectious Disease">Infectious Disease</option>
                  <option value="Emergency Medicine">Emergency Medicine</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Physical Medicine">Physical Medicine & Rehabilitation</option>
                  <option value="Sports Medicine">Sports Medicine</option>
                  <option value="Pain Management">Pain Management</option>
                  <option value="Geriatric Medicine">Geriatric Medicine</option>
                  <option value="Pediatric Surgery">Pediatric Surgery</option>
                  <option value="Neonatology">Neonatology</option>
                  <option value="Allergy & Immunology">Allergy & Immunology</option>
                  <option value="Nuclear Medicine">Nuclear Medicine</option>
                  <option value="Preventive Medicine">Preventive Medicine</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* 6. Number of Hospitals */}
              <div>
                <label className="block text-sm font-medium text-[#04282E]">Number of Hospitals</label>
                <select
                  name="numHospitals"
                  value={formData.numHospitals}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  required
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 7. Hospital Information */}
            {Array.from({ length: formData.numHospitals }).map((_, index) => (
              <div key={index} className="border-t pt-6">
                <h3 className="text-lg font-semibold text-[#0D6C7E] mb-4">
                  Hospital {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#04282E]">Hospital Name</label>
                    <input
                      type="text"
                      value={formData.hospitals[index]?.name || ''}
                      onChange={(e) => handleHospitalChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                               text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#04282E]">State</label>
                    <select
                      value={formData.hospitals[index]?.state || ''}
                      onChange={(e) => handleHospitalChange(index, 'state', e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                               text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                      required
                    >
                      <option value="">Select State</option>
                      {Object.keys(statesAndDistricts).map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#04282E]">District</label>
                    <select
                      value={formData.hospitals[index]?.district || ''}
                      onChange={(e) => handleHospitalChange(index, 'district', e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                               text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                      required
                      disabled={!formData.hospitals[index]?.state}
                    >
                      <option value="">Select District</option>
                      {formData.hospitals[index]?.state &&
                        getDistricts(formData.hospitals[index].state).map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#04282E]">Detailed Address</label>
                    <input
                      type="text"
                      value={formData.hospitals[index]?.location || ''}
                      onChange={(e) => handleHospitalChange(index, 'location', e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                               text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                      placeholder="Enter detailed address"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* 8. Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#04282E]">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#04282E]">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <Link 
                href="/doctors/login"
                className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
              >
                Already registered? Login
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-[#0D6C7E] hover:bg-[#08505D] 
                         text-white rounded-lg transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 