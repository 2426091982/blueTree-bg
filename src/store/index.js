import { createStore } from 'vuex';
import modules from './modules';

export const storeOptions = {
    state() {
        let token =  window.localStorage.getItem('token') || "";
        return {
            token,
        };
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
        },
    },
    modules
};
const store = createStore(storeOptions)

export * from "./helpers";

export default store;
