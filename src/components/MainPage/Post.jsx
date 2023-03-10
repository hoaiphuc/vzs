import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { category } from "../../formSource";
import "./post.css";
import Select from "react-select";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { addNewPost } from '../../common/feartures/postSlice';
import { uploadImgPost, useAuth } from "../firebase";

const Post = ({ inputs, title, cates }) => {

  const [file, setFile] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");

  const [titleInput, setTitleInput] = useState("");
  const [address, setAddress] = useState("");
  const [imageDemo, setImageDemo] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false)
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState([]);

  const currentUser = useAuth();

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
    setFile(files);
    console.log("files", files)
    setImageDemo(files);
    console.log("files: ", files);
    const filesList = [];
    if (files.length > 6) {
      alert("You can select up to 6 images.");
    }
  };

  const postdemo = {
    title: "Test Product111",
    description: "This is a test product111",
    userId: "Hieunmt",
    productName: "Sex toy",
    price: "ssssssss",
    categoryId: "123131313",
    imgIds: [
      {
        url: photoURL
      }
    ]
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("url file:", file);
    uploadImgPost(file, currentUser, setLoading);
    console.log("currentUser.urlImageList", currentUser.urlImageList)
    setPhotoURL(currentUser.urlImageList)
  };
  useEffect(() => {
    const data = {
      imgIds: photoURL,
      categoryId: "1",
      description: description,
      productName: productName,
      userId: "dsadsadasdsadasd",
      price: price,
      title: titleInput
    }
    console.log("data", data)
    console.log("đuyuyduy:", photoURL);
    dispatch(addNewPost(data));
  }, [currentUser])

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
      case "productName":
        setProductName(value);
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
                    <img key={f.name} src={URL.createObjectURL(f)} alt="" />
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
                  <label>Mô tả sản phẩm</label>
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
