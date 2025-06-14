import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/order/history');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/order/history/${id}`);
    return res.data;
}

export const createOrderHistory = async (data) => {
    const res = await axiosClient.post('/order/history', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/order/history/${id}`, updatedData);
    return res.data;
};

export const deleteOrderHistory = async (id) => {
    const res = await axiosClient.delete(`/order/history/${id}`);
    return res.data;
};