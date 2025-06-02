import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post('auth/login', {
                email,
                password
            })

            const { accessToken, user } = res.data;

            dispatch(loginSuccess({ accessToken, user }));

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            console.log('Login successful:');
            navigate('/')
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert(error.response?.data?.message || `Login failed. ${error}`);
        }
    }
return (
    <section className='h-[75vh] flex items-center justify-center bg-primary p-4'>
        <div className='bg-white border-2 border-accent-secondary p-8 rounded shadow-md w-full max-w-lg flex flex-col gap-2 items-center'>
            <h1 className='font-bold text-2xl text-accent-secondary'>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full mb-6 p-3 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full cursor-pointer bg-accent-secondary hover:bg-[#6b5e45] transition duration-150 ease-in-out text-white p-3 rounded">
                    <p className='text-white'>Log In</p>
                </button>
            </form>

            <div className='flex flex-row gap-8 py-2 w-full items-center justify-between text-accent-aux'>
                <a href='#' className='hover:underline'>
                    Forgot your password?
                </a>
                <a href='#' className='hover:underline'>
                    Create an Account
                </a>
            </div>
        </div>
    </section>
)
}
