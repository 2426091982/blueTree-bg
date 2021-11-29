export const preventDefault = (e) => {
    if (typeof e.preventDefault === 'function') {
        e.preventDsefault();
    }
}

/*  获取本地Token */
export const setToken = (thoke) => window.localStorage.setItem('token', thoke);

/*  获取本地Token */
export const getToken = () => window.localStorage.getItem('token');
