'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface HospitalInfo {
  name: string;
  state: string;
  district: string;
  location: string;
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    otherSpecialization: '',
    medicalId: '',
    aadhaarNumber: '',
    numHospitals: 1,
    hospitals: [] as HospitalInfo[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'numHospitals') {
      const numHospitals = parseInt(value);
      setFormData(prev => ({
        ...prev,
        numHospitals,
        hospitals: Array(numHospitals).fill({ name: '', state: '', district: '', location: '' })
      }));
    } else if (name === 'specialization') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        otherSpecialization: value !== 'Other' ? '' : prev.otherSpecialization
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
        [field]: value,
        ...(field === 'state' && { district: '' })
      };
      return {
        ...prev,
        hospitals: updatedHospitals
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="max-w-2xl w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4">
            <Image
              src="/medib.jpg"
              alt="MediConnect Logo"
              width={128}
              height={128}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Doctor Registration</h1>
          <p className="text-[#04282E] mt-2">Create your account</p>
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
                  name="medicalId"
                  value={formData.medicalId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  placeholder="Enter your Medical ID"
                  required
                />
              </div>

              {/* 4. Aadhaar Number */}
              <div>
                <label className="block text-sm font-medium text-[#04282E]">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                           text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                  placeholder="Enter your 12-digit Aadhaar number"
                  pattern="[0-9]{12}"
                  maxLength={12}
                  required
                />
              </div>

              {/* 5. Specialization */}
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

              {/* Add conditional input field for other specialization */}
              {formData.specialization === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-[#04282E]">Specify Specialization</label>
                  <input
                    type="text"
                    name="otherSpecialization"
                    value={formData.otherSpecialization}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                             text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                    placeholder="Please specify your specialization"
                    required
                  />
                </div>
              )}

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