import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.trim() && !value.includes("your-")
);

const app = isFirebaseConfigured
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null;

export const firebaseAuth = app ? getAuth(app) : null;

const providers = {
  google: new GoogleAuthProvider(),
};

providers.google.setCustomParameters({ prompt: "select_account" });

export async function signInWithFirebase(providerName) {
  if (!firebaseAuth) {
    throw new Error("Firebase is not configured. Add the VITE_FIREBASE_* values to your .env file.");
  }
  return signInWithPopup(firebaseAuth, providers[providerName]);
}

export function watchFirebaseUser(callback) {
  if (!firebaseAuth) return () => {};
  return onAuthStateChanged(firebaseAuth, callback);
}

export function signOutFirebase() {
  return firebaseAuth ? signOut(firebaseAuth) : Promise.resolve();
}
