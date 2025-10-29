// Firebase initialization and auth helpers
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

// NOTE: You provided these values in the request. Keep them secure in env
// variables for production. This file uses the values directly for local
// development to make it easy to try the flows.
const firebaseConfig = {
  apiKey: "AIzaSyDptAnDuEg5pZtgyRUUVxYRELi39vfJggY",
  authDomain: "vit-26885.firebaseapp.com",
  projectId: "vit-26885",
  storageBucket: "vit-26885.firebasestorage.app",
  messagingSenderId: "241016663577",
  appId: "1:241016663577:web:2aadcb942632c8ec2f4488",
  measurementId: "G-80ETXDGB0G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export type User = FirebaseUser | null;

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: any) {
    // If popup-based sign-in fails (popup blocked, COOP/COEP issues), fall back
    // to redirect flow which avoids opening a new window.
    console.warn('Popup sign-in failed, falling back to redirect:', err);
    try {
      await signInWithRedirect(auth, googleProvider);
      // The redirect will navigate away; return null for now. App should
      // handle the redirect result via getRedirectResult or onAuthChange.
      return null;
    } catch (err2: any) {
      console.error('Redirect sign-in also failed:', err2);
      throw err2;
    }
  }
};

export const getGoogleRedirectResult = async (): Promise<User> => {
  try {
    const res = await getRedirectResult(auth);
    return res?.user ?? null;
  } catch (err) {
    console.warn('No redirect result or failed to obtain it:', err);
    return null;
  }
};

export const signUpWithEmail = async (email: string, password: string): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signOut = async () => {
  return firebaseSignOut(auth);
};

export const onAuthChange = (cb: (u: User) => void) => {
  return onAuthStateChanged(auth, cb);
};

export { auth };
