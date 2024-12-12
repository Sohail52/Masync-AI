import axios from 'axios';

// ----------Generate Content-----------------
export const generateContentAPI = async ({ prompt }) => {
  const response = await axios.post(
    'http://localhost:5000/api/openai/generate-content',
    { prompt }, // Send prompt in the request body
    {
      withCredentials: true, // Pass withCredentials option like this
    }
  );
  return response?.data;
};