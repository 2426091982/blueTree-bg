import { createStore } from 'vuex';
import { getToken } from '@/utils';

export default createStore({
    state() {
        let token = getToken() || false;
        return {
            token,
        };
    },
    mutations: {
        updateToken(state, options) {
            state.token = options;
        },
    },
});
