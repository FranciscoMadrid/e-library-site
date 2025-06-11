import React, { useEffect, useState } from 'react'
import { AnimatePresence, easeInOut, motion, useInView } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import * as CartApi from '../../api/cart.api.js';
import * as BookVariantApi from '../../api/book_variant.api.js';  
import { addToCart, clearCart, setCart } from '../../redux/cartSlice.js';

export default function CartContainer({toggleCart, setToggleCart}) {
    const cartItems = useSelector((state) => state.cart.items);
    const { user } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleToggle = () => {
        setToggleCart(!toggleCart);
    }

    useEffect(() => {
        const fetchCart = async () => {
            try {
                dispatch(clearCart());

                const [cartData] = await Promise.all([
                    CartApi.getById(user.cart_id)
                ]);

                const cartItems = cartData[0].cart_items;

                const bookVariantPromises = cartItems.map(async (item) => {
                    const bookVariant = await BookVariantApi.getById(item.fk_book_variant_id);
                    return {
                        ...bookVariant,
                        quantity: item.quantity,
                        cart_item_id: item.cart_item_id 
                    };
                });

                const detailedCartItems = await Promise.all(bookVariantPromises);
                
                detailedCartItems.map((item) => {
                    dispatch(addToCart({
                        cart_item_id: item.cart_item_id,
                        book_variant_id: item.data[0].book_variant[0].book_variant_id,
                        variant: item.data[0].book_variant[0].variant,
                        title: item.data[0].title,
                        quantity: item.quantity,
                        price: item.data[0].book_variant[0].price,
                        image_preview: item.data[0].book_variant[0].images[0]
                    }))
                })
            } catch (err) {
                console.error(err);
                setError("Failed to load cart data");
            }
        };

        fetchCart();
    }, []);

    const total = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
return (
    <AnimatePresence>
        {toggleCart && (
        <div className={`absolute overflow-hidden top-0 left-0 z-250 h-full w-full bg-secondary/40 transition duration-300 ease-in-out ${toggleCart ? 'flex' : 'hidden'}`}>
            <div className='grid grid-cols-[1fr_400px] h-full w-full'>
                <div className='' onClick={()=> handleToggle()}></div>
                <motion.div 
                    initial={{opacity: 0, x: 100}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 100}}
                    transition={{ duration: 0.2, ease: "easeInOut" }}

                    className='bg-accent-black border-l-4 p-4 relative border-accent-secondary flex flex-col gap-4 items-center'>
                        <h1 className=' text-2xl font-bold text-white'>Cart</h1>
                        <hr className='text-white w-full'/>
                        <div>
                            <i onClick={()=> handleToggle()} className="fa-solid fa-x text-2xl cursor-pointer text-white absolute top-5 right-5"></i>
                            {cartItems.length === 0 ? (
                                <h1 className='text-center text-2xl font-bold text-white'>Look up some new books and get to shopping!</h1>
                            ) : (
                                <div className='w-full bg-white p-6 rounded-2xl'>
                                    <div className="w-full">
                                        {cartItems.map((item, index) => (
                                            <CartItem data={item} key={index}/>
                                        ))}
                                    </div>
                                    <div className='p-4'>
                                        <h1 className='text-lg font-bold'> Total: ${total.toFixed(2)}</h1>
                                    </div>
                                    <div className='p-2 font-bold text-white text-center rounded-full transition duration-200 ease-in-out cursor-pointer bg-[#31af7c] hover:bg-[#87ceb1]'>
                                        <h1>Proceed to Checkout</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                </motion.div>
            </div>
        </div>
        )}
    </AnimatePresence>
)
}
