import axios from "@/utils/axios";

export const getAllImage = () => {
    return axios.get("/images");
}

export const uploadImage = (data) => {
    return axios.post("/images", data)
};

export const deleteImage = (id) => {
    return axios.delete(`/images/${id}`);
}