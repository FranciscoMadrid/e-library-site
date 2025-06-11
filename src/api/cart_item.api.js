import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/cart/item');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/cart/item/${id}`);
    return res.data;
}

export const createCartItem = async (data) => {
    const res = await axiosClient.post('/cart/item', data);
    return res.data;
};

export const updateCartItem = async (id, updatedData) => {
    const res = await axiosClient.put(`/cart/item/${id}`, updatedData);
    return res.data;
};

export const deleteCartItem = async (id) => {
    const res = await axiosClient.delete(`/cart/item/${id}`);
    return res.data;
};