import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/order');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/order/${id}`);
    return res.data;
}

export const createOrder = async (data) => {
    const res = await axiosClient.post('/order', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/order/${id}`, updatedData);
    return res.data;
};

export const deleteOrder = async (id) => {
    const res = await axiosClient.delete(`/order/${id}`);
    return res.data;
};