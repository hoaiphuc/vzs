import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { uuidv4 } from "@firebase/util";
function BlogDetail(props) {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [urlList, setUrlList] = useState([])
  const defaultImage = "https://via.placeholder.com/300x300";
  useEffect(() => {
    fetch(`https://secondhandvinhome.herokuapp.com/api/post/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.response)
        setUrlList(data.response.img.url)
      });
  }, [id]);

  console.log("Url List: ", urlList)
  console.log("Post: ", post);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ display: "grid", height: "100%"}}
    >
      <link rel="stylesheet" type="text/css" href="BlogDetail.css" />
      <section className="productt">
        <div className="product__photo">
          <div className="photo-container">
            <div className="photo-main">
              <img src={post.img.url} alt="green apple slice" />
            </div>
            <div className="photo-album">
              <ul>       
                <li><img src={post.img.url} /></li>
                <li><img src={post.img.url} /></li>
                <li><img src={post.img.url} /></li>
                <li><img src={post.img.url} /></li>
                <li><img src={post.img.url} /></li>
                <li><img src={post.img.url} /></li>
              </ul>
              
            </div>
          </div>
        </div>
        <div className="product__info">
          <div className="title">
            <h1>{post.title}</h1>
            {/* <span>COD: 45999</span> */}
          </div>
          <div className="price">
          VNĐ <span>{post.product.price}</span>
          </div>
          <div className="variant">
            <h3>Số tòa</h3>
            <ul><strong>S301</strong></ul>
          </div>
          <div className="description">
            <h3>Thông tin chi tiết</h3>
            <ul>
              <li>{post.description}</li>
              
            </ul>
          </div>
          <button className="buy--btn">Quan tâm</button>
          <button className="contact--btn">Liên hệ</button>
        </div>
      </section>
    </div>
  );
}

export default BlogDetail;
