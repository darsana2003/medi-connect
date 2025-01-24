'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
  UserCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, role: string) => Promise<void>;
  signUp: (email: string, password: string, userData: DocumentData, role: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  getUserData: () => Promise<DocumentData | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string, role: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists() || userDoc.data().role !== role) {
        await signOut(auth);
        throw new Error('Invalid role or user not found');
      }
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: DocumentData, role: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...userData,
        role,
        email,
        createdAt: new Date().toISOString()
      });
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const getUserData = async () => {
    if (!user) return null;
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    return userDoc.data() || null;
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    getUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 