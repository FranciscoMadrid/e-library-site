import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from '../../api/reset.api.js';
import Modal from '../component/Modal.jsx';
import { AnimatePresence, easeInOut, motion, useAnimate, useAnimation, useInView } from 'framer-motion';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [toggleModal, setToggleModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const controlModal = useAnimation();
    const navigate = useNavigate();

    const setupModal = () => {
        controlModal.start({
            opacity: [0, 0.5, 1, 1],
            transition: {
                duration: 0.4,
                delay: 0.25,
                ease: 'easeInOut',
                times: [0, 0.3, 0.6, 1]
            },
        });
    }

    const handleCloseModal = () => {
        setToggleModal(false);
        navigate('/');
    }

    useEffect(() => {
        if(toggleModal){
                setupModal();
            }
    }, [toggleModal])

    const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            setToggleModal(true);
            const res = await confirmPasswordReset(token, newPassword);
            console.log(res)
            setMessage('Success');
        } catch (err) {
            setMessage('Reset failed');
        }
    };

    return (
    <section className='w-full flex-grow py-20 text-accent-black relative bg-primary'>
        {toggleModal && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={controlModal}
                className="absolute inset-0 w-full h-full bg-accent-black/40 z-40 flex justify-center items-center"
            >
                <Modal
                title="Request Completed"
                onClick={handleCloseModal}
                description={
                    message === "Success"
                    ? "Your password has been updated!"
                    : "Token is invalid or has expired"
                }
                enableAnimation={false}
                />
            </motion.div>
        )}
        <form onSubmit={handleSubmit} className='bg-white  mx-auto border p-8 rounded shadow-md w-full max-w-lg'>
            <h2 className='text-2xl font-bold mb-4'>Reset Your Password</h2>
            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 mb-4 border rounded"
                required
            />
            <button type="submit" className="w-full bg-accent-secondary text-white p-3 rounded hover:bg-[#6b5e45]">
                Reset Password
            </button>
            {message && <p className="mt-4 text-accent-aux">{message}</p>}
        </form>
    </section>
    );
}