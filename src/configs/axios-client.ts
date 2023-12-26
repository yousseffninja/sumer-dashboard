import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:3000/v1/admin/" // API URL,
  baseURL: "http://localhost:8000/api/v1/", // API SERVER URL,
});

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
};

export default axiosClient;
