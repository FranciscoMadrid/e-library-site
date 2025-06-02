import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/book/publisher');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/book/publisher/${id}`);
    return res.data;
}

export const createPublisher = async (data) => {
    const res = await axiosClient.post('/book/publisher', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/book/publisher/${id}`, updatedData);
    return res.data;
};

export const deletePublisher = async (id) => {
    const res = await axiosClient.delete(`/book/publisher/${id}`);
    return res.data;
};