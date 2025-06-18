import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import DeliveryGuy from '../../assets/Delivery_Guy.png';
import DeliveryBG from '../../assets/checkout_bg.png';

export default function Modal({ 
    onClick = () => {}, 
    title = '',
    description = '',
    img = DeliveryGuy,
    enableAnimation = true
}) {
    const controls = useAnimation();

    useEffect(() => {
        if (!enableAnimation) return;

        const sequence = async () => {
            await controls.start({
                x: 0,
                transition: {
                    duration: 1.5,
                    ease: 'easeOut',
                },
            });
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
    }, [controls, enableAnimation]);

    return (
        <div 
            onClick={onClick} 
            className="absolute top-0 left-0 w-full z-50 h-full bg-accent-black/40 flex items-center justify-center px-4"
        >
            <div className="bg-white rounded shadow-lg w-full max-w-5xl h-auto md:h-[400px] flex flex-col md:grid md:grid-cols-[40%_60%] overflow-hidden">
                {/* Text Section */}
                <div className='flex flex-col gap-4 justify-between p-6 border-b-2 md:border-b-0 md:border-r-4 border-accent-secondary'>
                    <h1 className='font-bold text-3xl md:text-4xl text-accent-secondary'>{title}</h1>
                    <p className='font-light text-base md:text-lg'>{description}</p>
                    <p className='font-aladin text-2xl md:text-4xl'>Happy Reading!</p>
                </div>

                {/* Image Section */}
                <div className='relative w-full h-[250px] md:h-full'>
                    <img 
                        src={DeliveryBG} 
                        className='absolute inset-0 w-full h-full object-cover' 
                        alt="Background"
                    />

                    <motion.img
                        initial={{ x: -800, y: 5 }}
                        animate={controls}
                        src={img}
                        alt="Delivery Guy"
                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain h-[120px] sm:h-[180px] md:h-[240px]'
                    />
                </div>
            </div>
        </div>
    );
}