import axios from "axios";

axios.defaults.baseURL = "http://1.117.92.6:1330";
// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    return config;
});

axios.interceptors.response.use((res) => {
    return res.data;
});

export default axios;