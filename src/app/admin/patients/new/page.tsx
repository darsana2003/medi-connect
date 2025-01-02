'use client';
import { useState } from 'react';
import Link from 'next/link';

interface PatientData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: string;
}

export default function PatientRegistration() {
  const [formData, setFormData] = useState<PatientData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    medicalHistory: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const inputStyle = "w-full p-3 border rounded-md focus:border-[#0D6C7E] focus:ring-1 focus:ring-[#0D6C7E] text-[#04282E] font-bold text-lg bg-white placeholder:text-gray-400";
  const labelStyle = "block text-[#0D6C7E] font-semibold mb-2";

  return (
    <div className="p-8 bg-[#F4F4F4] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D6C7E]">Patient Registration</h1>
        <Link 
          href="/admin" 
          className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
        >
          Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <label className={labelStyle}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputStyle}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
            <label className={labelStyle}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={`${inputStyle} resize-none`}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}>Medical History</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              rows={4}
              className={`${inputStyle} resize-none`}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-[#0D6C7E] text-white px-6 py-3 rounded-md hover:bg-[#0A5A6A] transition-colors font-semibold text-lg"
          >
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
} 