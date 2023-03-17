import axios from 'axios';

const BASE_URL = 'https://secondhandvinhome.herokuapp.com/api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const { accessToken } = response.data;
      localStorage.setItem('access_token', accessToken);
      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error('Đăng nhập không thành công');
    }
  },
  loginGoogle: async (token) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`,{ token: `Bearer ${token}` },
      );
      const { acesstoken } = response.data;
      localStorage.setItem('access_token', acesstoken);
      return acesstoken;
    } catch (error) {
      console.error(error);
      throw new Error('Đăng nhập không thành công');
    }
  },
  getCurrentUser: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/current`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Không thể lấy user');
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error(error);
      throw new Error('Đăng xuất không thành công');
    }
  },
};

export default authService;
