import React, { use, useEffect, useState } from "react"
import BlogPost from "../components/MainPage/BlogPost/BlogPost"
import Pagination from "../components/MainPage/BlogPost/Pagination";
import { Category } from "../components/MainPage/category/Category"
import SwiperSlider from "../components/MainPage/SwiperSlider.tsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, fetchPostByCategory, selectAllPosts } from "../common/feartures/postSlice";
import { fetchCategories } from "../common/feartures/categorySlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchBuildings, selectAllBuilding } from "../common/feartures/buildingSlice";

const Pages = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [postPerPage, setPostPerPage] = useState(8)

  const [category, setCategory] = useState()

  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);

  const building = useSelector(selectAllBuilding);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchCategories());
    dispatch(fetchBuildings());
  }, [dispatch]);
  console.log("All post: ", posts)
  // Get current page
  const indexOfLastPost = currentPage * postPerPage;

  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  //change category
  const pickCategory = category => setCategory(category);

  useEffect(() => {
    dispatch(fetchPostByCategory(category))
  }, [category])
  return (
    <>
      <MainPageSlider />
      <Category pickCategory={pickCategory} />
      <BlogPost posts={currentPost} category={category} />
      <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
    </>
  )
}
function MainPageSlider() {
  const slides = [
    {
      'img': 'https://thuelens.com/wp-content/uploads/2020/08/iStock-517188688.jpg',
      'link': '',
      'caption': 'Bạn có thể đăng bán tất cả mọi thứ tại VINSEHAND',
      'captionPosition': 'center',
      'useFilling': true,
      'fillingColor': '#000000',
      'fillingOpacity': 0.40
    }
  ];

  return (
    <div className='container' style={{ marginTop: "30px" }}>
      <SwiperSlider
        showPrevNext
        roundCorners
        pagination='progressbar'
        size={'small'}
        slides={slides}
        className={'mb-4'}
      />
    </div>
  );
}
export default Pages;
