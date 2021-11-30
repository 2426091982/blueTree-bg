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