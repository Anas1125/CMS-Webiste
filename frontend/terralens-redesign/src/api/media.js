import api from "./client";

export const getMedia = async () => {
  const response = await api.get("/media/");
  return response.data;
};

export const uploadFile = async (folder, file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/media/upload/${folder}`,
    formData
  );

  return response.data;
};

export const deleteMedia = async (folder, filename) => {
  const response = await api.delete(
    `/media/${folder}/${filename}`
  );

  return response.data;
};