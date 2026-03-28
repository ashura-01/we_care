import axios from 'axios';

const axiosInstance = axios.create({
  // Point this to your backend server URL
  baseURL: 'http://localhost:5600/api/v1', 
  
  // This is CRITICAL for your friend's HTTP-Only cookie authentication!
  withCredentials: true, 
  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;