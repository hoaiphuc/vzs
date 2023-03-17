import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { category } from "../../formSource";
import "./post.css";
import Select from "react-select";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { addNewPost } from "../../common/feartures/postSlice";
import { uploadImgPost, useAuth } from "../firebase";
import { place } from "../../formSource";
import { selectAllCategory } from "../../common/feartures/categorySlice";

const Post = ({ inputs, title, cates }) => {
  const [file, setFile] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");

  const [titleInput, setTitleInput] = useState("");
  const [address, setAddress] = useState("");
  const [imageDemo, setImageDemo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isOpenCreateCategoryPopup, setIsOpenCreateCategoryPopup] = useState(false);

  const handleOpenPopup = () => {
    setIsOpenCreateCategoryPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenCreateCategoryPopup(false);
  };
  const [selected, setSelected] = useState({
    places: "",
    state: "",
    block: "",
  });
  const categoryList = useSelector(selectAllCategory);
  const { places, state, block } = selected;

  const handleSelectChangev1 = (event) => {
    const { name, value } = event.target;
    setSelected((prevSelected) => ({ ...prevSelected, [name]: value }));
  };

  const currentPlace = place.find((c) => c.name === places);
  const currentStates = currentPlace?.states || [];
  const currentBlock =
    currentStates.find((s) => s.name === state)?.cities || [];
  const user = JSON.parse(localStorage.getItem("user"));
  const categories = JSON.parse(localStorage.getItem("categories"));
  const optionList = categories.map((option) => (
    <option key={option.id} value={option.id}>
      {option.categoryName}
    </option>
  ));

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFile(files);
    setImageDemo(files);
    if (files.length > 6) {
      alert("You can select up to 6 images.");
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const isCreated = await uploadImgPost(
      file,
      setLoading,
      setPhotoURL,
      setIsCreated
    );
    setIsCreated(isCreated);
    // if (isCreated && photoURL.length > 0) {
    //   const data = {
    //     imgIds: photoURL,
    //     categoryId: selectedOption,
    //     description: description,
    //     productName: productName,
    //     userId: "dsadsadasdsadasd",
    //     price: price,
    //     title: titleInput
    //   }
    //   dispatch(addNewPost(data)).then(result => {
    //     if (result) {
    //       alert("Đã đăng bài thành công, ấn ok để tiếp tục");
    //     }
    //   })
    // }
  };
  useEffect(() => {
    if (isCreated) {
      const data = {
        imgIds: photoURL,
        categoryId: selectedOption,
        description: description,
        productName: productName,
        userId: user.id,
        price: price,
        title: titleInput,
      };
      dispatch(addNewPost(data)).then((result) => {
        if (result) {
          setIsCreated(false);
          alert("Đã đăng bài thành công, ấn ok để tiếp tục");
        }
      });
    }
  }, [isCreated]);
  const inputValues = {
    price: price,
    title: titleInput,
    address: address,
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case "price":
  //       setPrice(value);
  //       break;
  //     case "title":
  //       setTitleInput(value);
  //       break;
  //     case "address":
  //       setAddress(value);
  //       break;
  //     case "productName":
  //       setProductName(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleInputProductName = (event) => {
    setProductName(event.target.value);
  };

  const handleInputTitle = (event) => {
    setTitleInput(event.target.value);
  };

  const handleInputAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleInputPrice = (event) => {
    setPrice(event.target.value);
  };

  // return (
  //   <div className="max-w-[1200px] mx-auto p-4">
  //     <div className="post">
  //       <div className="Container">
  //         <div className="top">
  //           <h1>{title}</h1>
  //         </div>
  //         <div className="bottom">
  //           <div className="left">
  //             <div className="image">
  //               {imageDemo.length > 0 ? (
  //                 Array.from(imageDemo)
  //                   .slice(0, 6)
  //                   .map((f) => (
  //                     <img key={f.name} src={URL.createObjectURL(f)} alt="" />
  //                   ))
  //               ) : (
  //                 <img
  //                   src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  //                   alt=""
  //                 />
  //               )}
  //             </div>
  //           </div>
  //           <div className="right">
  //             <form onSubmit={handleFormSubmit}>
  //               <div className="formInput">
  //                 <label htmlFor="file">
  //                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
  //                 </label>
  //                 <input
  //                   type="file"
  //                   id="file"
  //                   onChange={handleFileChange}
  //                   style={{ display: "none" }}
  //                   multiple
  //                 />
  //               </div>

  //               <div className="selectCate">
  //                 <select value={selectedOption} onChange={handleSelectChange}>
  //                   {optionList}
  //                 </select>
  //               </div>

  //               {inputs.map((input) => (
  //                 <div className="formInput" key={input.id}>
  //                   <label>{input.label}</label>
  //                   <input
  //                     name={input.name}
  //                     type={input.type}
  //                     value={inputValues[input.name]}
  //                     onChange={handleInputChange}
  //                   />
  //                 </div>
  //               ))}
  //               <div className="formplace">
  //                 <div className="formplace1">
  //                   <div className="formplace1">
  //                     <label htmlFor="places">Your place:</label>
  //                     <select
  //                       id="places"
  //                       name="places"
  //                       value={places}
  //                       onChange={handleSelectChangev1}
  //                     >
  //                       <option value="">--Select place--</option>
  //                       {place.map((places, index) => (
  //                         <option key={index} value={places.name}>
  //                           {places.name}
  //                         </option>
  //                       ))}
  //                     </select>
  //                   </div>

  //                   {places && (
  //                     <div className="formplace1">
  //                       <label htmlFor="state">Your State:</label>
  //                       <select
  //                         id="state"
  //                         name="state"
  //                         value={state}
  //                         onChange={handleSelectChangev1}
  //                       >
  //                         <option value="">--Select State--</option>
  //                         {currentPlace.states.map((state, index) => (
  //                           <option key={index} value={state.name}>
  //                             {state.name}
  //                           </option>
  //                         ))}
  //                       </select>

  //                       {state && (
  //                         <div className="formplace1">
  //                           <label htmlFor="block">Your Building :</label>
  //                           <select
  //                             id="block"
  //                             name="block"
  //                             value={block}
  //                             onChange={handleSelectChangev1}
  //                           >
  //                             <option value="">--Select Block--</option>
  //                             {currentBlock.map((block, index) => (
  //                               <option key={index} value={block}>
  //                                 {block}
  //                               </option>
  //                             ))}
  //                           </select>
  //                         </div>
  //                       )}
  //                     </div>
  //                   )}
  //                 </div>
  //               </div>
  //               <div className="formInput1">
  //                 <label>Mô tả sản phẩm</label>
  //                 <textarea
  //                   type="text"
  //                   value={description}
  //                   onChange={handleDescriptionChange}
  //                 />
  //               </div>
  //               <button disabled={loading} type="submit">
  //                 Post
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //       {/* </Container> */}
  //     </div>
  //   </div>
  // );
  return (
    <div class="formbold-main-wrapper">
      <div className="formbold-div-wrapper">
        <div class="formbold-form-wrapper">
          <div class="formbold-steps">THÊM BÀI ĐĂNG MỚI</div>

          <div class="formbold-form-step">
            <div class="formbold-input-flex">
              <div>
                <label for="firstname" class="formbold-form-label">
                  {" "}
                  Tên sản phẩm{" "}
                </label>
                <input
                  type="text"
                  value={productName}
                  name="productName"
                  placeholder="Tên sản phẩm ...."
                  id="productName"
                  class="formbold-form-input"
                  onChange={handleInputProductName}
                />
              </div>
              <div>
                <label for="lastname" class="formbold-form-label">
                  {" "}
                  Tiêu đề sản phẩm{" "}
                </label>
                <input
                  type="text"
                  value={titleInput}
                  name="title"
                  placeholder="Tiêu đề sản phẩm ...."
                  id="title"
                  class="formbold-form-input"
                  onChange={handleInputTitle}
                />
              </div>
            </div>

            <div class="formbold-input-flex">
              <div>
                <label for="dob" class="formbold-form-label">
                  {" "}
                  Giá sản phẩm{" "}
                </label>
                <input
                  type="text"
                  value={price}
                  name="price"
                  placeholder="Giá sản phẩm ...."
                  id="price"
                  class="formbold-form-input"
                  onChange={handleInputPrice}
                />
              </div>
              <div>
                <label for="email" class="formbold-form-label">
                  {" "}
                  Thể loại sản phẩm{" "}
                </label>
                <div className="selectCategories">
                  <select
                    name="sl"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    {optionList}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label for="address" class="formbold-form-label">
                {" "}
                Mã số tòa{" "}
              </label>
              <input
                type="text"
                name="address"
                value={address}
                id="address"
                placeholder="Mã tòa ...."
                class="formbold-form-input"
                onChange={handleInputAddress}
              />
            </div>
          </div>
          {/* <div className="selectCategories">
            <div className="selectCategories">
              <div className="selectCategories">
                <label htmlFor="places" class="formbold-form-label">
                  Your place:
                </label>
                <select
                  id="places"
                  name="places"
                  value={places}
                  onChange={handleSelectChangev1}
                >
                  <option value="" class="formbold-form-label">
                    --Select place--
                  </option>
                  {place.map((places, index) => (
                    <option key={index} value={places.name}>
                      {places.name}
                    </option>
                  ))}
                </select>
              </div>

              {places && (
                <div className="formplace1">
                  <label htmlFor="state" class="formbold-form-label">
                    Your State:
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={state}
                    onChange={handleSelectChangev1}
                  >
                    <option value="">--Select State--</option>
                    {currentPlace.states.map((state, index) => (
                      <option key={index} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>

                  {state && (
                    <div className="formplace1">
                      <label htmlFor="block" class="formbold-form-label">
                        Your Building :
                      </label>
                      <select
                        id="block"
                        name="block"
                        value={block}
                        onChange={handleSelectChangev1}
                      >
                        <option value="">--Select Block--</option>
                        {currentBlock.map((block, index) => (
                          <option key={index} value={block}>
                            {block}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div> */}
          <form onSubmit={handleFormSubmit}>
            <div className="">
              <label htmlFor="file">
                Upload image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple
              />
            </div>

            <div className="" style={{ display: "flex" }}>
              {imageDemo.length > 0 ? (
                Array.from(imageDemo)
                  .slice(0, 6)
                  .map((f) => (
                    <img
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "10px",
                        marginLeft: '0',
                        marginRight: '5px'
                      }}
                      key={f.name}
                      src={URL.createObjectURL(f)}
                      alt=""
                    />
                  ))
              ) : (
                <img
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "10px",
                    marginLeft: '0'
                  }}
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt=""
                />
              )}
            </div>
            <div class="formbold-form-step">
              <div>
                <label for="message" class="formbold-form-label">
                  {" "}
                  Mô tả sản phẩm{" "}
                </label>
                <textarea
                  rows="6"
                  name="description"
                  value={description}
                  id="description"
                  placeholder="Vui lòng nhập mô  tả ............"
                  class="formbold-form-input"
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
            </div>
            <button className="post--btn" disabled={loading} type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Post;
