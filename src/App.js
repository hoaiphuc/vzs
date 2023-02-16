import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">
        Firebase
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/account' element={<ProtectedRoutes><Account /> </ProtectedRoutes>} />
          {/* <Route path='*' element={<ProtectedRoutes><Account /> </ProtectedRoutes>} /> */}
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App;
