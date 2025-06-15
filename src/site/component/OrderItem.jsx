// components/OrderItem.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OrderStatus from './OrderStatus';

export default function OrderItem({ item, index, orderItem, total }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index}
            className='flex flex-col gap-2 overflow-hidden relative bg-white rounded-2xl shadow-xl'>
            {/* Upper Card Info */}
            <div className='grid grid-cols-4 gap-2 bg-[#eff2f2] p-2'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-gray-400'>Order placed</h1>
                    <h1>{new Date(item.order_date).toLocaleDateString('en-GB')}</h1>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-gray-400'>Total</h1>
                    <h1>${total}</h1>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-gray-400'>Shipped to:</h1>
                    <h1>{item.shipping_address}</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-gray-400'>Order ID:</h1>
                    <h1>{item.order_id}</h1>
                </div>

            </div>

            <div className='px-4 py-2 text-lg space-y-3'>
                {item.order_items.map((i, index) => (
                    <div key={index} className='grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-2 justify-evenly border-accent-aux/20'>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 items-center'>
                            <div className='flex justify-center'>
                                <img
                                    src={orderItem[i.fk_book_variant_id]?.book_variant[0].images[0].image_path}
                                    className='h-[190px] w-[125px] md:h-[250px] md:w-[170px] transition-all ease-in-out duration-500 object-cover rounded p-2 bg-gray-200'
                                    alt='Book'
                                />
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <h1 className='text-accent-secondary'>
                                    {orderItem[i.fk_book_variant_id]?.title}
                                </h1>
                                <p>{orderItem[i.fk_book_variant_id]?.book_variant[0].variant}</p>
                                <Link to={{ pathname: `/store/${orderItem[i.fk_book_variant_id]?.book_id}`,}} className='p-2 bg-accent-primary text-sm text-center hover:bg-accent-primary/80 text-white rounded my-auto'>
                                    View Item
                                </Link>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-accent-secondary'>Quanity:</h1>
                                    <p>{i.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <OrderStatus currentStep={1}/>
            </div>
        </motion.div>
    );
}
