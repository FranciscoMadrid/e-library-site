import React, { useEffect, useState } from 'react'
import HeroSection from '../component/HeroSection'
import Banner from '../component/Banner'
import ContainerSwiper from '../component/ContainerSwiper'
import BookCard from '../component/BookCard.jsx'
import * as BookApi from '../../api/book.api.js'

export default function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [bookData] = await Promise.all(
                [BookApi.getAll(8, null, null, true)]
            );
            
            bookData.data.sort((a, b) => b.book_id - a.book_id);
            setBooks(bookData.data);
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
            <Banner />
        </div>

        <ContainerSwiper title='Newly added'>
            {loading && <p>Loading books...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && books.map(book => (
            <BookCard key={book.book_id} data={book}/>
            ))}
        </ContainerSwiper>
    </div>
    )
}