export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  visitDetails?: VisitDetail;
}

export interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenSaturation: string;
  respiratoryRate: string;
}

export interface LabResults {
  bloodSugar: {
    fasting: string;
    postPrandial: string;
    hba1c?: string;
  };
  cholesterol: {
    total: string;
    hdl: string;
    ldl: string;
    triglycerides: string;
  };
  other?: Array<{
    name: string;
    value: string;
    unit: string;
  }>;
}

export interface VisitDetail {
  vitalSigns: VitalSigns;
  labResults: LabResults;
  doctorFindings: {
    symptoms: string[];
    diagnosis: string;
    notes: string;
  };
  allergies: {
    medications: string[];
    food: string[];
    other: string;
  };
  prescription: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions: string;
    }>;
  };
}

export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientId: 'P001',
    patientName: 'Alice Johnson',
    time: '09:00 AM',
    reason: 'Regular Checkup',
    status: 'upcoming',
    visitDetails: {
      date: '2024-03-15',
      vitalSigns: {
        bloodPressure: "120/80 mmHg",
        heartRate: "72 bpm",
        temperature: "37.2°C",
        oxygenSaturation: "98%",
        respiratoryRate: "16/min"
      },
      labResults: {
        bloodSugar: {
          fasting: "95 mg/dL",
          postPrandial: "120 mg/dL",
          hba1c: "5.7%"
        },
        cholesterol: {
          total: "180 mg/dL",
          hdl: "50 mg/dL",
          ldl: "110 mg/dL",
          triglycerides: "150 mg/dL"
        },
        other: [
          {
            name: "Hemoglobin",
            value: "14.5",
            unit: "g/dL"
          },
          {
            name: "Creatinine",
            value: "0.9",
            unit: "mg/dL"
          }
        ]
      },
      doctorFindings: {
        symptoms: [
          "Persistent cough",
          "Mild fever",
          "Fatigue"
        ],
        diagnosis: "Acute bronchitis",
        notes: "Patient shows signs of upper respiratory infection. Recommend rest and increased fluid intake."
      },
      allergies: {
        medications: ["Penicillin", "Sulfa drugs"],
        food: ["Peanuts"],
        other: "Dust, Pollen"
      },
      prescription: {
        medications: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "Twice daily",
            duration: "7 days",
            instructions: "Take with food"
          },
          {
            name: "Cough Syrup",
            dosage: "10ml",
            frequency: "Three times daily",
            duration: "5 days",
            instructions: "Take after meals"
          }
        ]
      },
      testReports: [
        {
          name: "Complete Blood Count",
          date: "2024-02-01",
          result: "Normal",
          normalRange: "WBC: 4.5-11.0 × 10⁹/L",
          notes: "All parameters within normal range",
          files: [
            {
              id: "1",
              name: "CBC_Report.pdf",
              url: "/sample-reports/cbc.pdf",
              type: "pdf",
              uploadedAt: "2024-02-01T10:30:00Z"
            }
          ]
        },
        {
          name: "Chest X-Ray",
          date: "2024-02-01",
          result: "Clear",
          notes: "No significant findings",
          files: [
            {
              id: "2",
              name: "Chest_XRay_Front.jpg",
              url: "/sample-xray.jpg",
              type: "image",
              uploadedAt: "2024-02-01T11:15:00Z"
            },
            {
              id: "3",
              name: "Chest_XRay_Side.jpg",
              url: "/sample-xray-side.jpg",
              type: "image",
              uploadedAt: "2024-02-01T11:15:00Z"
            }
          ]
        }
      ]
    }
  },
  {
    id: '2',
    patientId: 'P002',
    patientName: 'Bob Smith',
    time: '10:30 AM',
    reason: 'Follow-up',
    status: 'upcoming'
  },
  {
    id: '3',
    patientId: 'P003',
    patientName: 'Carol White',
    time: '11:45 AM',
    reason: 'Consultation',
    status: 'upcoming'
  },
  {
    id: '2024-03-15',
    patientId: 'P001',
    patientName: 'Alice Johnson',
    time: '09:00 AM',
    reason: 'Regular Checkup',
    status: 'completed',
    visitDetails: {
      vitalSigns: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '37.2°C',
        oxygenSaturation: '98%',
        respiratoryRate: '16/min'
      },
      labResults: {
        bloodSugar: {
          fasting: '95 mg/dL',
          postPrandial: '120 mg/dL',
          hba1c: '5.6%'
        },
        cholesterol: {
          total: '180 mg/dL',
          hdl: '50 mg/dL',
          ldl: '110 mg/dL',
          triglycerides: '150 mg/dL'
        }
      },
      doctorFindings: {
        symptoms: ['Mild headache', 'Occasional fatigue'],
        diagnosis: 'Stress-related symptoms',
        notes: 'Patient shows signs of work-related stress. Recommended lifestyle modifications.'
      },
      allergies: {
        medications: ['Penicillin'],
        food: ['Peanuts', 'Shellfish'],
        other: 'Dust, Pollen'
      },
      prescription: {
        medications: [
          {
            name: 'Vitamin D3',
            dosage: '1000 IU',
            frequency: 'Once daily',
            duration: '3 months',
            instructions: 'Take with meals'
          },
          {
            name: 'Magnesium',
            dosage: '400mg',
            frequency: 'Once daily',
            duration: '1 month',
            instructions: 'Take before bedtime'
          }
        ]
      }
    }
  }
];

export interface Visit {
  date: string;
  diagnosis: string;
  prescription: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  medicalHistory: string;
  visits: Visit[];
}

export const DEMO_PATIENTS: PatientRecord[] = [
  {
    id: 'P001',
    name: "Alice Johnson",
    age: 35,
    gender: "Female",
    contact: "+1 234-567-8901",
    medicalHistory: "Asthma, Seasonal Allergies",
    visits: [
      {
        date: "2024-03-15",
        diagnosis: "Acute bronchitis",
        prescription: "Amoxicillin 500mg\nCough syrup",
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "37.2"
      },
      {
        date: "2024-02-01",
        diagnosis: "Regular checkup",
        prescription: "Ventolin inhaler\nAntihistamines",
        bloodPressure: "118/75",
        heartRate: "70",
        temperature: "36.8"
      }
    ]
  },
  {
    id: 'P002',
    name: "Bob Smith",
    age: 45,
    gender: "Male",
    contact: "+1 234-567-8902",
    medicalHistory: "Diabetes Type 2, Hypertension",
    visits: [
      {
        date: "2024-03-15",
        diagnosis: "Regular checkup",
        prescription: "Metformin 500mg\nAmlodipine 5mg",
        bloodPressure: "130/85",
        heartRate: "75",
        temperature: "36.8"
      }
    ]
  },
  {
    id: 'P003',
    name: "Carol White",
    age: 28,
    gender: "Female",
    contact: "+1 234-567-8903",
    medicalHistory: "None",
    visits: [
      {
        date: "2024-03-15",
        diagnosis: "Migraine",
        prescription: "Sumatriptan 50mg\nIbuprofen 400mg",
        bloodPressure: "115/75",
        heartRate: "68",
        temperature: "36.7"
      }
    ]
  }
]; 