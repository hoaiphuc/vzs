import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
export default app;