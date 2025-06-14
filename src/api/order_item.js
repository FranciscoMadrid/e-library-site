import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/order/item');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/order/item/${id}`);
    return res.data;
}

export const createOrderItem = async (data) => {
    const res = await axiosClient.post('/order/item', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/order/item/${id}`, updatedData);
    return res.data;
};

export const deleteOrderItem = async (id) => {
    const res = await axiosClient.delete(`/order/item/${id}`);
    return res.data;
};