import React, { useState } from 'react'
import Logo from '../../assets/void_logo_white.png'
import UserAvatar from '../../assets/user_avatar.png'
import Searchbar from './Searchbar';
import axiosInstance from '../../api/axiosInstance';
import { AnimatePresence, easeInOut, motion, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { clearCart } from '../../redux/cartSlice';
import CartContainer from './CartContainer';
import linebreak from '../../assets/linebreak_fancy.png'

export default function Navbar() {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { items } = useSelector(state => state.cart);
    
    const [mobileView, setMobileView] = useState(false);
    const [accountView, setaccountView] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);

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
            setaccountView(false);
            setMobileView(false);
            dispatch(logout());
            dispatch(clearCart());
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

return (
    <nav className='w-full'>
        <CartContainer toggleCart={toggleCart} setToggleCart={setToggleCart}/>
        <div className='flex flex-row gap-2 h-20 relative items-center justify-between p-4 bg-secondary border-b-2 border-accent-secondary'>
            {/* Logo */}
            <div className='flex flex-row gap-2 justify-between'>
                <a href='/' className='flex flex-row gap-2 items-center justify-between'>
                    <img alt='logo.png' src={Logo} className='h-12 w-12'/>
                    <h1 className='font-bold text-lg text-accent-secondary text-shadow-2xs'>Tales & Trinkets</h1>
                </a>
            </div>

            <div className='hidden md:flex flex-grow px-8 max-w-[40vw]'>
                <Searchbar />
            </div>

            {/* Desktop View */}
            <div className='md:flex hidden flex-row gap-2 items-center font-light'>
                <div className='flex flex-row gap-4 justify-between items-center text-accent-secondary font-light'>
                    <Link to={'/store'} className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                        <i className="fa-solid fa-store fa-lg"></i>
                        <h1>Store</h1>
                    </Link>

                    {isAuthenticated ? (
                        <div onClick={() => setToggleCart(!toggleCart)} className='flex relative cursor-pointer flex-row gap-1 justify-between items-center p-4 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                            {items.length > 0 && 
                            <div className='absolute top-1 right-10 h-5 w-5 bg-accent-primary rounded-full flex items-center justify-center'>
                                <p className='text-[12px] text-white'>{items.length}</p>
                            </div>}
                            <i className="fa-solid fa-cart-shopping fa-lg"></i>
                            <h1>Cart</h1>
                        </div>
                    ) : (
                        <Link to={'/login'}  className='flex cursor-pointer flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                            <i className="fa-solid fa-cart-shopping fa-lg"></i>
                            <h1>Cart</h1>
                        </Link>
                    )}

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

                        className='absolute top-full border-t-2 border-accent-secondary left-0 w-full border-b-4 text-white flex z-10 flex-col items-center text-accent-white text-xl font-semibold gap-4 py-4 bg-secondary md:hidden'>
                            {!isAuthenticated ?          
                            (<Link to={'/login'}  className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                                <i className="fa-solid fa-user fa-lg"></i>
                                <h1>Login</h1>
                            </Link>) :
                            (
                                <div className='flex flex-row gap-2 items-center font-bold'>
                                    <h1>Welcome, {user?.first_name} {user?.last_name}</h1>
                                    <img src={UserAvatar} 
                                        className='h-10 w-10 rounded-4xl border-3 border-accent-secondary hover:border-accent-primary cursor-pointer transition duration-100 ease-in-out'></img>
                                </div>
                            )}
                            <div className='w-full text-black px-8'>
                                <Searchbar onSubmitCallback={() => setMobileView(false)} />
                            </div>
                            <Link to={'/store'} onClick={() => toggleMobileView()} className='flex flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:bg-white hover:text-accent-black'>
                                <i className="fa-solid fa-store fa-lg"></i>
                                <h1>Store</h1>
                            </Link>

                            <Link to={'/order'} onClick={() => toggleMobileView()} className='flex flex-row gap-2 items-center justify-start hover:text-accent-primary'>
                                <h1>Your Orders</h1>
                            </Link>

                            {isAuthenticated ? (
                                <div onClick={() => {setToggleCart(!toggleCart); setaccountView(false); setMobileView(false);}} className='flex relative cursor-pointer flex-row gap-1 justify-between items-center p-4 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                                    {items.length > 0 && 
                                    <div className='absolute top-1 right-10 h-5 w-5 bg-accent-primary rounded-full flex items-center justify-center'>
                                        <p className='text-[12px] text-white'>{items.length}</p>
                                    </div>}
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                    <h1>Cart</h1>
                                </div>
                            ) : (
                                <Link to={'/login'}  className='flex cursor-pointer flex-row gap-1 justify-between items-center p-2 transition ease-in-out duration-200 rounded hover:text-accent-primary'>
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                    <h1>Cart</h1>
                                </Link>
                            )}

                            {isAuthenticated && (
                                <div onClick={handleLogout} className='flex cursor-pointer flex-row gap-2 items-center justify-center transition ease-in-out duration-200 bg-accent-primary p-2 rounded-full w-40 hover:bg-accent-primary/40'>
                                    <h1>Log out</h1>
                                </div>
                            )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
        {/* User Tab WIP */}
        <AnimatePresence>
            {accountView && (
                <div className='absolute overflow-hidden top-0 left-0 z-250 h-full w-full bg-secondary/40 transition duration-300 ease-in-out'>
                        <div className='grid grid-cols-[1fr_400px] h-full w-full'>
                            <div onClick={() => setaccountView()}></div>

                            <motion.div 
                                initial={{opacity: 0, x: 100}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 100}}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className='flex flex-col items-center p-2 text-white gap-2 bg-accent-black border-l-4 border-accent-secondary'>
                                
                                <div className='flex flex-row gap-2 items-center font-semibold text-2xl'>
                                    <h1>Welcome, {user?.first_name} {user?.last_name}</h1>
                                    <img src={UserAvatar} 
                                        className='h-15 w-15 rounded-4xl border-3 border-accent-secondary hover:border-accent-primary cursor-pointer transition duration-100 ease-in-out'></img>
                                </div>

                                <img className='px-4' src={linebreak} style={{
                                    filter: 'invert(71%) sepia(43%) saturate(304%) hue-rotate(0deg) brightness(90%) contrast(83%)',
                                }}/>

                                <div className='flex flex-col gap-2 items-center w-[300px] text-xl'>
                                    <Link to={'/order'} onClick={() => toggleAccountView()} className='flex flex-row gap-2 items-center justify-start hover:text-accent-primary'>
                                        <h1>Your Orders</h1>
                                    </Link>
                                    <hr className='w-full h-1 rounded-2xl self-stretch'/> 
                                    <div onClick={handleLogout} className='flex cursor-pointer flex-row gap-2 items-center justify-center transition ease-in-out duration-200 bg-accent-primary p-2 rounded-full w-40 hover:bg-accent-primary/40'>
                                        <h1>Log out</h1>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                </div>
            )}
        </AnimatePresence>
    </nav>
)
}
