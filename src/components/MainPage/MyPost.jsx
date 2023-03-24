import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../common/feartures/categorySlice";
import BlogPostCard from "./BlogPostCard";
import AddIcon from '@mui/icons-material/Add';
import Iconify from "../iconify/Iconify";

import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

import {
  fetchAllPosts,
  fetchPostByUserId,
  removePost,
  selectAllPosts,
  updatePostSold,
} from "../../common/feartures/postSlice";
import { currentuser } from "../../common/feartures/authSlice";
import { color } from "@mui/system";
import { fetchBuildings } from "../../common/feartures/buildingSlice";

const MyPost = () => {
  const [listPost, setListPost] = useState([]);
  const [open, setOpen] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const mypost =  JSON.parse(localStorage.getItem("MyPost"));
  console.log("currentUser: ", user?.id);
  const list = [];
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const [deletePostId, setDeletePostId] = useState()
  const myposts = posts.filter((post) => post.userId === user?.id);
  console.log("mypost", myposts)
  function formatCurrency(amount) {
    const amu = parseInt(amount);
    const formattedAmount = amu.toLocaleString("en-US", {
      style: "currency",
      currency: "VND",
    });
    return formattedAmount;
  }
  const handleOpenMenu = (event, id) => {
    setDeletePostId(id)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchPostByUserId(user?.id));
    dispatch(fetchCategories());
    dispatch(fetchBuildings());
  }, [dispatch]);
  const handleDelete = (event) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa bài đăng");
    if (confirm) {
      dispatch(removePost(deletePostId));
      alert("Xóa bài đăng");
      dispatch(fetchPostByUserId(user?.id));
    }
  };
  const handleUpdateSold = (event) => {
    const confirm = window.confirm("Bạn có muốn cập nhật bài đăng thành đã bán");
    if (confirm) {
      dispatch(updatePostSold(deletePostId, true));
      alert("Cập nhật thành công");
      dispatch(fetchPostByUserId(user?.id));
    }
  }
  useEffect(() => {}, [mypost]);
  return (
    <>
      <div className="container mx-auto my-16 p-5">
        <div class="formbold-main-wrapper">
          {/* <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-zow5z4-MuiGrid-root"> */}

          <Grid container spacing={4}>
            {mypost?.length > 0 ?
              mypost?.map((post, index) => (
                <div className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-700 shadow-md m-2.5">
                  <a
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    href="#"
                  >
                    <img
                      className="peer absolute top-0 right-0 h-full w-full object-cover"
                      src={post.img[0]?.url}
                      alt="product image"
                    />
                    <img
                      className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
                      src={post.img[1]?.url}
                      alt="product image"
                    />
                    <svg
                      className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                      />
                    </svg>
                    <span className="absolute top-0 right-0 m-0 rounded-full px-2">
                      <IconButton
                        size="large"
                        color="info"
                        onClick={(event)=> handleOpenMenu(event, post?.id)}
                      >
                        <Iconify icon={"eva:more-vertical-fill"} />
                      </IconButton>

                      <Popover
                        open={Boolean(open)}
                        anchorEl={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: "top", horizontal: "left" }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        PaperProps={{
                          sx: {
                            p: 1,
                            width: 140,
                            "& .MuiMenuItem-root": {
                              px: 1,
                              typography: "body2",
                              borderRadius: 0.75,
                            },
                          },
                        }}
                      >
                        <MenuItem>
                          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                          Edit
                        </MenuItem>
                        <MenuItem sx={{ color: "error.main" }}>
                           <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                          <button
                            onClick={(event) => handleUpdateSold(event)}
                            // class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                          >
                            Đã bán
                          </button>
                        </MenuItem>
                        <MenuItem sx={{ color: "error.main" }}>
                           <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                          <button
                            onClick={(event) => handleDelete(event)}
                            // class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                          >
                            Delete
                          </button>
                        </MenuItem>
                      </Popover>
                    </span>
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      39% OFF
                    </span>
                  </a>
                  <div className="mt-4 px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl tracking-tight text-white">
                        {post.title}
                      </h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-3xl font-bold text-white">
                          {formatCurrency(post?.product[0]?.price).replace(
                            /,/g,
                            "."
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )) : (<h1>Bạn chưa có bài đăng nào gần đây</h1>)}
              <div style={{width:"100px"}}><a href="/post"><AddIcon ></AddIcon></a></div>
          </Grid>

          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default MyPost;
