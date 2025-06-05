import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function BookCard({ data, showPrice = false }) {
    const { title, authors, categories, book_variant, book_id } = data;
    const firstVariant = Array.isArray(book_variant) && book_variant.length > 0
        ? book_variant[0]
        : null;

    const firstVariantImages = firstVariant?.images || [];

    return (
        <div className="w-full max-w-xs mx-auto p-2 relative overflow-hidden"> 
            <Link to={{pathname: `/store/${book_id}`}} className="flex flex-col gap-2 items-center">
                <h1 className="font-bold text-center truncate w-[16vw] text-accent-secondary text-shadow">{title}</h1>
                <h1 className="font-light">{authors.map((auth) => auth.author).join(', ')}</h1>

                {firstVariantImages.length === 1 ? (
                    <section className="w-full h-64 md:h-72">
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
                        keyboard
                        className="w-full h-64 md:h-72"
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
                {showPrice ? (
                    <h1 className='font-light'><strong className='font-semibold'>Cost: </strong> ${firstVariant.price}</h1>
                ) : (
                    ''
                )}
            </Link>
        </div>
    );
}