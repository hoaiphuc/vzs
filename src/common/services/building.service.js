import axios from 'axios';

const BASE_URL = 'https://secondhandvinhome.herokuapp.com/api';

const access_token = localStorage.getItem('access_token');

export const getBuildings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/building`, {
      headers: { Authorization: `Bearer ${access_token}` },    }
      );
    console.log('response: ', response);
    localStorage.setItem('buildings', JSON.stringify(response.data.building))

    return response.data.building;
  } catch (error) {
    throw new Error('Failed to fetch buidings');
  }
};
