import React, { useEffect, useRef, useState } from 'react';
import VariantButton from './VariantButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import * as CartItemApi from '../../api/cart_item.api.js' 
import { AnimatePresence, easeInOut, motion, useAnimate, useAnimation, useInView } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { addToCart, updateQuantity } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function SingleBookItem({ data = {} }) {

    const controlCartIcon = useAnimation();
    const controlCartButton = useAnimation();
    const controlCartText = useAnimation();
    const navigate = useNavigate();

    const [cartAnimationDone, setCartAnimationDone] = useState(false);

    const { book_variant = [], categories = [], publishers = [], authors = [], title } = data;
    const [currentVariant, setCurrentVariant] = useState('');
    const { user } = useSelector(state => state.auth);
    const swiperRef = useRef(null);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        if (book_variant.length > 0) {
            setCurrentVariant(book_variant[0].variant_id);
        }
    }, [book_variant]);

    const handleVariantChange = (id) => {
        setCurrentVariant(id);
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(0);
        }
    };

const handleAddToCart = async () => {
    if (!selectedVariant) return;

    try {
        CartAnimation();
        setCartAnimationDone(true);
        CartThankYouMessage();
        CartButtonAnimation();

        const existingItem = cartItems.find(
            item => item.book_variant_id === selectedVariant.book_variant_id
        );

        if (existingItem) {
            await CartItemApi.updateCartItem(existingItem.cart_item_id, {
                quantity: existingItem.quantity + 1
            });

            dispatch(updateQuantity({
                cart_item_id: existingItem.cart_item_id,
                quantity: existingItem.quantity + 1
            }));
        } else {

            const res = await CartItemApi.createCartItem({
                fk_cart_id: user.cart_id,
                fk_book_variant_id: selectedVariant.book_variant_id,
                quantity: 1
            });

            dispatch(addToCart({
                cart_item_id: res.id,
                book_variant_id: selectedVariant.book_variant_id,
                variant: selectedVariant.variant,
                title: title,
                quantity: 1,
                price: selectedVariant.price,
                image_preview: selectedVariant.images[0]
            }));
        }
    } catch (error) {
        console.error('Add to cart failed:', error);
    }
};

    const CartAnimation = () => {
        controlCartIcon.start({
            rotate: [0, 360, 330, 330, 330],
            opacity: [1, 1, 1, 1, 0],
            x: [0, 0, 0, 90, 90],
            scale: [1.25, 1, 1, 1, 1],
            transition: {
                duration: 1.5,
                ease: 'easeInOut',
                times: [0, 0.4, 0.5, 0.7, 1],
            }
        });
    };

    const CartButtonAnimation = () => {
        controlCartButton.start({
            backgroundColor: ["#2563eb", "#1e40af", "#03ac57"], 
            scale: [1, 0.5, 1.1, 1],
            transition: {
                duration: 0.4,
                ease: 'easeInOut',
                times: [0, 0.3, 0.6, 1]
            },
        });
    };

    const CartThankYouMessage = () => {
        controlCartText.start({
            x: [-100, 0, 0],
            opacity: [0, .5, 1],
            transition: {
                delay: 0.7,
                duration: 1,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
            },
        });
    }

    const selectedVariant = book_variant.find(v => v.variant_id === currentVariant);

    return (
        <div className='w-full max-w-7xl mx-auto p-4'>
            <div className='grid grid-cols-1 md:grid-cols-[70%_30%] gap-8 items-start p-2'>
                {/* Image Swiper Container */}
                <div className='flex justify-center'>
                    <div className='w-full max-w-[500px] h-[400px] md:h-[500px] lg:h-[600px] bg-accent-black/20 rounded overflow-hidden shadow-2xl flex items-center justify-center'>
                        <Swiper
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            spaceBetween={10}
                            slidesPerView={1}
                            
                            navigation
                            keyboard
                            pagination={{ clickable: true }}
                            className="w-full h-full"
                        >
                            {selectedVariant?.images?.map((img, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    <img
                                        src={img.image_path}
                                        alt={img.alt_text || 'Book variant image'}
                                        className="w-full h-full object-contain"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Information Container */}
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl text-accent-secondary'>{title}</h1>
                    <div className='grid grid-cols-2 gap-2 items-center'>
                        <h1 className='font-semibold text-xl col-span-full text-accent-aux'>Categories</h1>
                        {categories.map((item, index) => (
                            <p key={index}  className=' font-light'>
                                {item.category_name}
                            </p>
                        ))}

                        <h1 className='font-semibold text-xl col-span-full text-accent-aux'>Authors</h1>
                        {authors.map((item, index) => (
                            <p key={index} className=' font-light'>
                                {item.author}
                            </p>
                        ))}

                        <h1 className='font-semibold text-xl col-span-full  text-accent-aux'>Publisher</h1>
                        {publishers.map((item, index) => (
                            <p key={index} className=' font-light'>
                                {item.publisher_name}
                            </p>
                        ))}

                    </div>
                    <div className='flex flex-row gap-2'>
                        {book_variant.map((variant) => (
                        <div 
                            key={variant.variant_id} 
                            onClick={() => handleVariantChange(variant.variant_id)}
                            className={`border-2 cursor-pointer border-accent-primary rounded p-2 flex flex-col text-center transition-all duration-200 ${
                                currentVariant === variant.variant_id
                                    ? 'bg-accent-primary text-white scale-105'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <h1 className='font-semibold'>{variant.variant}</h1>
                            <h2 className='text-lg'>${variant.price}</h2>
                        </div>
                    ))}
                    </div>
                    <div className='flex flex-row gap-2 '>
                        <AnimatePresence>
                            <motion.div
                                animate={controlCartButton}
                                onClick={() => {
                                    if(!user){
                                        navigate('/login')
                                    } else {
                                        handleAddToCart();
                                    }
                                }}
                                style={{ backgroundColor: '#2563eb' }}
                                className="relative rounded flex items-center justify-center cursor-pointer text-white origin-center w-[280px] p-4 text-lg font-bold"
                                >
                                <motion.i animate={controlCartIcon} className="fa-solid fa-cart-shopping" />
                                {/* Position Thank You absolutely */}
                                <motion.div
                                    animate={controlCartText}
                                    initial={{opacity: 0}}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    Thank You!
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}