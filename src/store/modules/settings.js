import { getSettings, patchSettings } from "@/api/settings";

const StoreModuleSettings = {
    namespaced: true,
    state: {
        pageConf: {},
        carouselConf: [],
    },
    mutations: {
        setPageConf(state, conf) {
            state.pageConf = conf;
        },
        setCarousel(state, carousel) {
            state.carouselConf = carousel;
        },
        addCarousel(state, newCarousel) {
            state.carouselConf.push(newCarousel);
            console.log(newCarousel);
        },
        updateCarousel(state, patch) {
            let {
                index, 
                url
            } = patch;
            state.carouselConf[index].url = url;
        }
    },
    actions: {
        async getSettings(store) {
            let {
                carousel,
                ...page
            } = await getSettings();
            store.commit("setCarousel", carousel);
            store.commit("setPageConf", page);
        },
        async patchSettings(store, settings) {
            return await patchSettings(settings);
        }
    }
};

export default StoreModuleSettings;