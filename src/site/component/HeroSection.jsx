import React from 'react'
import HeroImage from '../../assets/hero_img.jpg'
import { Link, useNavigate } from 'react-router-dom';

export default function HeroSection({
    title = 'Default Title',
    flavor_title = 'Default flavor title',
    button_text = 'Default Button',
    image = HeroImage,
    height = 'h-70'
}) {
return (
    <section className={`w-full mx-auto relative ${height}`}>
        <div className='grid grid-cols-2 items-center h-full w-full'>
            <div className='flex flex-col gap-2 items-start p-6 overflow-hidden'>
                <div className='flex flex-col gap-2 items-start p-6 max-w-7xl mx-auto'>
                    <h1 className="text-accent-primary text-xl md:text-2xl font-borel">{flavor_title}</h1>

                    <h1 className="font-bold text-2xl md:text-6xl font-borel py-4 text-accent-secondary">{title}</h1>
                    
                    <Link to={'/store'} className="bg-accent-primary text-center text-lg text-white cursor-pointer transition ease-in-out duration-200 font-bold p-2 rounded-xl">
                        {button_text}
                    </Link>
                </div>
            </div>

            <div className='relative h-full w-full overflow-hidden'>
                <img className={`object-cover h-full w-full`} src={image} alt="Hero" />            </div>
        </div>
    </section>
)
}
