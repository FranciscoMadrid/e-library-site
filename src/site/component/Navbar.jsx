import React, { useState } from 'react'
import Logo from '../../assets/void_logo_white.png'
import UserAvatar from '../../assets/user_avatar.png'
import Searchbar from './Searchbar';
import axiosInstance from '../../api/axiosInstance';
import { AnimatePresence, easeInOut, motion, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';

export default function Navbar() {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [mobileView, setMobileView] = useState(false);
    const [accountView, setaccountView] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const toggleMobileView = () => {
        setMobileView(!mobileView);
    }

    const toggleAccountView = () => {
        setaccountView(!accountView);
    }

    const handleLogout = async(e) => {
        try {
            e.preventDefault();
            await axiosInstance.post('/auth/logout');

            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

return (
    <nav className='w-full relative'>
        <div className='flex flex-row gap-2 h-20 relative items-center justify-between p-4 bg-secondary border-b-2 border-accent-secondary'>
            {/* Logo */}
            <div className='flex flex-row gap-2 justify-between'>
                <a href='/' className='flex flex-row gap-2 items-center justify-between'>
                    <img alt='logo.png' src={Logo} className='h-12 w-12'/>
                    <h1 className='font-bold text-lg text-accent-secondary text-shadow-2xs'>Tales & Trinkets</h1>
                </a>
            </div>

            <Searchbar/>

            {/* Desktop View */}
            <div className='md:flex hidden flex-row gap-2 items-center font-light'>
                <div className='flex flex-row gap-4 justify-between items-center text-accent-secondary font-light'>
                    <Link to={'/store'} className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                        <i className="fa-solid fa-store fa-lg"></i>
                        <h1>Store</h1>
                    </Link>

                    <a href='#' className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                        <i className="fa fa-address-book fa-lg"></i>
                        <h1>Contact</h1>
                    </a>
                    {!isAuthenticated ?          
                    (<Link to={'/login'}  className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                        <i className="fa-solid fa-user fa-lg"></i>
                        <h1>Login</h1>
                    </Link>) :
                    (
                        <div className='flex flex-row gap-2 items-center font-bold'>
                            <h1>Welcome, {user?.first_name}</h1>
                            <img src={UserAvatar} 
                                onClick={toggleAccountView}
                                className='h-10 w-10 rounded-4xl border-3 border-accent-secondary hover:border-accent-primary cursor-pointer transition duration-100 ease-in-out'></img>
                        </div>
                    )}
                </div>
            </div>
            {/* Bars Toggle */}
            <button
                onClick={toggleMobileView}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50">
                <div className="relative w-8 h-6 flex flex-col justify-between items-center">
                    <motion.span
                    animate={mobileView ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                    className="bg-accent-secondary h-1 w-8 rounded-sm origin-center absolute top-0"
                    transition={{ duration: 0.1 }}
                    />
                    <motion.span
                    animate={mobileView ? { opacity: 0 } : { opacity: 1 }}
                    className="bg-accent-secondary h-1 w-8 rounded-sm absolute top-1/2 transform -translate-y-1/2"
                    transition={{ duration: 0.1 }}
                    />
                    <motion.span
                    animate={mobileView ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                    className="bg-accent-secondary h-1 w-8 rounded-sm origin-center absolute bottom-0"
                    transition={{ duration: 0.1 }}
                    />
                </div>
            </button>

            {/* Mobile View */}
            <AnimatePresence>
                {mobileView && (
                    <motion.div 
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}

                        className='absolute top-full left-0 w-full border-b-4 border-secondary text-white flex z-10 flex-col items-center text-accent-white text-xl font-semibold gap-4 py-4 bg-secondary/70 md:hidden'>
                        
                        <Link to={'/store'} className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:bg-white hover:text-accent-black'>
                            <i className="fa-solid fa-store fa-lg"></i>
                            <h1>Store</h1>
                        </Link>

                        <a href='#' className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:bg-white hover:text-accent-black'>
                            <i className="fa fa-address-book fa-lg"></i>
                            <h1>Contact</h1>
                        </a>
                        <Link to={'/login'} className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:bg-white hover:text-accent-black'>
                            <i className="fa-solid fa-user fa-lg"></i>
                            <h1>Login</h1>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {accountView && (
                    <motion.div
                        initial={{opacity: 0, x: 100}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 100}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className='fixed text-white top-25 right-0 w-[15vw] bg-accent-black border-l-4 border-t-4 border-b-4 border-accent-secondary z-50'>
                            <div className='flex flex-col gap-2 p-4 items-center font-bold'>
                                <a href='' className='flex flex-row gap-2 items-center justify-start hover:text-accent-primary'>
                                    <h1>Cart</h1>
                                </a>
                                <hr className='w-full px-4 h-1 rounded-2xl'/>    
                                <a href='' className='flex flex-row gap-2 items-center justify-start hover:text-accent-primary'>
                                    <h1>Wishlist</h1>
                                </a>
                                <hr className='w-full px-4 h-1 rounded-2xl'/> 
                                <a href='' onClick={handleLogout} className='flex flex-row gap-2 items-center justify-start hover:text-accent-primary'>
                                    <h1>Log out</h1>
                                </a>
                            </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </nav>
)
}
