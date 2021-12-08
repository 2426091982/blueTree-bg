import axios from "@/utils/axios";

export const getSettings = () => {
    return axios.get("/settings");
};

export const patchSettings = (settings) => {
    return axios.patch("/settings", settings);
};