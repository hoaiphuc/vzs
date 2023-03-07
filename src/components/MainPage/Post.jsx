import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { category } from "../../formSource";
import "./post.css";
import  Select  from "react-select";
import { Button, Card, Container, Row, Col } from "reactstrap";
const Post = ({ inputs, title ,cates }) => {
  const [file, setFile] = useState([]);
  const [SelectedOption, setSelectedOption] = useState();

  // const category = [
  //   {
  //     value : "jack" ,s
  //     label :"Jack"
  //   },
  //   {
  //     value : "john" ,
  //     label :"john"
  //   },
  //   {
  //     value : "mike" ,
  //     label :"mike"
  //   },
  // ]
  // const handleChage =(selectOption ) =>{
  //   console.log("handleChage",selectOption)
  // }
  
  // const options = cates.options;

  const optionList = cates.map((option) =>(
  <option key={option.id} value={option.value}>{option.label} </option>
  )
);

const handleSelectChange = (event) => {
  setSelectedOption(event.target.value);
}


const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 6) {
    alert("You just can select 6 images.");
  } else {
    setFile(files);
  }
};


  return (
    <div class="max-w-[1200px] mx-auto my-16 p-4">
    <div className="post">
      <div className="Container">
      {/* <Container> */}

        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } */}
              
              { file.length > 0 ? ( 
              Array.from(file).slice(0, 6).map((f) => (
                <img key={f.name} src={URL.createObjectURL(f)} alt="" />
              ))) : (
                <img
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt=""
                />
              )
            
            }
              {/* alt="" */}
            {/* /> */}
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  // onChange={(e) => setFile(e.target.files)}
                  onChange={handleFileChange }
                  style={{ display: "none" }}
                  multiple
                />
              </div>

              
              
              <div  className="selectCate">
               <select value ={SelectedOption} onChange ={handleSelectChange}>
               {optionList}

                {/* {
                cates.map((cate) =>(
            <div key={cate.id}>
              <option > {cate.catePro} </option> */}

                {/* <option>Shirts</option>
                <option>Jacket</option>
                <option>Sweater</option>
                <option>Khaki Pants</option>
                <option>Wool pants</option>
                <option>Cargo Pants</option>
                <option>Jeans</option>
                <option>Blazer</option>
                <option>Jumpsuit</option>
                <option>overrall</option>
                <option>Accessories</option> */}
             {/* </div>
              ))
              } */}
              </select>
              </div>




              {inputs.map((input) => (
                <div className={input.name} key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} />
                </div>
              ))}
              <div className= "formInput1">
                  <label>mô tả chi tiết</label>
                  <textarea type = "text" />
                </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
      {/* </Container> */}

    </div>
    </div>
  );

}
export default Post;