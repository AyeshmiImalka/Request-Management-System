import axios from 'axios';

const API_URL = 'http://localhost:5000/api/requests';

// Fetch all requests
export const fetchRequests = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new request
export const createRequest = async (requestData: any) => {
  const response = await axios.post(API_URL, requestData);
  return response.data;
};

// You can add more functions for updating, deleting, etc., as needed.
