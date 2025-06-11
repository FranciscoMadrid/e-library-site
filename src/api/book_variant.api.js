import axiosClient from "./axiosInstance";

export const getById = async (id) => {
    const res = await axiosClient.get(`/book/book-variant/${id}`);
    return res.data;
}
