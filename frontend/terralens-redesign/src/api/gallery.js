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

export const getGallery = async () => {
  const response = await API.get("/gallery/");
  return response.data;
};

export const createGallery = async (gallery) => {
  const response = await API.post("/gallery/", gallery);
  return response.data;
};

export const updateGallery = async (id, gallery) => {
  const response = await API.put(
    `/gallery/${id}`,
    gallery
  );

  return response.data;
};

export const deleteGallery = async (id) => {
  const response = await API.delete(
    `/gallery/${id}`
  );

  return response.data;
};