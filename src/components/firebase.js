import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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


