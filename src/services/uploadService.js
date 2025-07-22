import api from "../api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post("/upload/image", formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteImage = async (imageId) => {
  const response = await api.delete(`/upload/image/${imageId}`);
  return response.data;
}; 