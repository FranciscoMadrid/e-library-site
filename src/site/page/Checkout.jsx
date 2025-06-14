import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../component/Modal';
import { AnimatePresence, easeInOut, motion, useAnimate, useAnimation, useInView } from 'framer-motion';

import * as OrderApi from '../../api/order.js';
import * as OrderItemApi from '../../api/order_item.js';
import * as CartApi from '../../api/cart.api.js';
import * as CartItemApi from '../../api/cart_item.api.js';

import { clearCart } from '../../redux/cartSlice';

export default function Checkout() {
    const cartItems = useSelector((state) => state.cart.items);
    const { user } = useSelector(state => state.auth);

    const [total, setTotal] = useState(0);
    const [toggleModal, setToggleModal] = useState(false);
    const [shippingAddress, setShippingAddress] = useState('');
    const controlPlaceOrderButton = useAnimation();
    const controlModal = useAnimation();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handlePlaceOrder = () => {
        setupPlaceOrderButton();
        setToggleModal(!toggleModal);
    };

    const handleToggle = () => {
        setToggleModal(!toggleModal);
    }

    const setupPlaceOrderButton = () => {
        controlPlaceOrderButton.start({
            scale: [1, 0.8, 1.05, 1],
            transition: {
                duration: 0.4,
                ease: 'easeInOut',
                times: [0, 0.3, 0.6, 1]
            },
        });
    };

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
    useEffect(() => {
        if (toggleModal) {
            setupModal(); 
        }
    }, [toggleModal]);

    useEffect(() => {
        const calculatedTotal = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotal(calculatedTotal);
    }, [cartItems]); 

    useEffect(() => {
        const sendOrder = async () => {
            try {
                setLoading(true);
                const resOrder = await OrderApi.createOrder({fk_user_id: user.id, shipping_address: shippingAddress, order_status: 'Ordered'})
                const orderId = resOrder.id;

                cartItems.map( async(item) => {
                    await OrderItemApi.createOrderItem({fk_order_id: orderId, fk_book_variant_id: item.book_variant_id, subtotal: item.price, quantity: item.quantity});
                    await CartItemApi.deleteCartItem(item.cart_item_id);
                });

                console.log('Order Item Created')
            } catch (error) {
                setError(`Error in creating order, ${error}`);
            } finally{
                setLoading(false);
            }
        }
        if (toggleModal) {
            sendOrder();
        }
    }, [toggleModal])

    return (
        <div className="w-full flex-grow py-10 text-accent-black relative bg-primary">
            {toggleModal && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={controlModal}
            className="absolute inset-0 w-full h-full bg-accent-black/40 z-40 flex justify-center items-center"
            >
            <Modal onClick={handleToggle} />
            </motion.div>
            )}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-accent-secondary">Checkout</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Billing Details */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-accent-black">Billing Information</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <input value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} type="text" className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="123 Main St, City, Country" />
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 ">Order Summary</h3>
                        <div className="bg-gray-100 p-4 rounded-md">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <span className="mr-4">Q: {item.quantity}</span>
                                    <div className='flex flex-col gap-1 items-start justify-start'>
                                        <span className='text-accent-secondary'>{item.title}</span>
                                        <span className=' font-light text-sm'>{item.variant}</span>
                                    </div>
                                    <span className="ml-auto">${item.price}</span>
                                </div>
                            ))}
                            <div className="flex justify-between font-semibold border-t pt-2">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                            <AnimatePresence>
                                <motion.button
                                    onClick={handlePlaceOrder}
                                    animate={controlPlaceOrderButton}
                                    className="w-full relative mt-6 bg-blue-600 text-white cursor-pointer py-2 rounded">
                                    Place Order
                                </motion.button>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
