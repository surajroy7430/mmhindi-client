import axios from "axios";

const BASE_URL = "https://mmhindi.onrender.com";
// const BASE_URL = "http://localhost:4000";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
