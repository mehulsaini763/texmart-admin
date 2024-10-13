import axios from 'axios';

export const getCategory = async ({ storeId, categoryId }) =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/categories/${categoryId}`)
    .then((res) => res.data);

export const getCategories = async ({ storeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/categories`).then((res) => res.data);

export const createCategory = async ({ storeId }, data) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/categories`, data).then((res) => res.data);

export const updateCategory = async ({ storeId, categoryId }, data) =>
  await axios
    .patch(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/categories/${categoryId}`, data)
    .then((res) => res.data);

export const deleteCategory = async ({ storeId, categoryId }, data) =>
  await axios
    .delete(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/categories/${categoryId}`, {
      data: data,
    })
    .then((res) => res.data);
