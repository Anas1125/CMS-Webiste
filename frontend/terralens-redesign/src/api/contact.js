import api from "./client";

export const createContact = async (contact) => {
  const { data } = await api.post("/contact/", contact);
  return data;
};

export const getContacts = async () => {
  const { data } = await api.get("/contact/");
  return data;
};

export const getContact = async (id) => {
  const { data } = await api.get(`/contact/${id}`);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await api.delete(`/contact/${id}`);
  return data;
};