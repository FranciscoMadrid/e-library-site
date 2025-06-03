import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function BookCard({ data }) {
    const { title, authors, categories, book_variant } = data;
    const firstVariant = Array.isArray(book_variant) && book_variant.length > 0
        ? book_variant[0]
        : null;

    const firstVariantImages = firstVariant?.images || [];

    return (
        <div className='w-full h-full p-2'>
            <div className='flex flex-col gap-2 items-center'>
                <h1 className='font-bold text-lg text-accent-secondary text-shadow'>{title}</h1>
                <h1 className='font-light'>{authors.map((auth) => auth.author).join(', ')}</h1>

                {firstVariant.images.length === 1 ? (
                    <section className="w-64 h-64 md:w-74 md:h-74 border-2 border-primary">
                        <img
                            src={firstVariantImages[0].image_path}
                            alt={firstVariantImages[0].alt_text}
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
                        pagination={{ clickable: true }}
                        keyboard
                        className="w-64 h-64 md:w-74 md:h-74 border-2 border-primary"
                    >
                        {firstVariantImages.map((img, index) => (
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
            </div>
        </div>
    );
}