import axiosClient from "./axiosInstance";

export const getAll = async () => {
    const res = await axiosClient.get('/user');
    return res.data;
}
export const getById = async (id) => {
    const res = await axiosClient.get(`/user/${id}`);
    return res.data;
}

export const createUser = async (data) => {
    const res = await axiosClient.post('/user', data);
    return res.data;
};

export const update = async (id, updatedData) => {
    const res = await axiosClient.put(`/user/${id}`, updatedData);
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await axiosClient.delete(`/user/${id}`);
    return res.data;
};