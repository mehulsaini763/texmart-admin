import axios from 'axios';

export const getStore = async ({ storeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}`).then((res) => res.data);

export const getStores = async (body) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/all`, body).then((res) => res.data);

export const createStore = async (body) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/`, body).then((res) => res.data);

export const updateStore = async ({ storeId }, body) =>
  await axios.patch(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}`, body).then((res) => res.data);

export const deleteStore = async ({ storeId }, body) =>
  await axios.delete(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}`, { data: body }).then((res) => res.data);
