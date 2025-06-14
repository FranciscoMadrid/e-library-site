import React, { useEffect, useState } from 'react';
import HeroSection from '../component/HeroSection';
import Banner from '../component/Banner.jsx';
import BannerLoop from '../component/BannerLoop.jsx';
import CategoryContainer from '../component/CategoryContainer.jsx';
import ContainerSwiper from '../component/ContainerSwiper';
import BookCard from '../component/BookCard.jsx';
import * as BookApi from '../../api/book.api.js';
import BounceLoader from "react-spinners/BounceLoader";

import BannerImage1 from '../../assets/32458_Skinny_ForgeryOfFate.jpg'
import BannerImage2 from '../../assets/e-book-banner.png'

export default function Home() {
    const [newBooks, setNewBooks] = useState([])
    const [fantasyBooks, setFantasyBooks] = useState([])
    const [dramaBooks, setDramaBooks] = useState([])
    const [romanceBooks, setRomanceBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

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
            console.error(error)
            setError('Failed to load data')
        } finally {
            setLoading(false)
        }
        }
        fetchData()
    }, [])

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


        {loading && 
        <div className="flex text-center items-center my-8 justify-center h-40">
            <BounceLoader size={50} color="#c6c930" />
        </div>}
        {error && <p>{error}</p>}
        {!loading && 
        <ContainerSwiper title='Newly added'>    
            {!loading && !error && newBooks.map(book => (
            <BookCard key={book.book_id} data={book}/>
            ))}
        </ContainerSwiper>}

        <Banner image={BannerImage1}/>


        {loading && 
        <div className="flex text-center items-center my-8 justify-center h-40">
            <BounceLoader size={50} color="#c6c930" />
        </div>}
        {error && <p>{error}</p>}
        {!loading && 
        <ContainerSwiper title='Fantasy Books'>    
            {!loading && !error && fantasyBooks.map(book => (
            <BookCard key={book.book_id} data={book}/>
            ))}
        </ContainerSwiper>}

        {loading && 
        <div className="flex text-center items-center my-8 justify-center h-40">
            <BounceLoader size={50} color="#c6c930" />
        </div>}
        {error && <p>{error}</p>}
        {!loading && 
        <ContainerSwiper title='Drama Books'>    
            {!loading && !error && dramaBooks.map(book => (
            <BookCard key={book.book_id} data={book}/>
            ))}
        </ContainerSwiper>}



        <Banner image={BannerImage2}/>

        {loading && 
        <div className="flex text-center items-center my-8 justify-center h-40">
            <BounceLoader size={50} color="#c6c930" />
        </div>}
        {error && <p>{error}</p>}
        {!loading && 
        <ContainerSwiper title='Romance Books'>    
            {!loading && !error && romanceBooks.map(book => (
            <BookCard key={book.book_id} data={book}/>
            ))}
        </ContainerSwiper>}

        <div className='w-[90vw] mx-auto py-2'>
            <CategoryContainer/>
        </div>

    </div>
    )
}