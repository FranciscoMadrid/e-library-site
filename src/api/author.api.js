import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/book/author');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/book/author/${id}`);
    return res.data;
}

export const createAuthor = async (data) => {
    const res = await axiosClient.post('/book/author', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/book/author/${id}`, updatedData);
    return res.data;
};

export const deleteAuthor = async (id) => {
    const res = await axiosClient.delete(`/book/author/${id}`);
    return res.data;
};