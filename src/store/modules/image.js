import { getAllImage, uploadImage } from "@/api";

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
        },
        async uploadImages(store, file) {
            let image = new FormData();
            image.set("image", file);
            let res = await uploadImage(image);
            store.commit("addImages", res);
        }
    }
};

export default StoreModuleImage;