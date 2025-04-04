"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hospitalName: "",
    adminId: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    // For now, we'll just redirect to the dashboard
    router.push("/admin/dashboard");
    // Store admin info without the "Dr." prefix
    localStorage.setItem("adminName", "Sarah Johnson"); // Removed "Dr." prefix
    localStorage.setItem("adminEmail", "sarah.johnson@mediconnect.com");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            src="/LOGO_NO_BG.png"
            alt="MediConnect Logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-black">
          Admin Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="hospitalName"
                className="block text-sm font-medium text-black"
              >
                Hospital Name
              </label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.hospitalName}
                onChange={(e) =>
                  setFormData({ ...formData, hospitalName: e.target.value })
                }
                placeholder="Enter hospital name"
              />
            </div>

            <div>
              <label
                htmlFor="adminId"
                className="block text-sm font-medium text-black"
              >
                Admin ID
              </label>
              <input
                type="text"
                id="adminId"
                name="adminId"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.adminId}
                onChange={(e) =>
                  setFormData({ ...formData, adminId: e.target.value })
                }
                placeholder="Enter admin ID"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter password"
              />
              <p className="mt-1 text-sm text-black">
                Example ID format: ADMIN_2024_001
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D6C7E] hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/admin/forgot-password"
                className="text-black hover:text-[#0D6C7E]"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-sm">
              <Link
                href="/admin/register"
                className="text-black hover:text-[#0D6C7E]"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
