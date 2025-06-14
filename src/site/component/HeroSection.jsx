import React from 'react'
import HeroImage from '../../assets/hero_img.jpg'

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
                    <h1 className="text-accent-primary text-lg md:text-xl font-borel">{flavor_title}</h1>

                    <h1 className="font-bold text-3xl md:text-6xl font-borel py-4 text-accent-secondary">{title}</h1>
                    
                    <button className="bg-accent-primary mt-6 text-sm text-white hover:bg-accent-primary/50 cursor-pointer transition ease-in-out duration-200  font-bold p-2 rounded-xl">
                        {button_text}
                    </button>
                </div>
            </div>

            <div className='relative h-full w-full overflow-hidden'>
                <img className={`object-cover h-full w-full`} src={image} alt="Hero" />
                <div className="h-[80px] w-[60px] md:h-[120px] md:w-[80px] bg-primary/70 absolute top-1/2 left-0 transform -translate-y-1/2 [clip-path:polygon(0_0,100%_50%,0_100%)]"/>
            </div>
        </div>
    </section>
)
}
