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

export const getServices = async () => {
  const response = await API.get("/services/");
  return response.data;
};

export const createService = async (service) => {
  const response = await API.post("/services/", service);
  return response.data;
};

export const updateService = async (id, service) => {
  const response = await API.put(`/services/${id}`, service);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await API.delete(`/services/${id}`);
  return response.data;
};

export const getServiceBySlug = async (slug) => {
  const response = await API.get(`/services/${slug}`);
  return response.data;
};