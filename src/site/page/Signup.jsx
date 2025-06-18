import React, { useEffect, useState } from 'react'
import LogoSignUp from '../../assets/user_avatar.png'
import * as UserApi from '../../api/user.api.js';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, easeInOut, motion, useAnimate, useAnimation, useInView } from 'framer-motion';
import Modal from '../component/Modal.jsx';

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

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

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedPasswordConfirm = passwordConfirm.trim();
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();

        if (
            !trimmedEmail ||
            !trimmedPassword ||
            !trimmedPasswordConfirm ||
            !trimmedFirstName ||
            !trimmedLastName
        ) {
            alert('Please fill in all the fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (trimmedPassword !== trimmedPasswordConfirm) {
            alert('Passwords do not match.');
            return;
        }

        try {
            setToggleModal(true);
            const res = await UserApi.createUser({
                email: trimmedEmail,
                first_name: trimmedFirstName,
                last_name: trimmedLastName,
                password: trimmedPassword,
            });

            if (res) {
                console.log('User has been created successfully');
            }
        } catch (error) {
            console.log(`Error when creating a new user: ${error}`);
            alert('Failed to create user. Please try again.');
        }
    };
    useEffect(() => {
        if(toggleModal){
                setupModal();
            }
    }, [toggleModal])

    return (
    <section className='w-full flex-grow py-16 relative p-10 bg-primary/60'>
        {toggleModal && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={controlModal}
            className="absolute inset-0 w-full h-full bg-accent-black/40 z-40 flex justify-center items-center"
            >
            <Modal title='Request Completed' onClick={handleCloseModal}  description="Your user has been created!" enableAnimation={false}/>
            </motion.div>
        )}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-4 rounded-2xl border-2 border-accent-secondary flex flex-col gap-2">
            <img src={LogoSignUp} className=' h-30 w-30 self-center border-accent-primary rounded-full border-4'/>
            
            <h1>Email</h1>
            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='w-full p-3 rounded border border-gray-300'/>

            <h1>Password</h1>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password..."
                className="w-full p-3 border border-gray-300 rounded"
            />
            <h1>Confirm Password</h1>
            <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm password..."
                className="w-full p-3 border border-gray-300 rounded"
            />

            <div className='flex flex-col items-start h-8'>
                {password !== passwordConfirm && (
                    <h1 className='text-red-500'>The passwords dont match up</h1>
                )}
            </div>

            <div className='flex flex-row gap-2'>
                <div className=' flex flex-col gap-2'>
                    <h1>First Name</h1>
                    <input 
                        type='text' 
                        placeholder='John' 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='w-full mb-6 p-3 border border-gray-300 rounded'/>
                </div>
                <div className=' flex flex-col gap-2'>
                    <h1>Last Name</h1>
                    <input 
                        type='text' 
                        placeholder='Doe' 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='w-full mb-6 p-3 border border-gray-300 rounded'/>
                </div>
            </div>
            <button 
                type='submit'
                className='bg-accent-primary cursor-pointer p-2 rounded-lg text-white hover:bg-accent-primary/60 transition duration-200 ease-in-out'>
                Sign Up
            </button>
        </form>
    </section>
)
}
