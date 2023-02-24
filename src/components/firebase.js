import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyDE9PJl3jNGQEbfFrezEzr7uzLUBVSV_pA",
  authDomain: "sell-everything-84f04.firebaseapp.com",
  projectId: "sell-everything-84f04",
  storageBucket: "sell-everything-84f04.appspot.com",
  messagingSenderId: "335132757429",
  appId: "1:335132757429:web:7756433dadfa28dd49ddfc",
  measurementId: "G-4YX4VHLBCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
export const messaging = getMessaging(app);
export const provider = new GoogleAuthProvider();

// Custom hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, `images/${v4()}`);

  setLoading(true)

  const snapshot = await uploadBytes(fileRef, file)
  const photoURL = await getDownloadURL(fileRef)

  updateProfile(currentUser, {photoURL})

  setLoading(false)
  
  alert('Uploaded file! ')

  window.location.reload(false);

}