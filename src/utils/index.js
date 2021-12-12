import { message } from "ant-design-vue";
import router from "@/router";
import store from "@/store";

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

export const isFunc = (value) => {
    return typeof value === 'function';
}

/**
 * 根据请求时长逐渐增加请求次数
 * @param {number} multiple 每次增加的倍数
 * @param {number} maxIndex 最大的请求数
 * @param {number} time 允许增加请求次数的时间
 * @param {Function} cb 请求函数
 */
export const Tahoe = async (multiple, maxIndex, time, cb) => {
    let initial = 1;
    let pushed = 0;
    while (true) {
        let startTime = Date.now();
        await cb(initial, pushed);
        let endTime = Date.now() - startTime;
        pushed += initial;
        if (endTime < time) {
            initial = Math.min(6, initial * multiple);
        } else {
            initial = Math.max(1, parseInt(initial / multiple));
        }
        if (pushed >= maxIndex) {
            break;
        };
    }
};
