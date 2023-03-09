import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
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
import AdminManagePost from "./components/MainPage/admin/post"
import { messaging } from "./components/firebase";
import { getToken } from "firebase/messaging";
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from "./components/MainPage/Post"
import { inputPost, category, cates } from "./formSource";
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
  const { shopItems } = Sdata

  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  //Step 4 :
  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {

      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)


    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {

      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'https://secondhandvinhome.herokuapp.com/api/post/limit?page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON })

        const { rows } = responseJSON.response;
        setPostList(rows);
      } catch (error) {
        console.log("failed to fetch post list", error.message);
      }
    }
    fetchPostList();
  }, []);

  return (
    <>
      <AuthContextProvider>
        <Router>
          <Header CartItem={CartItem} />
          <Routes>
            <Route path='/' exact element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
            <Route path='/cart' exact element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/uploadfileimage' element={<UploadFileImage />} />
            <Route path='/post' element={<Post inputs={inputPost} title="Post New Product" cates={cates} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/admin' element={<UserTable />} />
            <Route path='/admin/post' element={<AdminManagePost posts={postList} />} />
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
