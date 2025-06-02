import React from 'react'

export default function Searchbar() {
return (
    <section>
        <div className='w-[35vw] mx-auto rounded-2xl relative flex flex-row items-center'>
            <div className='flex absolute items-center p-2'>
                <i className="fa fa-search"></i>
            </div>
            <input
                className='block w-full p-1 ps-8 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary'
                type='text'
            />
        </div>
    </section>
)
}
