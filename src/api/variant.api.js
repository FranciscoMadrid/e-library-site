import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/book/variant');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/book/variant/${id}`);
    return res.data;
}

export const createVariant = async (data) => {
    const res = await axiosClient.post('/book/variant', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/book/variant/${id}`, updatedData);
    return res.data;
};

export const deleteVariant = async (id) => {
    const res = await axiosClient.delete(`/book/variant/${id}`);
    return res.data;
};