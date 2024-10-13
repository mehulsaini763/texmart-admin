import axios from 'axios';

export const getColor = async ({ storeId, colorId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/colors/${colorId}`).then((res) => res.data);

export const getColors = async ({ storeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/colors`).then((res) => res.data);

export const createColor = async ({ storeId }, body) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/colors`, body).then((res) => res.data);

export const updateColor = async ({ storeId, colorId }, body) =>
  await axios
    .patch(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/colors/${colorId}`, body)
    .then((res) => res.data);
    
export const deleteColor = async ({ storeId, colorId }, body) =>
  await axios
    .delete(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/colors/${colorId}`, { data: body })
    .then((res) => res.data);
