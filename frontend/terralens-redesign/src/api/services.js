import api from "./client";

export const getServices = async () => {
  const response = await api.get("/services/");
  return response.data;
};

export const createService = async (service) => {
  const response = await api.post("/services/", service);
  return response.data;
};

export const updateService = async (id, service) => {
  const response = await api.put(`/services/${id}`, service);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

export const getServiceBySlug = async (slug) => {
  const response = await api.get(`/services/${slug}`);
  return response.data;
};