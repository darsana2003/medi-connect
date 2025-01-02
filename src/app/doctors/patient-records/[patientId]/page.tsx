'use client'

import { useState } from 'react'

export default function PatientRecord({ params }: { params: { patientId: string } }) {
  const [visitData, setVisitData] = useState({
    symptoms: '',
    diagnosis: '',
    prescription: '',
    notes: '',
    followUpDate: '',
    vitals: ''
  })

  // ... rest of the code remains the same ...
} 