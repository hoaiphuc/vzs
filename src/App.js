import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Footer from "./common/footer/Footer"
import Sdata from "./components/MainPage/Sdata"
import SignIn from "../src/components/MainPage/SignIn"
import SignUp from "../src/components/MainPage/SignUp"
import UploadFileImage from "./components/MainPage/ChangeAvatarProfile"
import { AuthContextProvider } from "./context/AuthContext"
import Account from "./components/MainPage/Account"
import ProtectedRoutes from "./components/MainPage/ProtectedRoutes";
import Page404 from "./components/MainPage/404page";
import Profile from "./components/MainPage/Profile"
//admin page
import UserTable from "./components/MainPage/admin/User"
import { messaging } from "./components/firebase";
import { getToken } from "firebase/messaging";
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from "./components/MainPage/Post"
import { inputPost, category, cates } from "./formSource";
//admin import
import PostList from "./components/MainPage/admin/post"

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

  const { productItems } = Data
  const { postItems } = Data

  const { shopItems } = Sdata



  return (
    <>
      <AuthContextProvider>
        <Router>
          <Header  />
          <Routes>
            <Route path='/' exact element={<Pages productItems={productItems} shopItems={shopItems} postItems={postItems}/>} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/uploadfileimage' element={<UploadFileImage />} />
            <Route path='/post' element={<Post inputs={inputPost} title="Post New Product" cates={cates} />} />
            <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path='/admin' element={<UserTable />} />
            <Route path='/admin/post' element={<PostList />} />
            <Route path='/account' element={<ProtectedRoutes><Account /> </ProtectedRoutes>} />
            <Route path='*' element={<Page404 />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContextProvider>
    </>
  )
}

export default App
