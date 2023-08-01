import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/user';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export { axiosInstance }

