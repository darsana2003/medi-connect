import { NextResponse } from 'next/server';
import { auth, db } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { email, password, userType, ...userData } = await request.json();

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, userType, user.uid), {
      email,
      uid: user.uid,
      userType,
      ...userData,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
} 