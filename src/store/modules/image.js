import {
    getAllImage,
    imageToRecycle,
    uploadImage,
    getRecycleImages,
    backRecycleImage
} from "@/api";
import { Tahoe } from "@/utils";

const StoreModuleImage = {
    namespaced: true,
    state: {
        images: [],
        recycleImages: [],
        isRequestImages: false,
        isRequestRecycle: false,
    },
    mutations: {
        setImages(state, images) {
            state.images = images;
        },
        addImages(state, newImage) {
            if (Array.isArray(newImage)) {
                state.images = state.images.concat(newImage);
            } else {
                state.images.push(newImage);
            }
        },
        setRecycleImages(state, images) {
            state.recycleImages = images;
        },
        addRecycleImages(state, images) {
            if (Array.isArray(images)) {
                state.recycleImages = state.recycleImages.concat(images);
            } else {
                state.recycleImages.push(images);
            };
        },
    },
    actions: {
        async getImages(store) {
            let images = await getAllImage({
                offset: store.state.images.length,
            });
            store.commit("addImages", images);
            return images;
        },
        async uploadImages(store, file) {
            let image = new FormData();
            image.set("image", file);
            let res = await uploadImage(image);
            store.commit("addImages", res);
        },
        async imageToRecycle(store, images) {
            let i = 0;
            console.log(images);
            await Tahoe(2, images.length, 300, async (num, requested) => {
                let promise = [];
                for(let i = requested; i < num + requested; i++) {
                    promise.push(imageToRecycle(images[i].id));
                };
                await Promise.all(promise);
            });
            store.commit("addRecycleImages", images);
        },
        async getRecycleImages(store) {
            let images = (await getRecycleImages({
                offset: store.state.recycleImages.length,
            })) || [];
            store.commit("addRecycleImages", images);
            return images;
        },
        async recoveryImages(store, images) {
            await Tahoe(2, images.length, 400, async (num, requested) => {
                await Promise.all(images.slice(requested, requested + num).map(item => {
                    return backRecycleImage(item.id);
                }));
            });
            store.commit("addImages", images);
        }
    }
};


export default StoreModuleImage;