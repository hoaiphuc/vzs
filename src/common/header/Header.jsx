import React from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"
import HeaderClient from "../navbar/HeaderClient"

const Header = () => {
  return (
    <>
      {/* <Search />
      <Navbar /> */}
      <HeaderClient />
    </>
  )
}

export default Header
