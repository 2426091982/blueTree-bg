import { computed } from "vue";

import store from "../index";

export const transformNamespaced = (str) => {
    return str.split("/");
}

export const mapState = (namespaced, keys) => {
    if (Array.isArray(namespaced)) {
        keys = namespaced;
        namespaced = [];
    };
    if (namespaced) {
        namespaced = transformNamespaced(namespaced);
    };
    let state = namespaced.reduce((state, item) => {
        return state[item]
    }, store.state);

    let data = {};
    keys.reduce((data, key) => {
        if (state.hasOwnProperty(key)) {
            data[key] = computed(() => {
                return state[key];
            })
        } else {
            console.log(`vuex rootState/${namespaced} 中没有 ${key}`);
        }
        return data;
    }, data)
    return data;
};