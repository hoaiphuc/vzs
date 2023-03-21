import React, { useEffect, useState } from "react";
// import "./BlogPost.css";
import GetPost from "../../../common/axios/getPostsAxios";
import { Card, CardMedia, CardContent, CardActions, Pagination } from "@mui/material";
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
import { Loading, Spacer } from "@nextui-org/react";
import { Stack } from "react-bootstrap";

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
  // const user = JSON.parse(localStorage.getItem('user'))

  if (!posts) {
    return <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', padding: '300px' }}><Loading size="xl" />
      <Spacer /></div>;
  }
  return (
    <div className="">
      <Container maxWidth="" sx={{ marginTop: '50px' }}>
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
                <Card
                  className="card-item"
                  sx={{ maxWidth: 400 }}
                  style={{
                    borderRadius: "20px",
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px',
                    transition: "transform 0.5s ease-in-out",
                  }}
                >
                  <CardHeader
                    style={
                      {
                        // background: "linear-gradient(to right, #b1fc03, #78eb46)",
                      }
                    }
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <img src={post.img[0]?.url || defaultImage} />
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
                    titleTypographyProps={{
                      style: { fontWeight: "bold", fontSize: "20px" },
                    }}
                    subheader="Đã đăng 1 tiếng trước"
                    subheaderTypographyProps={{
                      style: { color: "#a8a8a8", fontStyle: "italic" },
                    }}
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
                    <Typography variant="body2" color="text.secondary" style={{ fontWeight: "Bold", fontSize: "20px" }}>
                      {post.description.length < 25
                        ? post.description
                        : post.description.slice(0, 25) + "..."}
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
        <Stack spacing={2} className="paginationBlog" >

          <Pagination count={10} variant="outlined" color="secondary" />
        </Stack>
      </Container>
    </div>
  );
};

export default BlogPost;
