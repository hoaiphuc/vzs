import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { uuidv4 } from "@firebase/util";
import ZaloPopup from "./ZaloPopup";
import "./BlogDetail.css";
import "./ClickModal";
import { Loading, Spacer } from "@nextui-org/react";
import { CardMedia } from "@mui/material";

function BlogDetail(props) {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [urlList, setUrlList] = useState([]);
  const [currentImage, setCurrentImage] = useState();
  const [phone, setPhone] = useState("0334416510");

  const [modalOpen, setModalOpen] = useState(false);

  // setCurrentImage(post.img[0].url)
  const defaultImage = "https://via.placeholder.com/300x300";
  function formatCurrency(amount) {
    const amu = parseInt(amount);
    const formattedAmount = amu.toLocaleString("en-US", {
      style: "currency",
      currency: "VND",
    });
    return formattedAmount;
  }
  // const handleLinkClick = (props) => {
  //   window.location.href = "https://zalo.me/"+props; // Thay your-link bằng link của bạn
  // };

  const linkZalo = "https://zalo.me/" + phone;
  const handleClick = (image) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    fetch(`https://secondhandvinhome.herokuapp.com/api/post/getbyid/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.response);
        setUrlList(data.response.img);
      });
  }, [id]);

  if (!post) {
    return (
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          padding: "300px",
        }}
      >
        <Loading size="xl" />
        <Spacer />
      </div>
    );
  }

  return (
    <div style={{ height: "100%" }}>
      <link rel="stylesheet" type="text/css" href="BlogDetail.css" />
      <section className="productt">
        <div className="product__photo">
          <div className="photo-container">
            <CardMedia
              id="myImg"
              component="img"
              style={{ height: 500, margin: 0 }}
              image={
                !currentImage ? post.img[0]?.url : currentImage || defaultImage
              }
              alt="Paella dish"
              onClick={() => setModalOpen(true)}
            />

            {modalOpen && (
              <div id="myModal" class="modall">
                <span class="closee" onClick={() => setModalOpen(false)}>
                  &times;
                </span>

                <img
                  class="modall-content"
                  src={
                    !currentImage
                      ? post.img[0]?.url
                      : currentImage || defaultImage
                  }
                />

                <div id="caption"></div>
              </div>
            )}

            <div className="photo-album">
              <ul>
                {post.img.map((img) => (
                  <li>
                    <img onClick={() => handleClick(img?.url)} src={img?.url} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="product__info">
          <div className="title">
            <h1>{post.title}</h1>
            {/* <span>COD: 45999</span> */}
          </div>

          {post.product.map((product) => (
            <div className="price">
              <span>{formatCurrency(product.price).replace(/,/g, ".")}</span>
            </div>
          ))}

          <div className="variant">
            <h3>Số tòa</h3>
            <ul>
              <strong>S302</strong>
            </ul>
          </div>
          <div className="description">
            <h3>Thông tin chi tiết</h3>
            <ul>
              <li>{post.description}</li>
            </ul>
          </div>
          <div className="contact">
            <button className="buy--btn">Quan tâm</button>
            <a href={linkZalo} className="zalo-button">
              <div className="zalo-icon" />
              LH Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogDetail;
