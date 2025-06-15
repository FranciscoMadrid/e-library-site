import React, { useEffect, useState } from 'react'
import { requestPasswordReset } from '../../api/reset.api';
import Modal from '../component/Modal';
import { AnimatePresence, easeInOut, motion, useAnimate, useAnimation, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [toggleModal, setToggleModal] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setToggleModal(!toggleModal);
            const res = await requestPasswordReset(email);
            setMessage(res.message || 'Check your email for the reset link.');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong.');
        }
    };

    useEffect(() => {
        if(toggleModal){
            setupModal();
        }
    }, [toggleModal])
return (
    <section className='w-full flex-grow py-20 text-accent-black relative bg-primary'>
        {toggleModal && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={controlModal}
            className="absolute inset-0 w-full h-full bg-accent-black/40 z-40 flex justify-center items-center"
            >
            <Modal title='Request Completed' onClick={handleCloseModal}  description="If the email exists in our system, you will recieve an email with the next steps." enableAnimation={false}/>
            </motion.div>
        )}
        <div className='bg-white border-2 mx-auto border-accent-secondary p-8 rounded shadow-md w-full max-w-lg flex flex-col gap-2 items-center'>
            <h1 className='font-bold text-2xl text-accent-secondary'>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full cursor-pointer bg-accent-secondary hover:bg-[#6b5e45] transition duration-150 ease-in-out text-white p-3 rounded">
                    <p className='text-white'>Send Request</p>
                </button>
            </form>
        </div>
    </section>
)
}
