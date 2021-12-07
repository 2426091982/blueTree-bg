import axios from "@/utils/axios";

export const getSettings = () => {
    return axios.get("/settings");
};
