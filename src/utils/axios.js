import axios from "axios";
import { logout } from ".";
import store from '@/store'

axios.defaults.baseURL = "http://1.117.92.6:1330";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  let token = store.state.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response.status === 401) { // 没有权限，直接退出登录页
      logout(true);
    }
  }
);

export default axios;
