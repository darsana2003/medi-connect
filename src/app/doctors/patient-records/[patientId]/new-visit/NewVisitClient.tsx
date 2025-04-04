"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db, auth } from "@/firebase/config";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

interface PatientData {
  id: string;
  name: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export default function NewVisitClient({ patientId }: { patientId: string }) {
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [visitDate, setVisitDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);

      // Fetch patient data
      const patientDoc = await getDoc(doc(db, "patientRequests", patientId));

      if (!patientDoc.exists()) {
        toast.error("Patient not found");
        router.push("/doctors/dashboard");
        return;
      }

      const patient = patientDoc.data();
      setPatientData({
        id: patientId,
        name: patient.patientName || patient.name || "Unknown",
        patientName: patient.patientName || patient.name || "Unknown",
        age: patient.age || 0,
        gender: patient.gender || "Unknown",
        phone: patient.phone || "",
        email: patient.email || "",
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      toast.error("Failed to load patient data");
      setLoading(false);
    }
  };

  const addMedication = () => {
    const newMedication = {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    };

    setMedications([...medications, newMedication]);
  };

  const updateMedication = (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };

    setMedications(updatedMedications);
  };

  const removeMedication = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);

    setMedications(updatedMedications);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientData) {
      toast.error("Patient data is missing");
      return;
    }

    try {
      setSaving(true);

      // Get current user (doctor) information
      const currentUser = auth.currentUser;
      const doctorId = currentUser?.uid || "";
      const doctorName = currentUser?.displayName || "";

      // Create visit data
      const visitData = {
        date: visitDate,
        vitalSigns: {
          bloodPressure,
          heartRate,
          temperature,
          oxygenSaturation,
          respiratoryRate,
        },
        diagnosis,
        prescription,
        medications,
        notes,
        doctorId,
        doctorName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add to visits subcollection
      const visitsRef = collection(db, "patientRequests", patientId, "visits");
      const newVisitRef = await addDoc(visitsRef, visitData);

      toast.success("Visit record created successfully");

      // Redirect to the visit details page
      router.push(
        `/doctors/patient-records/${patientId}/visits/${newVisitRef.id}`
      );
    } catch (error) {
      console.error("Error saving visit:", error);
      toast.error("Failed to save visit record");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Patient not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-[40px] h-[40px] flex-shrink-0">
            <Image
              src="/medib.png"
              alt="MediConnect Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0D6C7E]">
              New Visit Record
            </h1>
            <p className="text-[#04282E]">Patient: {patientData.name}</p>
          </div>
        </div>
        <Link
          href={`/doctors/patient-records/${patientId}`}
          className="px-4 py-2 bg-[#04282E] text-white rounded-lg hover:bg-[#031D22]"
        >
          Cancel
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Visit Date */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">
              Visit Information
            </h2>
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visit Date
              </label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          {/* Vital Signs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">
              Vital Signs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Pressure (mmHg)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 120/80"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heart Rate (bpm)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 72"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature (°C)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 37.0"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Oxygen Saturation (%)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 98%"
                  value={oxygenSaturation}
                  onChange={(e) => setOxygenSaturation(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Respiratory Rate (breaths/min)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 16/min"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Diagnosis & Prescription */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">
              Diagnosis & Prescription
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <textarea
                  placeholder="Enter diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  rows={3}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescription Notes
                </label>
                <textarea
                  placeholder="Enter prescription details"
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  rows={5}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#0D6C7E]">
                Medications
              </h2>
              <button
                type="button"
                onClick={addMedication}
                className="px-3 py-1 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D] text-sm"
              >
                Add Medication
              </button>
            </div>

            <div className="space-y-6">
              {medications.length > 0 ? (
                medications.map((med, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Medication Name
                        </label>
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) =>
                            updateMedication(index, "name", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosage
                        </label>
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) =>
                            updateMedication(index, "dosage", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frequency
                        </label>
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) =>
                            updateMedication(index, "frequency", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={med.duration}
                          onChange={(e) =>
                            updateMedication(index, "duration", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instructions
                        </label>
                        <input
                          type="text"
                          value={med.instructions}
                          onChange={(e) =>
                            updateMedication(
                              index,
                              "instructions",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No medications added
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">
              Additional Notes
            </h2>
            <textarea
              placeholder="Add any additional notes about this visit"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href={`/doctors/patient-records/${patientId}`}
              className="px-6 py-3 border border-[#0D6C7E] text-[#0D6C7E] rounded-lg hover:bg-[#F8FAFC]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Visit Record"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
