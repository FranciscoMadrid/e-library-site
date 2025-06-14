import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import DeliveryGuy from '../../assets/Delivery_Guy.png';
import DeliveryBG from '../../assets/checkout_bg.png';

export default function Modal({ onClick = () => {} }) {
    const controls = useAnimation();

    useEffect(() => {
    const sequence = async () => {
        // Entrance animation
        await controls.start({
        x: 0,
        transition: {
            duration: 1.5,
            ease: 'easeOut',
        },
        });

        // Idle loop animation - starts exactly where entrance ended
        controls.start({
        x: [0, 10, -15, 5, 0],
        transition: {
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            times: [0, 0.25, 0.5, 0.75, 1],
        },
        });
    };

    sequence();
    }, [controls]);

    return (
        <div onClick={onClick} className="absolute top-0 left-0 w-full z-250 h-full bg-accent-black/40 flex items-center justify-center">
        <div className="bg-white rounded shadow-lg w-[80vw] h-[400px] grid grid-cols-[40%_60%]">
            <div className='flex flex-col gap-2 justify-between h-full border-r-4 p-4  border-accent-secondary'>
                <h1 className='font-bold text-4xl text-accent-secondary'>Order Completed</h1>
                <p className=' font-light text-lg'>We will get your package soon, check 'Your Orders' to check the status of your order.</p>
                <p className=' font-aladin text-4xl'>Happy Reading!</p>
            </div>

            <div className='w-full h-full relative overflow-hidden'>
                <img src={DeliveryBG} className='object-cover w-full h-full' />

                <motion.img
                    initial={{ x: -800, y: 5 }}
                    animate={controls}
                    src={DeliveryGuy}
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-auto h-[200px] md:h-[300px]'/>
            </div>
        </div>
        </div>
    );
}