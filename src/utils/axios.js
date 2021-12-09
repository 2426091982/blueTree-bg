import axios from "axios";
import store from "@/store";
import { logout } from ".";
import { message } from "ant-design-vue";

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
}, (err) => {
    if (err.response.status === 401) {
        message.success("秘钥过期, 重新登录")
        logout();
    };
});

export default axios;
