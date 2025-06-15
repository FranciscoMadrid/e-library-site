import axiosClient from './axiosInstance';

export const requestPasswordReset = async (email) => {
    const res = await axiosClient.post('/password-reset/request', { email });
    return res.data;
};


export const confirmPasswordReset = async (token, newPassword) => {
    try {
        const res = await axiosClient.post('/password-reset/confirm', {
            token,
            newPassword
        });
        return res.data;
    } catch (error) {
        console.error('Password reset confirmation failed:', error);
        throw error?.response?.data || error;
    }
};