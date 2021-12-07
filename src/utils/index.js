import store from "@/store";
import router from "@/router";
import { message } from "ant-design-vue";

export const preventDefault = (e) => {
    if (typeof e.preventDefault === 'function') {
        e.preventDefault();
    }
}

export const logout = () => {
    setToken("");
    store.commit("updateToken", "");
    router.push("/login");
    message.success("退出登录成功！");
}

/*  获取本地Token */
export const setToken = (thoke) => window.localStorage.setItem('token', thoke);

/*  获取本地Token */
export const getToken = () => window.localStorage.getItem('token');

export const isNumber = (value) => {
    return !isNaN(value)
}
