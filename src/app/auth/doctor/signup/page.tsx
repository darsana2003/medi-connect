'use client';
import { useState } from 'react';
import Link from 'next/link';

interface HospitalInfo {
  name: string;
  location: string;
}

export default function DoctorSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    licenseNumber: '',
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
        hospitals: Array(numHospitals).fill({ name: '', location: '' })
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const inputStyle = "w-full p-3 border rounded-md focus:border-[#0D6C7E] focus:ring-1 focus:ring-[#0D6C7E] text-[#04282E] font-bold text-lg bg-white placeholder:text-gray-400";
  const labelStyle = "block text-[#0D6C7E] font-semibold mb-2";

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-[#0D6C7E]">
            Doctor Registration
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Number of Hospitals</label>
              <select
                name="numHospitals"
                value={formData.numHospitals}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital Information */}
          {Array.from({ length: formData.numHospitals }).map((_, index) => (
            <div key={index} className="border-t pt-6">
              <h3 className="text-xl font-semibold text-[#0D6C7E] mb-4">
                Hospital {index + 1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Hospital Name</label>
                  <input
                    type="text"
                    value={formData.hospitals[index]?.name || ''}
                    onChange={(e) => handleHospitalChange(index, 'name', e.target.value)}
                    className={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyle}>Hospital Location</label>
                  <input
                    type="text"
                    value={formData.hospitals[index]?.location || ''}
                    onChange={(e) => handleHospitalChange(index, 'location', e.target.value)}
                    className={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-6">
            <Link 
              href="/auth/doctor/login"
              className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
            >
              Already registered? Login
            </Link>
            <button
              type="submit"
              className="bg-[#0D6C7E] text-white px-6 py-3 rounded-md hover:bg-[#0A5A6A] transition-colors font-semibold text-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 