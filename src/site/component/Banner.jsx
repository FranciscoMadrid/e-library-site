import React from 'react'
import DefaultImage from '../../assets/library-parallax.jpg'
export default function Banner({
    image = DefaultImage,
    link = '#'
}) {
return (
    <div className='w-full w-20 md:w-[65vw] h-auto relative mx-auto shadow-lg'>
        <img src={image} className='w-full h-auto object-contain object-center' />
    </div>
    )
}
