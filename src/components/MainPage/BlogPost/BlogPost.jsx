import React, { useEffect, useState } from "react";
// import './BlogPost.css';
import GetPost from "../../../common/axios/getPostsAxios";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactPaginate from "react-paginate";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPosts,
  selectAllPosts,
} from "../../../common/feartures/postSlice";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { fetchCategories } from "../../../common/feartures/categorySlice";
const defaultImage = "https://via.placeholder.com/300x300";

const BlogPost = (props) => {
  // const [posts] = GetPost();
  // return (
  //   <>
  //       {posts.map(post => (
  //         <div className="blog-post" key={post.id}>
  //           <img src={post.img} alt={post.title} />
  //           <div className="blog-post-content">
  //             <h2>{post.title}</h2>
  //             <p className="blog-post-details">Price: {post.price} | Posted on {post.date} by {post.author}</p>
  //             <p>{post.content}</p>
  //           </div>
  //         </div>
  //       ))}
  //   </>
  // );
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const handleFavoriteClick = (productId) => {
    const updatedFavorites = [...favoriteProducts];
    const index = updatedFavorites.indexOf(productId);
    if (index > -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(productId);
    }
    setFavoriteProducts(updatedFavorites);
  };
  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  const handlePageClick = (posts) => {
    console.log(posts.selected);
  };

  console.log("Posts: ", posts);
  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {posts &&
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={3} key={posts.indexOf(post)}>
              <Card className="card-item" sx={{ maxWidth: 345 }}>
                <CardHeader
                  style={{
                    background: "linear-gradient(to right, #b1fc03, #78eb46)",
                  }}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-anime-1.jpg?ssl=1" />
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings" children="Add to cart">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    post.title.length < 15
                      ? post.title
                      : post.title.slice(0, 15) + "..."
                  }
                  titleTypographyProps={{ style: { fontWeight: "bold" } }}
                  subheader="Ngày đăng: 11/03/2023"
                  subheaderTypographyProps={{ style: { color: "#f78411" } }}
                />

                <Link to={`/blogdetail/${post.id}`}>
                  <CardMedia
                    component="img"
                    style={{ height: 200, margin: 0 }}
                    image={post.img[0]?.url || defaultImage}
                    alt="Paella dish"
                  />
                </Link>

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.description < 32
                      ? post.description
                      : post.description.slice(0, 32) + "..."}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    onClick={() => handleFavoriteClick(post.id)}
                    aria-label="add to favorites"
                  >
                    {favoriteProducts.includes(post.id) ? (
                      <FavoriteIcon style={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    aria-label="buy"
                    href={`/blogdetail/${post.id}`}
                    id={post.id}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                  </IconButton>
                  <button className="care--btn">Quan tâm</button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* <div>

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={25}
          marginPagesDisplayed={4}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
        />
      </div> */}
    </Container>
  );
};

export default BlogPost;
