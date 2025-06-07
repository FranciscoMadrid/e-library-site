import React, { useState } from 'react'
import { animate, AnimatePresence, easeInOut, motion, scale, useInView } from 'framer-motion';

export default function ItemTab({
    item_label = '',
    data = [],
    onClickSearchTerm = () => {}
}) {
    const [toggleItems, setToggleItems] = useState(false);
return (
    <div className='flex flex-col gap-2 items-start p-2'>
        <div className='flex flex-row gap-2 items-center' onClick={() => setToggleItems(!toggleItems)}>
            <h1 className=' font-bold'>{item_label}</h1>
            <motion.i 
                initial={{rotate: 0}}
                animate={{rotate: toggleItems ? 180 : 0}}
                className="fa-solid fa-angle-up"/>
        </div>

        <hr className=' w-[80%]'/>
        {toggleItems && (
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}>
                <div className='flex flex-col gap-2 items-start p-2 font-semibold'>
                    {data.map((item) => (
                        <div key={item.value} onClick={() => onClickSearchTerm(item.label)} className='flex flex-row gap-2 items-center hover:underline cursor-pointer'>
                            <h1>{item.label}</h1>
                        </div>
                    ))}
                </div>
            </motion.div>
        )}
    </div>
)
}
