import axios from "@/utils/axios";

export const getAllImage = () => {
  return axios.get("/images");
};
// 上传图片
export const uploadImage = (image) => {
  return axios.post("/images", image);
};
