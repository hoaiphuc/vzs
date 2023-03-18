import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../common/feartures/categorySlice";
import BlogPostCard from "./BlogPostCard"
import {
  fetchAllPosts,
  selectAllPosts,
} from "../../common/feartures/postSlice";
import { currentuser } from "../../common/feartures/authSlice";
import { color } from "@mui/system";

const MyPost = () => {
  const [listPost, setListPost] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))
  console.log("currentUser: ", user?.id)
  const list = [];
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      {/* <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Helmet>
        <title> Dashboard: Blog | VZS </title>
      </Helmet> */}
      {/* <div class="formbold-main-wrapper">
          <Grid container spacing={3}>
            {posts.length > 0 ?
              posts.filter((post) => post.userId === user?.id).map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              )) : <h1>Bạn chưa có bài đăng nào gần đây</h1>}
          </Grid>
      </div> */}

<div className="container mx-auto my-16 p-5">

      <div class="formbold-main-wrapper">
      {/* <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-zow5z4-MuiGrid-root"> */}

<Grid container spacing={3}>
            {posts.length > 0 ?
              posts.filter((post) => post.userId === user?.id).map((post, index) => (
  <div class="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-700 shadow-md m-2.5" > 
    <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
      <img class="peer absolute top-0 right-0 h-full w-full object-cover" src={ post.img[0]?.url} alt="product image" />
      <img class="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
      <svg class="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
       <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> 
    </a>
    <div class="mt-4 px-5 pb-5">
      <a href="#">
        <h5 class="text-xl tracking-tight text-white">{post.title}</h5>
      </a>
      <div class="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span class="text-3xl font-bold text-white">$499</span>
          <span class="text-sm text-white line-through">$699</span>
        </p>
      </div>
      <a href="#" class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Delete</a>
    </div>
  </div>
  )) : <h1>Bạn chưa có bài đăng nào gần đây</h1>}
            </Grid>

{/* </div> */}
</div>
</div>
    </>
  );
};

export default MyPost;
