import { isNumber } from "@/utils";
import axios from "@/utils/axios";

export const getAllImage = (options) => {
    return axios.get("/images", {
        params: {
            limit: options.limit || 10,
            offset: options.offset,
        }
    });
};
// 上传图片
export const uploadImage = (image) => {
    return axios.post("/images", image);
};

// 获取回收站图片
export const getRecycleImages = (options) => {
    return axios.get("/images/recycle", {
        params: {
            limit: options.limit || 10,
            offset: options.offset,
        }
    })
}

// 清空回收站
export const clearRecycle = () => {
    return axios.delete("/images/recycle")
}

// 图片移动到回收站
export const imageToRecycle = (id) => {
    return axios.post(`/images/${id}/recycle`)
};

// 图片移出回收站
export const backRecycleImage = (id) => {
    return axios.delete(`/images/${id}/recycle`)
}