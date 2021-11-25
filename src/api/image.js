import axios from "@/utils/axios";

export const getAllImage = () => {
    return axios.get("/images");
}