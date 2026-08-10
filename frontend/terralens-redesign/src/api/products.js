import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProducts = async () => {
  const response = await API.get("/products/");
  return response.data;
};

export const createProduct = async (product) => {
  const response = await API.post("/products/", product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await API.put(
    `/products/${id}`,
    product
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(
    `/products/${id}`
  );

  return response.data;
};