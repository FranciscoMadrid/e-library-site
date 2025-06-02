import React from 'react'
import HeroSection from '../component/HeroSection'
import Banner from '../component/Banner'
import ContainerSwiper from '../component/ContainerSwiper'

export default function Home() {
return (
    <div className='w-full mx-auto bg-primary'>
        <div className='border-b-4 border-accent-secondary'>
            <HeroSection 
                flavor_title='Get a Book' 
                title='Live an Adventure' b
                button_text='Explore Now'
                height='h-[400px] md:h-[500px]'/>
        </div>
        <div className='bg-accent-black py-4'>
            <Banner/>
        </div>
        <ContainerSwiper/>
    </div>
)
}
