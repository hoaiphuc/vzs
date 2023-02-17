import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UploadFileImage from "./pages/UploadFileImage";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BNTALMFSEnntyqNa3qXeds6oBv_hFWbvv09RBZkPn6S2vpqzwauVOkdd51sjnEoc6vBzOBcmqz_7Dv80SJ7iEoI"
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">
        Firebase
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/uploadfileimage' element={<UploadFileImage />} />
          <Route path='/account' element={<ProtectedRoutes><Account /> </ProtectedRoutes>} />
          {/* <Route path='*' element={<ProtectedRoutes><Account /> </ProtectedRoutes>} /> */}
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App;
