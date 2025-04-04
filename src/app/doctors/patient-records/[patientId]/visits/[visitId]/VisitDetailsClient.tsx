"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenSaturation: string;
  respiratoryRate: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface VisitDetail {
  id: string;
  date: string;
  vitalSigns: VitalSigns;
  diagnosis: string;
  prescription: string;
  medications: Medication[];
  notes: string;
  doctorId: string;
  doctorName: string;
}

interface PatientData {
  id: string;
  name: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
}

export default function VisitDetailsClient({
  patientId,
  visitId,
}: {
  patientId: string;
  visitId: string;
}) {
  const router = useRouter();
  const [visitData, setVisitData] = useState<VisitDetail | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedVisit, setEditedVisit] = useState<VisitDetail | null>(null);

  useEffect(() => {
    fetchData();
  }, [patientId, visitId]);

  const fetchData = async () => {
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

      // Fetch visit data
      const visitDoc = await getDoc(
        doc(db, "patientRequests", patientId, "visits", visitId)
      );

      if (!visitDoc.exists()) {
        // Try to fetch from the old structure as a fallback
        const visitRef = collection(db, "patientRequests", patientId, "visits");
        const visitsSnapshot = await getDocs(visitRef);

        const visit = visitsSnapshot.docs.find((doc) => doc.id === visitId);

        if (!visit) {
          toast.error("Visit not found");
          router.push(`/doctors/patient-records/${patientId}`);
          return;
        }

        const visitData = visit.data();

        const formattedVisit = {
          id: visit.id,
          date: visitData.date || new Date().toISOString().split("T")[0],
          vitalSigns: {
            bloodPressure: visitData.bloodPressure || "120/80",
            heartRate: visitData.heartRate || "72",
            temperature: visitData.temperature || "37.0",
            oxygenSaturation: visitData.oxygenSaturation || "98%",
            respiratoryRate: visitData.respiratoryRate || "16/min",
          },
          diagnosis: visitData.diagnosis || "",
          prescription: visitData.prescription || "",
          medications: visitData.medications || [],
          notes: visitData.notes || "",
          doctorId: visitData.doctorId || "",
          doctorName: visitData.doctorName || "",
        };

        setVisitData(formattedVisit);
        setEditedVisit(formattedVisit);
      } else {
        // Standard path when visit exists
        const visitData = visitDoc.data();

        const formattedVisit = {
          id: visitId,
          date: visitData.date || new Date().toISOString().split("T")[0],
          vitalSigns: visitData.vitalSigns || {
            bloodPressure: visitData.bloodPressure || "120/80",
            heartRate: visitData.heartRate || "72",
            temperature: visitData.temperature || "37.0",
            oxygenSaturation: "98%",
            respiratoryRate: "16/min",
          },
          diagnosis: visitData.diagnosis || "",
          prescription: visitData.prescription || "",
          medications: visitData.medications || [],
          notes: visitData.notes || "",
          doctorId: visitData.doctorId || "",
          doctorName: visitData.doctorName || "",
        };

        setVisitData(formattedVisit);
        setEditedVisit(formattedVisit);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!editedVisit) return;

    try {
      await updateDoc(
        doc(db, "patientRequests", patientId, "visits", visitId),
        {
          vitalSigns: editedVisit.vitalSigns,
          diagnosis: editedVisit.diagnosis,
          prescription: editedVisit.prescription,
          medications: editedVisit.medications,
          notes: editedVisit.notes,
          updatedAt: new Date().toISOString(),
        }
      );

      setVisitData(editedVisit);
      setIsEditing(false);
      toast.success("Visit details updated successfully");
    } catch (error) {
      console.error("Error updating visit:", error);
      toast.error("Failed to update visit details");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (!editedVisit) return;

    setEditedVisit({
      ...editedVisit,
      [field]: value,
    });
  };

  const handleVitalSignChange = (field: keyof VitalSigns, value: string) => {
    if (!editedVisit) return;

    setEditedVisit({
      ...editedVisit,
      vitalSigns: {
        ...editedVisit.vitalSigns,
        [field]: value,
      },
    });
  };

  const addMedication = () => {
    if (!editedVisit) return;

    const newMedication = {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    };

    setEditedVisit({
      ...editedVisit,
      medications: [...editedVisit.medications, newMedication],
    });
  };

  const updateMedication = (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    if (!editedVisit) return;

    const updatedMedications = [...editedVisit.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };

    setEditedVisit({
      ...editedVisit,
      medications: updatedMedications,
    });
  };

  const removeMedication = (index: number) => {
    if (!editedVisit) return;

    const updatedMedications = [...editedVisit.medications];
    updatedMedications.splice(index, 1);

    setEditedVisit({
      ...editedVisit,
      medications: updatedMedications,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!visitData || !patientData) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Visit details not found</p>
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
            <h1 className="text-2xl font-bold text-[#0D6C7E]">Visit Details</h1>
            <p className="text-[#04282E]">Patient: {patientData.name}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-[#0D6C7E] text-[#0D6C7E] rounded-lg hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D]"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D]"
              >
                Edit Visit
              </button>
              <Link
                href={`/doctors/patient-records/${patientId}`}
                className="px-4 py-2 bg-[#04282E] text-white rounded-lg hover:bg-[#031D22]"
              >
                Back to Patient Record
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">
          Visit Date: {new Date(visitData.date).toLocaleDateString()}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vital Signs Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">
            Vital Signs
          </h2>
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    value={editedVisit?.vitalSigns.bloodPressure}
                    onChange={(e) =>
                      handleVitalSignChange("bloodPressure", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heart Rate
                  </label>
                  <input
                    type="text"
                    value={editedVisit?.vitalSigns.heartRate}
                    onChange={(e) =>
                      handleVitalSignChange("heartRate", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature
                  </label>
                  <input
                    type="text"
                    value={editedVisit?.vitalSigns.temperature}
                    onChange={(e) =>
                      handleVitalSignChange("temperature", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Oxygen Saturation
                  </label>
                  <input
                    type="text"
                    value={editedVisit?.vitalSigns.oxygenSaturation}
                    onChange={(e) =>
                      handleVitalSignChange("oxygenSaturation", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Respiratory Rate
                  </label>
                  <input
                    type="text"
                    value={editedVisit?.vitalSigns.respiratoryRate}
                    onChange={(e) =>
                      handleVitalSignChange("respiratoryRate", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-[#04282E] font-medium">
                  Blood Pressure:{" "}
                  <span className="text-black">
                    {visitData.vitalSigns.bloodPressure}
                  </span>
                </p>
                <p className="text-[#04282E] font-medium">
                  Heart Rate:{" "}
                  <span className="text-black">
                    {visitData.vitalSigns.heartRate}
                  </span>
                </p>
                <p className="text-[#04282E] font-medium">
                  Temperature:{" "}
                  <span className="text-black">
                    {visitData.vitalSigns.temperature}
                  </span>
                </p>
                <p className="text-[#04282E] font-medium">
                  Oxygen Saturation:{" "}
                  <span className="text-black">
                    {visitData.vitalSigns.oxygenSaturation}
                  </span>
                </p>
                <p className="text-[#04282E] font-medium">
                  Respiratory Rate:{" "}
                  <span className="text-black">
                    {visitData.vitalSigns.respiratoryRate}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Diagnosis and Prescription Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">
            Diagnosis & Prescription
          </h2>
          {isEditing ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <textarea
                  value={editedVisit?.diagnosis}
                  onChange={(e) =>
                    handleInputChange("diagnosis", e.target.value)
                  }
                  rows={3}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescription Notes
                </label>
                <textarea
                  value={editedVisit?.prescription}
                  onChange={(e) =>
                    handleInputChange("prescription", e.target.value)
                  }
                  rows={5}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-[#04282E] font-medium">Diagnosis:</p>
                <p className="ml-4 text-black">
                  {visitData.diagnosis || "No diagnosis recorded"}
                </p>
              </div>
              <div>
                <p className="text-[#04282E] font-medium">Prescription:</p>
                <p className="ml-4 whitespace-pre-line text-black">
                  {visitData.prescription || "No prescription recorded"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Medications Card */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#0D6C7E]">
              Medications
            </h2>
            {isEditing && (
              <button
                onClick={addMedication}
                className="px-3 py-1 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D] text-sm"
              >
                Add Medication
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              {editedVisit?.medications &&
              editedVisit.medications.length > 0 ? (
                editedVisit.medications.map((med, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <button
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
          ) : (
            <div className="space-y-4">
              {visitData.medications && visitData.medications.length > 0 ? (
                visitData.medications.map((med, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h3 className="font-medium text-[#0D6C7E] mb-2">
                      {med.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="text-[#04282E]">
                        Dosage: <span className="text-black">{med.dosage}</span>
                      </p>
                      <p className="text-[#04282E]">
                        Frequency:{" "}
                        <span className="text-black">{med.frequency}</span>
                      </p>
                      <p className="text-[#04282E]">
                        Duration:{" "}
                        <span className="text-black">{med.duration}</span>
                      </p>
                      <p className="text-[#04282E] md:col-span-2">
                        Instructions:{" "}
                        <span className="text-black">{med.instructions}</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No medications recorded
                </p>
              )}
            </div>
          )}
        </div>

        {/* Notes Card */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Notes</h2>
          {isEditing ? (
            <textarea
              value={editedVisit?.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={5}
              className="w-full p-2 border rounded-lg"
              placeholder="Add additional notes about this visit"
            />
          ) : (
            <p className="text-black whitespace-pre-line">
              {visitData.notes || "No additional notes."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
