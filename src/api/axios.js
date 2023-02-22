import axios from 'axios'

const accessToken= 'localStorage.accessToken';
export default axios.create({
    
    baseURL:  'https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/api-docs/#/',
    headers: {
        'Authorization': `Bearer ${accessToken}`
      }
});