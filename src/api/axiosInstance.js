import axios from "axios";

const BASE_URL = "https://mmhindi.onrender.com";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
