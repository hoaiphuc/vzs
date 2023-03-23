import React, { useEffect, useState } from "react"
import BlogPost from "../components/MainPage/BlogPost/BlogPost"
import Pagination from "../components/MainPage/BlogPost/Pagination";
import { Category } from "../components/MainPage/category/Category"
import cliffImg from '../assets/img/cliff_1.jpg';
import cliff2Img from '../assets/img/cliff_2.jpg';
import SwiperSlider from "../components/MainPage/SwiperSlider.tsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, selectAllPosts } from "../common/feartures/postSlice";
import { fetchCategories } from "../common/feartures/categorySlice";
import 'bootstrap/dist/css/bootstrap.min.css';

const Pages = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(2)

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Get current page
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost =  indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>

      <MainPageSlider />
      <Category />
      <BlogPost posts={currentPost} />
      <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
    </>
  )
}
function MainPageSlider() {
  const slides = [
    {
			'img': 'https://thuelens.com/wp-content/uploads/2020/08/iStock-517188688.jpg',
			'link': '',
			'caption': 'Bạn có thể đăng bán SEX TOY cùng DUY NGUYỄN tại VINSEHAND',
			'captionPosition': 'center',
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.40
		}
  ];

  return (
    <div className='container' style={{marginTop:"30px"}}>
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
