import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey : "AIzaSyAVNIh-RA2rgMZh3zGvQsO2DIepWfVIGJ8" , 
  authDomain : "supfamof-c8c84.firebaseapp.com" , 
  projectId : "supfamof-c8c84" , 
  storageBucket : "supfamof-c8c84.appspot.com" , 
  messagingSenderId : "799879175588" , 
  appId : "1:799879175588:web:26e0facc264f8bd6caf531" , 
  measurementId : "G-LLT7X3RFYH" 
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
  
  window.location.reload(false);

}


export async function uploadImgPost(files, setLoading, setPhotoURL, setIsCreated) {
  setLoading(true);
  const urls = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileRef = ref(storage, `images/${v4()}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    }
    const urlList = urls.map((url) => ({ url }));
    // Update user's urlImageList with the uploaded image URLs
    if (urlList.length > 0) {
      setLoading(false);
      setPhotoURL(urlList);
      setIsCreated(true);
      return true;
    }
  } catch (error) {
    console.error(error);
    setLoading(false);
    setIsCreated(false);
    return false;
  }
}