import React from 'react'
import DefaultImage from '../../assets/library-parallax.jpg'
import { Link } from 'react-router-dom'

export default function CategoryItem({
    image = DefaultImage,
    title = 'Default Title'
}) {
return (
    <Link to={{pathname: '/store', search: `?search=${title}`}} className="relative w-full h-72 rounded overflow-hidden">
        <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <h1 className="absolute text-xl md:text-2xl xl:text-4xl inset-0 flex items-center justify-center text-white font-bold pointer-events-none">
            <span className='bg-accent-black/80 p-2 px-4'>
                {title}
            </span>
        </h1>
    </Link>
)
}
