import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/book/category');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/book/category/${id}`);
    return res.data;
}

export const createCategory = async (data) => {
    const res = await axiosClient.post('/book/category', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/book/category/${id}`, updatedData);
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await axiosClient.delete(`/book/category/${id}`);
    return res.data;
};