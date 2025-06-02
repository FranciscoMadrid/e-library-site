import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/book/');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/book/${id}`);
    return res.data;
}

export const createBook = async (data) => {
    const res = await axiosClient.post('/book', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/book/${id}`, updatedData);
    return res.data;
};

export const deleteBook = async (id) => {
    const res = await axiosClient.delete(`/book/${id}`);
    return res.data;
};