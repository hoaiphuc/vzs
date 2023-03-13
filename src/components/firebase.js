import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyBsBwRW5o-iUjokOv_lJ970jLsPkiBwB6M",
  authDomain: "secondhandvh-44c3e.firebaseapp.com",
  projectId: "secondhandvh-44c3e",
  storageBucket: "secondhandvh-44c3e.appspot.com",
  messagingSenderId: "798402416096",
  appId: "1:798402416096:web:28167507165a50b17bef85",
  measurementId: "G-6EC489LJ21"
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


export async function uploadImgPost(files, setLoading, setPhotoURL, setIsCreated) {
  setLoading(true);
  const urls = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileRef = ref(storage, `images/${v4()}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      console.log("second: ", url);
      urls.push(url);
    }
    console.log("first url", urls);
    const urlList = urls.map((url) => ({ url }));
    console.log("urlList", urlList);
    // Update user's urlImageList with the uploaded image URLs
    if (urlList.length > 0) {
      setLoading(false);
      setPhotoURL(urlList);
      setIsCreated(true);
      alert("Uploaded files!");
      return true;
    }
  } catch (error) {
    console.error(error);
    setLoading(false);
    setIsCreated(false);
    alert("Failed to upload files");
    return false;
  }
}