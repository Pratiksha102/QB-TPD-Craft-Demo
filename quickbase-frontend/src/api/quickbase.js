import axios from 'axios';

// API configuration
const API_URL = 'http://localhost:7000/api'; // Updated port to match backend server

const quickbase = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get medals data
export const getMedals = async () => {
  try {
    const response = await quickbase.get('/medals');
    const medals = response.data.data.map(record => ({
        country: record[7].value,
        medal: record[9].value,
        year: record[11].value,
        sport: record[14].value,
      }));
      return medals;
  
  } catch (error) {
    console.error('Error fetching medals:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Post new medal record
export const postMedal = async (data) => {
  try {
    const response = await quickbase.post('/medals', data);
    return response.data;
  } catch (error) {
    console.error('Error posting medal:', error.response ? error.response.data : error.message);
    throw error;
  }
};
