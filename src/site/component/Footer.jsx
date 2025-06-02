import React from 'react'

export default function Footer() {
return (
        <footer className='w-full h-full bg-secondary border-t-4 border-accent-secondary'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto'>
            
            <div className='flex flex-col gap-2 items-start text-white text-lg'>
                <h1 className='font-bold text-lg text-accent-secondary'>Support / Policies</h1>
                <p className=' cursor-pointer'>Terms of Services</p>
                <p className=' cursor-pointer'>Privacy Policy</p>
            </div>

            <div className='flex flex-col gap-2 items-start text-white text-lg'>
                <h1 className='font-bold text-lg text-accent-secondary'>Socials</h1>
                <a href='#' className='flex flex-row gap-2 items-center justify-between'>
                    <i className="fa-brands fa-youtube"></i>
                    <h1>Youtube</h1>
                </a>

                <a href='#' className='flex flex-row gap-2 items-center justify-between'>
                    <i className="fa-brands fa-x-twitter"></i>
                    <h1>Twitter</h1>
                </a>

                <a href='#' className='flex flex-row gap-2 items-center justify-between'>
                    <i className="fa-brands fa-instagram"></i>
                    <h1>Instagram</h1>
                </a>
            </div>
            
            

            <div className='flex flex-col gap-3 items-start justify-between text-white'>
                <h1 className='font-bold text-lg text-accent-secondary'>NewsLetter</h1>
                <p className='font-light'>Subscribe to receive updates, access to exclusive deals, and more.</p>
                <input type='text' className='w-full border-2 rounded p-1 text-white border-white/20'/>
                <button className='p-3 cursor-pointer transition duration-200 ease-in-out bg-accent-secondary hover:bg-accent-secondary/50 text-accent-black font-semibold'>Subscribe</button>
            </div>

            <hr className='h-2 col-span-full text-secondary/20'/>

            <div className='flex flex-col gap-2 items-center justify-center col-span-full text-secondary/60'>
                <p>© 2025, Francisco Madrid</p>
                <p>All Rights Reserved</p>
            </div>
        </div>
    </footer>
)
}
