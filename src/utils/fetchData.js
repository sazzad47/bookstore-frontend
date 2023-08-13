import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getData = async (url) => {
  try {
    const response = await axios.get(`${backendUrl}/api/${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
