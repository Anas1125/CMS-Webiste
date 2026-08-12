import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getBlogs = async () => {
  const response = await API.get("/blogs/");
  return response.data;
};

export const createBlog = async (blog) => {
  const response = await API.post("/blogs/", blog);
  return response.data;
};

export const updateBlog = async (id, blog) => {
  const response = await API.put(
    `/blogs/${id}`,
    blog
  );

  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await API.delete(
    `/blogs/${id}`
  );

  return response.data;
};