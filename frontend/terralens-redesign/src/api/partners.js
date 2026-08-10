import api from "./client";

export const getPartners = async () => {
  const { data } = await api.get("/partners/");
  return data;
};

export const createPartner = async (partner) => {
  const { data } = await api.post("/partners/", partner);
  return data;
};

export const updatePartner = async (id, partner) => {
  const { data } = await api.put(`/partners/${id}`, partner);
  return data;
};

export const deletePartner = async (id) => {
  const { data } = await api.delete(`/partners/${id}`);
  return data;
};