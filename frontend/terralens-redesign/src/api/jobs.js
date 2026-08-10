import api from "./client";

export const getJobs = async () => {
  const { data } = await api.get("/jobs/");
  return data;
};

export const createJob = async (job) => {
  const { data } = await api.post("/jobs/", job);
  return data;
};

export const updateJob = async (id, job) => {
  const { data } = await api.put(`/jobs/${id}`, job);
  return data;
};

export const deleteJob = async (id) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};