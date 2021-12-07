import { getAllImage } from "@/api";

const StoreModuleImage = {
    namespaced: true,
    state: {
        images: [],
    },
    mutations: {
        setImages(state, images) {
            state.images = images;
        },
        addImages(state, newImage) {
            state.images.push(newImage);
        }
    },
    actions: {
        async getImages(store) {
            let images = await getAllImage();
            store.commit("setImages", images)
        }
    }
};

export default StoreModuleImage;