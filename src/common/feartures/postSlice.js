import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { getAllPosts, createPost, deletePost, getPostByUserId, postSold, updateFavoritePost, getPostByCategory } from '../../common/services/post.service';

export const fetchAllPosts = createAsyncThunk('blog/fetchAllPosts', async () => {
  const response = await getAllPosts();
  return response;
});

export const fetchPostByCategory = createAsyncThunk('blog/fetchPostByCategory', async (categoryId) => {
  const response = await getPostByCategory(categoryId);
  console.log("response getpost by category: ", response)

  return response;
});

export const fetchPostByUserId = createAsyncThunk('blog/fetchPostByUserId', async (userId) => {
  const response = await getPostByUserId(userId);
  return response;
});

export const addNewPost = createAsyncThunk('blog/addNewPost', async (postData) => {
  const response = await createPost(postData);
  return response;
});

export const removePost = createAsyncThunk('blog/deletePost', async (id) => {
  const response = await deletePost(id);
  return response;
});

export const updatePostSold = createAsyncThunk('blog/updatePostSold', async (postId, sold) => {
  const response = await postSold(postId, sold);
  return response;
});

export const pushFavorite = createAsyncThunk('blog/updateFavoritePost', async (postId) => {
  const response = await updateFavoritePost(postId);
  return response;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPostByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPostByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(removePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePostSold.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePostSold.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePostSold.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;

export const selectAllPosts = createSelector(
  (state) => state.blog.posts,
  (posts) => {
    if (Array.isArray(posts.post)) {
      return posts.post;
    }
    return [];
  }
);
