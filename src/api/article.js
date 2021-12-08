import axios from "@/utils/axios";

export const getArticleList = () => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.get("/articles");
};

export const getArticle = (id) => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.get(`/articles/${id}`);
};

export const addArticle = (params) => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.post(`/articles`, params);
};
export const updateArticle = (id,params) => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.put(`/articles/${id}`,params);
};

export const removeArticle = (id) => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.delete(`/articles/${id}`);
};

// -----------------------------------------分类相关
// 获取文章分类
export const getArticleCategory = () => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.get(`/articles/category`);
};
// 添加文章分类
export const addArticleCategory = (name) => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.post(`/articles/category`, { name });
};
// 更新文章分类
export const updateArticleCategory = (id, name) => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.put(`/articles/category/${id}`, { name });
};
// 删除文章分类
export const removeArticleCategory = (id) => {
  // http://127.0.0.1:4523/mock/426047/login
  return axios.delete(`/articles/category/${id}`);
};
