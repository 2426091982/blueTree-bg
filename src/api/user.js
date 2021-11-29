import axios from "@/utils/axios";

export const login = (username, password) => {
    // http://127.0.0.1:4523/mock/426047/login
    return axios.post('/login', {
        username,
        password
    });
};