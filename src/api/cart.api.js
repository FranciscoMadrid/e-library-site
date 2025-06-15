import axiosClient from "./axiosInstance";

// Get all cart items
export const getAll = async () => {
    try {
        const res = await axiosClient.get('/cart');
        return res.data || [];  
    } catch (error) {
        if (error.response?.status === 404) return []; // Not found
        console.error("Error fetching cart items:", error);
        return [];  
    }
};

// Get cart item by ID
export const getById = async (id) => {
    try {
        const res = await axiosClient.get(`/cart/${id}`);
        return res.data || null;
    } catch (error) {
        if (error.response?.status === 404) return null;
        console.error(`Error fetching cart item with ID ${id}:`, error);
        return null;
    }
};

// Create a new cart item
export const createCart = async (data) => {
    try {
        const res = await axiosClient.post('/cart/', data);
        return res.data;
    } catch (error) {
        console.error("Error creating cart item:", error);
        throw error;  // Let the caller handle create errors if needed
    }
};

// Update a cart item
export const updateCart = async (id, updatedData) => {
    try {
        const res = await axiosClient.put(`/cart/${id}`, updatedData);
        return res.data;
    } catch (error) {
        console.error(`Error updating cart item with ID ${id}:`, error);
        throw error;
    }
};

// Delete a cart item
export const deleteCart = async (id) => {
    try {
        const res = await axiosClient.delete(`/cart/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error deleting cart item with ID ${id}:`, error);
        throw error;
    }
};