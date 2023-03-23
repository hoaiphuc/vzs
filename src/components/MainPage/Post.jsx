import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./post.css";
import { addNewPost } from "../../common/feartures/postSlice";
import { uploadImgPost, useAuth } from "../firebase";
import { place } from "../../formSource";
import { selectAllCategory } from "../../common/feartures/categorySlice";
import { Alert, Snackbar } from "@mui/material";
import { showLoading } from "../../utils/helpers";
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';


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
  const [errorInput, setErrorInput] = useState('');
  const [isOpenCreateCategoryPopup, setIsOpenCreateCategoryPopup] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

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
    const validAddressPattern = /^S\d{2,}$/; // pattern for S followed by at least two digits
    const isAddressValid = validAddressPattern.test(address);
    console.log("isAddressValid")
    if (!isAddressValid) {
      setErrorInput('Address should be S___(S123)');
      setIsCreated(false);
      console.log("'Address should be S___(S123)'")
    } else {
      showLoading(true)
      const isCreated = await uploadImgPost(
        file,
        setLoading,
        setPhotoURL,
        setIsCreated
      );
      setIsCreated(isCreated);
      setErrorInput('');
    }

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
        title: titleInput
      };
      dispatch(addNewPost(data)).then((result) => {
        if (result) {
          setIsCreated(false);
          setErrorInput('');
          setIsOpenSnackbar(true);
          showLoading(false)
        }
      });
    }
  }, [isCreated]);
  const inputValues = {
    price: price,
    title: titleInput,
    address: address,
  };

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

  const handleClose = () => {
    setIsOpenSnackbar(false);
  }
  return (
    <div class="formbold-main-wrapper">
      <div className="formbold-div-wrapper">
        <div class="formbold-form-wrapper">
          <form onSubmit={handleFormSubmit}>
            <div class="formbold-steps">THÊM BÀI ĐĂNG MỚI</div>
            <div class="formbold-form-step">
              <h1 style={{ color: "red" }}>{errorInput}</h1>
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
                    required
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
                    required
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
                    type="number"
                    value={price}
                    name="price"
                    required
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
                  required
                  placeholder="Mã tòa ...."
                  class="formbold-form-input"
                  onChange={handleInputAddress}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="file">
                Chọn ảnh: <AddPhotoAlternateSharpIcon fontSize="large" />
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
                  required
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
            <div style={{textAlign:"center"}}>
              <button className="post--btn" disabled={loading} type="submit">
                SAVE
              </button>
            </div>

          </form>
          <Snackbar open={isOpenSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};
export default Post;
