const axios = require("axios");

const API = axios.create({ baseURL: "http://localhost:8080/api" });

API.interceptors.request.use((req) => {
  req.headers.session = JSON.parse(localStorage.getItem("user")).token;
  return req;
});

const headers = {
  headers: {
    "Content-Type": "Multipart/Form-Data",
  },
};

export const getPosts = (currentPage, perPage) =>
  API.get(`/posts?page=${currentPage}&perPage=${perPage}`);

export const getPost = (id) => API.get(`/posts/detail/${id}`);

export const getPostBySearch = (searchQuery) =>
  API.get(
    `/posts/search?tags=${searchQuery.tags}&title=${
      searchQuery.title || "none"
    }`
  );

export const createPost = (data) => API.post("/posts", data, headers);

export const editPost = (id, data) =>
  API.put(`${"/posts"}/${id}`, data, headers);

export const deletePost = (id) => API.delete(`${"/posts"}/${id}`);
export const likePost = (id) => API.put(`${"/posts"}/${id}/like`);
export const commentPost = (id, data) =>
  API.put(`${"/posts"}/${id}/comment`, data);

export const signIn = (data) => API.post("/users/signIn", data);
export const signUp = (data) => API.post("/users/signUp", data);
