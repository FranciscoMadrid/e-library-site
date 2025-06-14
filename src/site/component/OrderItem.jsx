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
            className='flex flex-col gap-2 overflow-hidden relative bg-white rounded-2xl shadow-xl'
        >
            <div className='flex flex-row gap-2 p-2 text-lg'>
                <h1 className='text-gray-500'>
                    Ordered on: {new Date(item.order_date).toLocaleDateString('en-GB')}
                </h1>
                <p className='text-right'>
                    {new Date(item.order_date).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>

            <div className='px-4 py-2 text-lg space-y-3'>
                <h1 className='pb-2'>Shipping Address: {item.shipping_address}</h1>
                {item.order_items.map((i, index) => (
                    <div
                        key={index}
                        className='grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-2 justify-evenly border-accent-aux/20'
                    >
                        <div className='flex flex-col gap-1 items-start'>
                            <h1 className='text-accent-secondary'>
                                {orderItem[i.fk_book_variant_id]?.title}
                            </h1>
                            <p>{orderItem[i.fk_book_variant_id]?.book_variant[0].variant}</p>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-row gap-2 items-center'>
                                <img
                                    src={orderItem[i.fk_book_variant_id]?.book_variant[0].images[0].image_path}
                                    className='h-28 w-18 object-cover rounded'
                                    alt='Book'
                                />
                                <Link
                                    to={{
                                        pathname: `/store/${orderItem[i.fk_book_variant_id]?.book_id}`,
                                    }}
                                    className='p-2 bg-accent-primary text-sm text-center hover:bg-accent-primary/80 text-white rounded my-auto'
                                >
                                    View Item
                                </Link>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-evenly'>
                                <p> Q: {i.quantity} </p>
                                <p> Subtotal: ${i.subtotal * i.quantity} </p>
                            </div>
                        </div>
                    </div>
                ))}
                <OrderStatus currentStep={1}/>
            </div>


            <div className='px-4 py-2 bg-blue-600 text-white text-lg'>
                <h1>Total: ${total[item.order_id]}</h1>
            </div>
        </motion.div>
    );
}
