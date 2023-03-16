import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { fetchCategories } from "../../common/feartures/categorySlice";
import {
  fetchAllPosts,
  selectAllPosts,
} from "../../common/feartures/postSlice";

const MyPost = () => {
  const [listPost, setListPost] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const list = [];
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  console.log("HIHI", posts);
  console.log("User: ", user);
  posts.map((post) => {
    if (post.userId === user.id) {
      list.push(post);
    }
  });

  console.log("Bài đăng: ", list);
  return (
    <>
    <Container>
      {list.map((post) => (
       
        <div>{post.title}</div>
      ))}
    </Container>
      
    </>
  );
};

export default MyPost;
