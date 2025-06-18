import React from 'react'
import DefaultImage from '../../assets/library-parallax.jpg'

export default function Banner({
    image = DefaultImage,
    link = '#',
    title = '',
    subtitle = '',
    alt = ''
}) {
    const hasText = title.trim() !== '' || subtitle.trim() !== '';

    return (
        <div className="w-full md:w-[95vw] relative mx-auto shadow-lg overflow-hidden">
            <img src={image} className="w-full h-auto object-cover" alt={alt} />
            
            {hasText && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 px-4 text-center`}>
                    {title && <h1 className="text-xl md:text-3xl font-bold text-shadow-2xs">{title}</h1>}
                    {subtitle && <h2 className="text-lg md:text-2xl text-shadow-2xs">{subtitle}</h2>}
                </div>
            )}
        </div>
    )
}