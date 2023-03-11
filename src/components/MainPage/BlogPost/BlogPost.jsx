import React, { useEffect } from 'react';
// import './BlogPost.css';
import GetPost from '../../../common/axios/getPostsAxios';
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactPaginate from 'react-paginate';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, selectAllPosts } from '../../../common/feartures/postSlice';
const defaultImage = "https://via.placeholder.com/300x300";


const BlogPost = () => {
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

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);
  const handlePageClick = (posts) => {
    console.log(posts.selected);
  }
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {posts && posts.map(post => (
          <Grid item xs={12} sm={6} md={3} key={posts.indexOf(post)}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.title.length < 20? post.title:  post.title.slice(0, 21) + "..."}
                subheader="March 11, 2023"
              />
              <CardMedia
                component="img"
                style={{ height: 300 }}
                image={post.img.url || defaultImage}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.description < 20? post.description: post.description.slice(0, 32) + "..."}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton aria-label="buy" href={`/blogdetail/${post.id}`} id={post.id}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </IconButton>
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

    </ Container>
  );
}

export default BlogPost;