// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";
// import { category } from "../../formSource";
// import "./post.css";
// import  Select  from "react-select";
// import { Button, Card, Container, Row, Col } from "reactstrap";
// const Post = ({ inputs, title ,cates }) => {
//   const [file, setFile] = useState([]);
//   const [SelectedOption, setSelectedOption] = useState();

//   // const category = [
//   //   {
//   //     value : "jack" ,s
//   //     label :"Jack"
//   //   },
//   //   {
//   //     value : "john" ,
//   //     label :"john"
//   //   },
//   //   {
//   //     value : "mike" ,
//   //     label :"mike"
//   //   },
//   // ]
//   // const handleChage =(selectOption ) =>{
//   //   console.log("handleChage",selectOption)
//   // }

//   // const options = cates.options;

//   const optionList = cates.map((option) =>(
//   <option key={option.id} value={option.value}>{option.label} </option>
//   )
// );

// const handleSelectChange = (event) => {
//   setSelectedOption(event.target.value);
// }

// const handleFileChange = (event) => {
//   const files = event.target.files;
//   if (files.length > 6) {
//     alert("You just can select 6 images.");
//   } else {
//     setFile(files);
//   }
// };

//   return (
//     <div class="max-w-[1200px] mx-auto my-16 p-4">
//     <div className="post">
//       <div className="Container">
//       {/* <Container> */}

//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             {/* <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               } */}

//               { file.length > 0 ? (
//               Array.from(file).slice(0, 6).map((f) => (
//                 <img key={f.name} src={URL.createObjectURL(f)} alt="" />
//               ))) : (
//                 <img
//                   src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//                   alt=""
//                 />
//               )

//             }
//               {/* alt="" */}
//             {/* /> */}
//           </div>
//           <div className="right">
//             <form>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   // onChange={(e) => setFile(e.target.files)}
//                   onChange={handleFileChange }
//                   style={{ display: "none" }}
//                   multiple
//                 />
//               </div>

//               <div  className="selectCate">
//                <select value ={SelectedOption} onChange ={handleSelectChange}>
//                {optionList}

//                 {/* {
//                 cates.map((cate) =>(
//             <div key={cate.id}>
//               <option > {cate.catePro} </option> */}

//                 {/* <option>Shirts</option>
//                 <option>Jacket</option>
//                 <option>Sweater</option>
//                 <option>Khaki Pants</option>
//                 <option>Wool pants</option>
//                 <option>Cargo Pants</option>
//                 <option>Jeans</option>
//                 <option>Blazer</option>
//                 <option>Jumpsuit</option>
//                 <option>overrall</option>
//                 <option>Accessories</option> */}
//              {/* </div>
//               ))
//               } */}
//               </select>
//               </div>

//               {inputs.map((input) => (
//                 <div className={input.name} key={input.id}>
//                   <label>{input.label}</label>
//                   <input type={input.type} />
//                 </div>
//               ))}
//               <div className= "formInput1">
//                   <label>detailed description</label>
//                   <textarea type = "text" />
//                 </div>
//               <button type="submit">Post</button>
//             </form>
//           </div>
//         </div>
//       </div>
//       {/* </Container> */}

//     </div>
//     </div>
//   );

// }
// export default Post;

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { category } from "../../formSource";
import "./post.css";
import Select from "react-select";
import { Button, Card, Container, Row, Col } from "reactstrap";

const Post = ({ inputs, title, cates }) => {
  const [file, setFile] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [address, setAddress] = useState("");
  const [imageDemo, setImageDemo] = useState([]);

  const optionList = cates.map((option) => (
    <option key={option.id} value={option.value}>
      {option.label}{" "}
    </option>
  ));

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log("files", files)
    setImageDemo(files);
    console.log("files: ", files);
    const filesList = [];
    if (files.length > 6) {
      alert("You can select up to 6 images.");
    } else {
      for (var i = 0; i < files.length; i++) {
        // filesList.push({ url: files[i] });
        filesList.push({ url: URL.createObjectURL(files[i]) });
      }
      setFile(filesList);
      console.log("fileListaa: ", filesList);

    }
  };

  // const handleProductdataChange = (event) => {
  //   setProductdata(event.target.value);
  // };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // const handlePriceChange = (event) => {
  //   setPrice(event.target.value);
  // };

  // const handleTitleInputChange = (event) => {
  //   setTitleInput(event.target.value);
  // };

  // const handleAddressChange = (event) => {
  //   setAddress(event.target.value);
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("imgIds", file);
    formData.append("categoryId", selectedOption);
    formData.append("description", description);
    formData.append("userId", "Hieu");
    formData.append("price", price);
    formData.append("title", titleInput);
    // fetch("https://secondhandvinhome.herokuapp.com/doc/#/Post/addPost", {
    fetch("https://secondhandvinhome.herokuapp.com/api/post/createpost", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Post submitted successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to submit post.");
      });
  };

  const inputValues = {
    price: price,
    title: titleInput,
    address: address,
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "price":
        setPrice(value);
        break;
      case "title":
        setTitleInput(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  return (
    <div class="max-w-[1200px] mx-auto my-16 p-4">
      <div className="post">
        <div className="Container">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              {imageDemo.length > 0 ? (
                Array.from(imageDemo)
                  .slice(0, 6)
                  .map((f) => (
                    <img key={f.name} src={ URL.createObjectURL(f)} alt="" />
                  ))
              ) : (
                <img
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt=""
                />
              )}
            </div>
            <div className="right">
              <form onSubmit={handleFormSubmit}>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    multiple
                  />
                </div>

                <div className="selectCate">
                  <select value={selectedOption} onChange={handleSelectChange}>
                    {optionList}
                  </select>
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      name={input.name}
                      type={input.type}
                      value={inputValues[input.name]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
                <div className="formInput1">
                  <label>detailed description</label>
                  <textarea
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <button type="submit">Post</button>
              </form>
            </div>
          </div>
        </div>
        {/* </Container> */}
      </div>
    </div>
  );
};
export default Post;
