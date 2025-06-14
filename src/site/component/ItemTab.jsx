import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

export default function ItemTab({
    item_label = '',
    data = [],
    onClickSearchTerm = () => {}
}) {
    const [toggleItems, setToggleItems] = useState(false);

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <div className='flex flex-col gap-2 items-start p-2'>
            <div className='flex flex-row gap-2 items-center' onClick={() => setToggleItems(!toggleItems)}>
                <h1 className='font-bold'>{item_label}</h1>
                <motion.i 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: toggleItems ? 180 : 0 }}
                    transition={{ duration: 0.1 }}
                    className="fa-solid fa-angle-up"
                />
            </div>

            <hr className='w-[80%]' />
            <AnimatePresence>
                {toggleItems && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className='flex flex-col gap-2 items-start p-2 font-semibold'>
                            {data.map((item, index) => (
                                <motion.div
                                    key={item.value}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={itemVariants}
                                    className='flex flex-row gap-2 items-center hover:underline cursor-pointer'
                                    onClick={() => onClickSearchTerm(item.label)}
                                >
                                    <h1 className='font-light'>{item.label}</h1>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}