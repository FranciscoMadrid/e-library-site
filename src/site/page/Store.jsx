import React, { useEffect, useState } from 'react'
import BookCard from '../component/BookCard'
import * as BookApi from '../../api/book.api.js';
import * as CategoryApi from '../../api/category.api.js';
import * as VariantApi from '../../api/variant.api.js';
import * as PublisherApi from '../../api/publisher.api.js';
import * as AuthorApi from '../../api/author.api.js';

export default function Store() {
    const [books, setBooks] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [variants, setVariants] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatSelectOption = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [bookData, categoryData, variantData, authorData, publisherData] = await Promise.all(
                [
                    BookApi.getAll(20, null, null, false),
                    CategoryApi.getAll(),
                    VariantApi.getAll(),
                    AuthorApi.getAll(),
                    PublisherApi.getAll()
                ]
            );
            
            setBooks(bookData.data);
            setCategories(formatSelectOption(categoryData, 'category_id', 'category'));
            setAuthors(formatSelectOption(authorData, 'author_id', 'author'));
            setPublishers(formatSelectOption(publisherData, 'publisher_id', 'publisher_name'));
            setVariants(formatSelectOption(variantData, 'variant_id', 'variant_name'));
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
    <section className='w-full mx-auto'>
        <div className='grid grid-cols-[15%_85%] md:grid-cols-[15%_85%]  xl:grid-cols-[10%_90%]'>
            {/* Filter Container */}
            <div className='flex flex-col bg-primary gap-2 items-center p-2 border-r-1 border-accent-black'>
                {/* Categories */}
                <h1 className=' font-bold text-accent-aux'>Categories</h1>
                <hr className=' w-[80%]'/>
                <div className='flex flex-col gap-2 items-start p-2 text-accent-aux font-semibold'>
                    {categories.map((cat) => (
                        <div key={cat.value} className='flex flex-row gap-2 items-center hover:underline cursor-pointer'>
                            <h1>{cat.label}</h1>
                        </div>
                    ))}
                </div>
                {/* Variants */}
                <h1 className=' font-bold text-accent-aux'>Variants</h1>
                <hr className=' w-[80%]'/>
                <div className='flex flex-col gap-2 items-start p-2 text-accent-aux font-semibold'>
                    {variants.map((vat) => (
                        <div key={vat.value} className='flex flex-row gap-2 items-center hover:underline cursor-pointer'>
                            <h1>{vat.label}</h1>
                        </div>
                    ))}
                </div>

                {/* Publishers */}
                <h1 className=' font-bold text-accent-aux'>Publishers</h1>
                <hr className=' w-[80%]'/>
                <div className='flex flex-col gap-2 items-start p-2 text-accent-aux font-semibold'>
                    {publishers.map((pub) => (
                        <div key={pub.value} className='flex flex-row gap-2 items-center hover:underline cursor-pointer'>
                            <h1>{pub.label}</h1>
                        </div>
                    ))}
                </div>
            </div>

            {/* Books Container */}
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 p-2'>
                {books.map(book => (
                    <div key={book.book_id} className='border-b-2'>
                        <BookCard data={book} showPrice={true}/>
                    </div>
                ))}
            </div>
        </div>

    </section>
)
}
