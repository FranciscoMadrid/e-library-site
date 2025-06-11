import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard, Scrollbar, Autoplay } from 'swiper/modules';

export default function ContainerSwiper({title = 'Default Title',children}) {
    const [swiperKey, setSwiperKey] = useState(0);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (children && React.Children.count(children) > 0) {
            setSwiperKey(prev => prev + 1);
        }
    }, [children]);

    const handleSwiper = (swiper) => {
        swiperRef.current = swiper;
    };

    const handleSlideChange = (swiper) => {

        if (swiper.activeIndex < 2) {
        swiper.slideTo(2);
        }
    };

    return (
        <div className='flex flex-col gap-2 p-4 items-center justify-between'>
            <h1 className='p-2 font-bold text-2xl'>{title}</h1>
            <hr className='h-1 w-[75vw] text-secondary bg-secondary' />

            <Swiper
                key={swiperKey}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Scrollbar, Autoplay]}
                spaceBetween={20}
                initialSlide={2}
                slidesPerView={1}
                autoplay={{
                delay: 3500,
                disableOnInteraction: true,
                }}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                scrollbar={{ hide: true }}
                className='w-full'
                breakpoints={{
                360: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                1366: {
                    slidesPerView: 5,
                },
                }}
            >
                {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
    }