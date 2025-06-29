import React, { useEffect, useState } from 'react'
import * as BookApi from '../../api/book.api.js'
import { useParams } from 'react-router-dom';
import SingleBookItem from '../component/SingleBookItem.jsx';
import ContainerSwiper from '../component/ContainerSwiper.jsx';
import BookCard from '../component/BookCard.jsx';
import BounceLoader from "react-spinners/BounceLoader";

export default function SingleBook() {
    const [book, setBook] = useState([]);
    const [relatedBooks, setRelatedBooks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {id} = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                setError('');
                const bookResponse = await BookApi.getById(id);

                const bookItem = bookResponse.data;

                if (!bookItem) {
                    throw new Error('Book not found.');
                }

                setBook(bookItem);
                console.log(bookItem)

                const categories = bookItem.categories;
                if (!Array.isArray(categories) || categories.length === 0) {
                    throw new Error('No categories available for related books.');
                }

                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                const relatedBookResponse = await BookApi.getAll(8, null, randomCategory.category_name, null);
                setRelatedBooks(relatedBookResponse.data ?? []);
            } catch (error) {
                console.error(error);
                setError("Failed to load book.");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);


return (
    <div className='w-[90vw] mx-auto'>
        {loading &&   
        <div className="flex justify-center my-8">
            <BounceLoader size={50} color="#c6c930" />
        </div>}
        {error && <p>{error}</p>}
        {!loading && !error && 
            <SingleBookItem data={book}/>
        }
        <hr className='p-4'/>
        {loading && 
        <div className="flex text-center items-center my-8 justify-center">
            <BounceLoader size={50} color="#c6c930" />
        </div>}
        {error && <p>{error}</p>}
        {!loading && 
        <ContainerSwiper title='Other books you may like'>    
            {!loading && !error && relatedBooks.map(book => (
            <BookCard key={book.book_id} data={book}/>
            ))}
        </ContainerSwiper>}
    </div>
)
}
