import axios from 'axios';

//const API_BASE_URL = 'http://10.0.2.2:5003'; // Adjust the base URL as needed

export const fetchPostsByPosterId = async posterid => {
  try {
    const response = await axios.get(`http://10.0.2.2:5003/posts/${posterid}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


export const fetchPublicPostsByPosterId = async posterid => {
  try {
    const response = await axios.get(`http://10.0.2.2:5003/posts/public/${posterid}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};