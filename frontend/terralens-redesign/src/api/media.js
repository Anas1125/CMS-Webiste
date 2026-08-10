import api from "./client";

export const uploadFile = async (folder, file) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    `/media/upload/${folder}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const getMedia = async () => {
  const { data } = await api.get("/media/");
  return data;
};

export const deleteMedia = async (
  folder,
  filename
) => {
  return api.delete(
    `/media/${folder}/${filename}`
  );
};