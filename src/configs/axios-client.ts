import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:3000/v1/admin/" // API URL,
  baseURL: "https://sumer-api-1995ba33228d.herokuapp.com/api/v1/", // API SERVER URL,
});

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
};

export default axiosClient;
