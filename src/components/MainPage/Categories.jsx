import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Fashion",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Electronic",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Cars",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Home & Garden",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Gifts",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Music",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Health & Beauty",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Pets",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Baby Toys",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Groceries",
    },
    {
      cateImg: "./images/category/cat11.png",
      cateName: "Books",
    },
  ]

  const options = [
    { label: "👚 Fashion", value: "fashion" },
    { label: "🔌 Electronic", value: "electronic" },
    { label: "🚔 Cars", value: "cars"},
    { label: "🏡 Home & Garden", value: "homeAndGarden" },
    { label: "👩‍❤️‍👩 Health & Beauty", value: "healthAndBeauty" },
    { label: "📚 Books", value: "books"}
  ];
  // const [open, setOpen] = useState(false)

  // return (
  //   <>
  //     <div className='catgrories d_flex'>
  //       <span className='fa-solid fa-border-all'></span>
  //       <h4 onClick={() => setOpen(!open)}>
  //         Categories <i className='fa fa-chevron-down'></i>
  //       </h4>
  //     </div>
  //     {
  //       open && <div className='category mr-40'>
  //         {data.map((value, index) => {
  //           return (
  //             <div className='box f_flex' key={index}>
  //               <img src={value.cateImg} alt='' />
  //               <span>{value.cateName}</span>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     }

  //   </>
  // )
  const [selected, setSelected] = useState([]);

  
  return (
    <>
      {/* <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
      
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        
      />
    </>
  );
}

export default Categories
