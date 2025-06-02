import React from 'react';
import Pattern from '../../assets/greek_pattern_style.png';
import { motion } from 'framer-motion';  // <-- fixed import
import "swiper/css";

export default function Banner() {
    const image = Pattern;

return (
    <div className="w-full h-24 overflow-hidden relative">
        <motion.div
            className="flex absolute top-0 left-0 w-[200%] h-full"
            animate={{ x: ["0%", "-50%"] }}  // <-- move by 50%, not 100%
            transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear'
            }}
        >
            <img src={image} alt="scrolling" className="h-full w-1/2 flex-shrink-0 object-cover" />
            <img src={image} alt="scrolling duplicate" className="h-full w-1/2 flex-shrink-0 object-cover" />
        </motion.div>
        </div>
);
}