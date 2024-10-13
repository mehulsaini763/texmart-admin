import axios from 'axios';

export const getOrder = async ({ storeId, orderId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/orders/${orderId}`).then((res) => res.data);

export const getOrders = async ({ storeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/orders`).then((res) => res.data);

export const createOrder = async ({ storeId }, body) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/orders`, body).then((res) => res.data);

export const updateOrder = async ({ storeId, orderId }, body) => {
  return await axios
    .patch(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/orders/${orderId}`, body)
    .then((res) => res.data);
};

export const deleteOrder = async ({ storeId, orderId }, body) =>
  await axios
    .delete(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/orders/${orderId}`, { data: body })
    .then((res) => res.data);
