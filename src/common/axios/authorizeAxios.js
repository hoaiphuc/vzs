import axios from 'axios';
import { getRoleUser } from './axios';

// const api = axios.create({
//   baseURL: 'https://secondhandvinhome.herokuapp.com/api/',
// });

export const getRole = async (token) => {
  try {
    const response = await getRoleUser()
    return response.data.roleId;
  } catch (error) {
    throw new Error(error.message);
  }
};