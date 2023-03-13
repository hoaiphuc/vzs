import axios from 'axios';

const BASE_URL = 'https://secondhandvinhome.herokuapp.com/api';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    console.log("response: ", response)
    localStorage.setItem('categories', JSON.stringify(response.data.response))
    return response.data.response;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/categories`, category);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create category');
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/categories/${id}`);
  } catch (error) {
    throw new Error('Failed to delete category');
  }
};
