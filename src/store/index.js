import { getToken } from '@/utils';
import { createStore } from 'vuex';

export default createStore({
    state() {
        let token =  getToken() || false;
        return {
            token
        }
    },
    mutations: {
        updateToken(state, options) {
            state.token = options;
        },
    }
});