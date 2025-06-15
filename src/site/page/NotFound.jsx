import React from 'react'
import NotFoundLogo from '../../assets/404.png';

export default function NotFound() {
return (
    <div className='flex flex-grow items-center justify-center'>
        <img src={NotFoundLogo} className='object-cover h-[600px]'/>
    </div>
)
}
