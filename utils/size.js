import axios from 'axios';

export const getSize = async ({ storeId, sizeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/sizes/${sizeId}`).then((res) => res.data);

export const getSizes = async ({ storeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/sizes`).then((res) => res.data);

export const createSize = async ({ storeId }, body) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/sizes`, body).then((res) => res.data);

export const updateSize = async ({ storeId, sizeId }, body) =>
  await axios
    .patch(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/sizes/${sizeId}`, body)
    .then((res) => res.data);
    
export const deleteSize = async ({ storeId, sizeId }) =>
  await axios
    .delete(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/sizes/${sizeId}`, { data: body })
    .then((res) => res.data);
