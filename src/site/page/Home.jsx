import React, { useEffect, useState } from 'react';
import HeroSection from '../component/HeroSection';
import Banner from '../component/Banner.jsx';
import BannerLoop from '../component/BannerLoop.jsx';
import CategoryContainer from '../component/CategoryContainer.jsx';
import ContainerSwiper from '../component/ContainerSwiper';
import BookCard from '../component/BookCard.jsx';
import FadeInWrapper from '../component/FadeInWrapper.jsx';
import * as BookApi from '../../api/book.api.js';
import BounceLoader from "react-spinners/BounceLoader";

import BannerImage1 from '../../assets/32458_Skinny_ForgeryOfFate.jpg';
import BannerImage2 from '../../assets/Banner-E-Book.png';

export default function Home() {
    const [newBooks, setNewBooks] = useState([]);
    const [fantasyBooks, setFantasyBooks] = useState([]);
    const [dramaBooks, setDramaBooks] = useState([]);
    const [romanceBooks, setRomanceBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
    const fetchData = async () => {
    try {
        const [bookDataNew, bookDataFantasy, bookDataDrama, bookDataRomance] = await Promise.all([
        BookApi.getAll(8, null, null, true),
        BookApi.getAll(8, null, 'Fantasy', true),
        BookApi.getAll(8, null, 'Drama', true),
        BookApi.getAll(8, null, 'Romance', true),
        ]);

        bookDataNew.data.sort((a, b) => b.book_id - a.book_id);
        bookDataFantasy.data.sort((a, b) => b.book_id - a.book_id);
        bookDataDrama.data.sort((a, b) => b.book_id - a.book_id);
        bookDataRomance.data.sort((a, b) => b.book_id - a.book_id);

        setNewBooks(bookDataNew.data);
        setFantasyBooks(bookDataFantasy.data);
        setDramaBooks(bookDataDrama.data);
        setRomanceBooks(bookDataRomance.data);
    } catch (error) {
        console.error(error);
        setError('Failed to load data');
    } finally {
    setLoading(false);
    }
    };
    fetchData();
}, []);

    return (
        <div className='w-full mx-auto bg-primary'>

            <div className='border-b-4 border-accent-secondary'>
                <HeroSection 
                    flavor_title='Get a Book' 
                    title='Live an Adventure'
                    button_text='Explore Now'
                    height='h-[400px] md:h-[500px]'
                />
            </div>

            <div className='bg-accent-black py-4'>
                <BannerLoop />
            </div>

            {loading && (
            <div className="flex text-center items-center my-8 justify-center h-40">
                <BounceLoader size={50} color="#c6c930" />
            </div>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && (
            <FadeInWrapper delay={0.1}>
                <ContainerSwiper title='Newly added'>    
                {newBooks.map(book => (
                    <BookCard key={book.book_id} data={book} />
                ))}
                </ContainerSwiper>
            </FadeInWrapper>
            )}

            <FadeInWrapper delay={0.2}>
            <Banner image={BannerImage1} alt='A beauty and the Beast Retelling featuring Chinese folklore.' />
            </FadeInWrapper>

            {!loading && (
            <FadeInWrapper delay={0.3}>
                <ContainerSwiper title='Fantasy Books'>    
                {fantasyBooks.map(book => (
                    <BookCard key={book.book_id} data={book} />
                ))}
                </ContainerSwiper>
            </FadeInWrapper>
            )}

            {!loading && (
            <FadeInWrapper delay={0.4}>
                <ContainerSwiper title='Drama Books'>    
                {dramaBooks.map(book => (
                    <BookCard key={book.book_id} data={book} />
                ))}
                </ContainerSwiper>
            </FadeInWrapper>
            )}

            <FadeInWrapper delay={0.5}>
                <Banner image={BannerImage2} title='Coming Soon' subtitle='Our collection in E-Book format'/>
            </FadeInWrapper>

            {!loading && (
            <FadeInWrapper delay={0.6}>
                <ContainerSwiper title='Romance Books'>    
                {romanceBooks.map(book => (
                    <BookCard key={book.book_id} data={book} />
                ))}
                </ContainerSwiper>
            </FadeInWrapper>
            )}

            <FadeInWrapper delay={0.7}>
            <div className='w-[90vw] mx-auto py-2'>
                <CategoryContainer />
            </div>
            </FadeInWrapper>

        </div>
    );
}