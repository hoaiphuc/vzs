import React from "react"
import BlogPost from "../components/MainPage/BlogPost/BlogPost"
import { Category } from "../components/MainPage/category/Category"
import cliffImg from '../assets/img/cliff_1.jpg';
import cliff2Img from '../assets/img/cliff_2.jpg';
import SwiperSlider from "../components/MainPage/SwiperSlider.tsx";

const Pages = () => {
  return (
    <>

      <MainPageSlider />
      <Category />
      <BlogPost />
    </>
  )
}
function MainPageSlider() {
  const slides = [
    {
			'img': 'https://thuelens.com/wp-content/uploads/2020/08/iStock-517188688.jpg',
			'link': '',
			'caption': 'Three things cannot be long hidden: The Sun, The Moon, and The Truth.',
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
export default Pages
