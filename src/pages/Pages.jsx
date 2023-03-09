import React from "react"
import BlogPost from "../components/MainPage/BlogPost/BlogPost"
import Home from "../components/MainPage/Home"
const Pages = ({ productItems, shopItems, postItems }) => {
  return (
    <>
      <Home />
      <BlogPost posts={postItems}/>

    </>
  )
}

export default Pages
