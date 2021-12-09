import { message } from "ant-design-vue";
import router from "@/router";
import store from "@/store";

export const preventDefault = (e) => {
    if (typeof e.preventDefault === 'function') {
        e.preventDefault();
    }
}

/*  获取本地Token */
export const setToken = (thoke) => window.localStorage.setItem('token', thoke);

/*  获取本地Token */
export const getToken = () => window.localStorage.getItem('token');

export const isNumber = (value) => {
    return !isNaN(value)
}

export const logout = (isOverdue) => { // isOverdue 是否为过期
    setToken("");
    store.commit('updateToken', '');
    router.push('/login');
    !isOverdue ? message.success("退出登录成功！") : message.error("身份过期，请重新登录！");
};
