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
      <div class="formbold-main-wrapper">
          <Grid container spacing={3}>
            {posts.length > 0 ?
              posts.filter((post) => post.userId === user?.id).map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              )) : <h1>Bạn chưa có bài đăng nào gần đây</h1>}
          </Grid>
      </div>
    </>
  );
};

export default MyPost;
