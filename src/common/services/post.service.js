import axios from 'axios';

const BASE_URL = 'https://secondhandvinhome.herokuapp.com/api';

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/post`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const getPostByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/post/getbycategory/${categoryId}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getPostByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/post/getbyuserid/${userId}`);
    localStorage.setItem('MyPost', JSON.stringify(response.data.response))
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${BASE_URL}/post/create`, postData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
  
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/post/delete/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const postSold = async (postId, sold) => {
  try {
    console.log("postiddđ: ", postId)
    const response = await axios.put(`${BASE_URL}/post/sold?id=${postId}`, {sold: sold});
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const updateFavoritePost = async (postId) => {
  try {
    const response = await axios.post(`${BASE_URL}/post/interestedpost`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

