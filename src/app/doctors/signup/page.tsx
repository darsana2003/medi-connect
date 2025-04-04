/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function DoctorSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hospital: "",
    specialization: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/doctors/dashboard");
      }
    });

    // Fetch hospitals list
    fetchHospitals();

    return () => unsubscribe();
  }, [router]);

  // Fetch hospitals when component mounts
  const fetchHospitals = async () => {
    try {
      setFetchingData(true);
      const hospitalsCollection = collection(db, "hospitals");
      const hospitalSnapshot = await getDocs(hospitalsCollection);

      const hospitalsList = hospitalSnapshot.docs.map((doc) => doc.id);
      setHospitals(hospitalsList);

      setFetchingData(false);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError("Failed to fetch hospitals");
      setFetchingData(false);
    }
  };

  // Fetch departments when hospital changes
  useEffect(() => {
    if (formData.hospital) {
      fetchDepartments(formData.hospital);
    } else {
      setDepartments([]);
    }
  }, [formData.hospital]);

  const fetchDepartments = async (hospitalName: string) => {
    try {
      setFetchingData(true);
      const hospitalRef = doc(db, "hospitals", hospitalName);
      const hospitalDoc = await getDoc(hospitalRef);

      if (hospitalDoc.exists()) {
        const hospitalData = hospitalDoc.data();
        const departmentsMap = hospitalData.departments || {};

        // Convert departments map to array
        const departmentsArray = Object.keys(departmentsMap).map((id) => ({
          id,
          name: departmentsMap[id].name,
          head: departmentsMap[id].head,
        }));

        setDepartments(departmentsArray);
      } else {
        setDepartments([]);
      }

      setFetchingData(false);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Failed to fetch departments");
      setFetchingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Store additional user data in Firestore
      await setDoc(doc(db, "doctors", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        hospital: formData.hospital,
        specialization: formData.specialization,
        phoneNumber: formData.phoneNumber,
        role: "doctor",
        createdAt: new Date().toISOString(),
      });

      // Also add the doctor to the hospital's doctors collection
      const hospitalRef = doc(db, "hospitals", formData.hospital);
      const hospitalDoc = await getDoc(hospitalRef);

      if (hospitalDoc.exists()) {
        // Add doctor to the hospital's doctors map
        await setDoc(
          hospitalRef,
          {
            doctors: {
              [userCredential.user.uid]: {
                name: formData.name,
                email: formData.email,
                specialization: formData.specialization,
                joinedAt: new Date().toISOString(),
              },
            },
          },
          { merge: true }
        );
      }

      router.push("/doctors/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create Doctor Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] placeholder:text-gray-400"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] placeholder:text-gray-400"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] placeholder:text-gray-400"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label
                htmlFor="hospital"
                className="block text-sm font-medium text-gray-700"
              >
                Hospital Name
              </label>
              <select
                id="hospital"
                name="hospital"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.hospital}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hospital: e.target.value,
                    specialization: "", // Reset specialization when hospital changes
                  })
                }
                disabled={fetchingData}
              >
                <option value="">Select Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
              {fetchingData && formData.hospital === "" && (
                <p className="mt-1 text-sm text-gray-500">
                  Loading hospitals...
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700"
              >
                Department / Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
                disabled={!formData.hospital || fetchingData}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {fetchingData && formData.hospital !== "" && (
                <p className="mt-1 text-sm text-gray-500">
                  Loading departments...
                </p>
              )}
              {!fetchingData &&
                formData.hospital &&
                departments.length === 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    No departments found for this hospital
                  </p>
                )}
              {!formData.hospital && (
                <p className="mt-1 text-sm text-gray-500">
                  Please select a hospital first
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] placeholder:text-gray-400"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || fetchingData}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D6C7E] hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E] disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm">
              Already have an account?{" "}
              <Link
                href="/doctors/login"
                className="text-[#0D6C7E] hover:text-[#0A5A6B]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
