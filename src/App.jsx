import React, { useEffect, useState } from "react"
import "./App.css"
import "./styles/styles.scss";
import "./components/MainPage/BlogPost/BlogPost.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Footer from "./common/footer/Footer"
import Sdata from "./components/MainPage/Sdata"
import SignIn from "./components/MainPage/SignIn"
import SignUp from "./components/MainPage/SignUp"
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
// import myPost from './components/MainPage/postScript'
import Post from "./components/MainPage/Post"
import BlogDetail from "./components/MainPage/BlogPost/BlogDetail"
import { inputPost, category, cates ,place } from "./formSource";
//admin import
import PostList from "./components/MainPage/admin/post"
import MyPost from "./components/MainPage/MyPost"

function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BFkq5Vuf3DyKL-Of4gfuy-Q0H2QvjoNVFvrRiGtU-8oZDtdC5XGAoVClzQA8DcUuvxJJ_mrVsB5r-3ElSIA-VRw"
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
            <Route path='/blogdetail/:id' element={<BlogDetail />} />
            <Route path='/uploadfileimage' element={<UploadFileImage />} />
            <Route path='/post' element={<ProtectedRoutes><Post inputs={inputPost} title="Post New Product" cates={cates}/></ProtectedRoutes>}/>
            <Route path='/mypost' element={<MyPost />} />
            <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path='/admin' element={<UserTable />} />
            <Route path='/admin/post' element={<PostList />} />
            <Route path='/account' element={<ProtectedRoutes><Account /> </ProtectedRoutes>} />
            <Route path='*' element={<Page404 />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContextProvider>
      {/* <myPost/> */}
    </>
  )
}

export default App
