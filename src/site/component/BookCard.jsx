import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function BookCard({ data, showPrice = false, backgroundClr = '' }) {
    const { title, authors, book_variant = [], book_id } = data;

    // Get first variant safely
    const firstVariant = Array.isArray(book_variant) && book_variant.length > 0
        ? book_variant[0]
        : null;

    const images = firstVariant?.images || [];

    return (
        <div className="w-full max-w-xs mx-auto p-2 relative overflow-hidden"> 
            <Link to={{ pathname: `/store/${book_id}` }} className={`flex flex-col p-2 ${backgroundClr} rounded-2xl gap-2 items-center`}>
                {images.length === 1 ? (
                    <section className="w-full h-64 md:h-72">
                        <img
                            src={images[0].image_path}
                            alt={images[0].alt_text}
                            className="w-full h-full object-contain"
                        />
                    </section>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        spaceBetween={10}
                        slidesPerView={1}
                        loop={true}
                        navigation
                        keyboard
                        className="w-full h-64 md:h-72"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex items-center justify-center w-full h-full"
                            >
                                <img
                                    src={img.image_path}
                                    alt={img.alt_text}
                                    className="w-full h-full object-contain"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </Link>
            <div className='flex flex-col gap-2 py-2 border-b-2'>
                <div className='flex flex-col gap-2'>
                    <h1 className="font-bold truncate w-full text-accent-secondary text-shadow">{title}</h1>
                    <h1 className="font-light">{authors.map((auth) => auth.author).join(', ')}</h1>
                </div>
                {showPrice && firstVariant ? (
                    <h1 className='font-light'>
                        <strong className='font-semibold'>Cost: </strong> ${firstVariant.price}
                    </h1>
                ) : null}
            </div>
        </div>
    );
}