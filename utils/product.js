import axios from 'axios';

export const getProduct = async ({ storeId, productId }) =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/products/${productId}`)
    .then((res) => res.data);

export const getProducts = async ({ storeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/products`).then((res) => res.data);

export const createProduct = async ({ storeId }, body) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/products`, body).then((res) => res.data);

export const updateProduct = async ({ storeId, productId }, body) => {
  return await axios
    .patch(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/products/${productId}`, body)
    .then((res) => res.data);
};

export const deleteProduct = async ({ storeId, productId }, body) =>
  await axios
    .delete(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/products/${productId}`, { data: body })
    .then((res) => res.data);
