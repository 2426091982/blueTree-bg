import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = "http://1.117.92.6:1330";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    let token = store.state.token;
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use((res) => {
    return res.data;
});

export default axios;