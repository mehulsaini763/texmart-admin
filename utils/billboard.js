import axios from 'axios';

export const getBillboard = async ({ storeId, billboardId }) =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/billboards/${billboardId}`)
    .then((res) => res.data);

export const getBillboards = async ({ storeId }) =>
  await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/billboards`).then((res) => res.data);

export const createBillboard = async ({ storeId }, body) =>
  await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/billboards`, body).then((res) => res.data);

export const updateBillboard = async ({ storeId, billboardId }, body) => {
  return await axios
    .patch(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/billboards/${billboardId}`, body)
    .then((res) => res.data);
};

export const deleteBillboard = async ({ storeId, billboardId }, body) =>
  await axios
    .delete(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/stores/${storeId}/billboards/${billboardId}`, { data: body })
    .then((res) => res.data);
