import React, { useEffect, useState } from 'react';
import BookCard from '../component/BookCard';
import PaginationButton from '../component/PaginationButton.jsx';
import ItemTab from '../component/ItemTab.jsx';
import * as BookApi from '../../api/book.api.js';
import * as CategoryApi from '../../api/category.api.js';
import * as VariantApi from '../../api/variant.api.js';
import * as PublisherApi from '../../api/publisher.api.js';
import * as AuthorApi from '../../api/author.api.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { animate, AnimatePresence, easeInOut, motion, scale, useInView } from 'framer-motion';
import BounceLoader from "react-spinners/BounceLoader";

export default function Store() {
    const [books, setBooks] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [variants, setVariants] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [paginationButtons, setPaginationButtons] = useState([]);

    const [hasMounted, setHasMounted] = useState(false);
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    

    const formatSelectOption = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };

    useEffect(() => {
        const fetchFilters = async () => {
        try {
            const [categoryData, variantData, authorData, publisherData] = await Promise.all([
                CategoryApi.getAll(),
                VariantApi.getAll(),
                AuthorApi.getAll(),
                PublisherApi.getAll()
        ]);
            setCategories(formatSelectOption(categoryData, 'category_id', 'category'));
            setAuthors(formatSelectOption(authorData, 'author_id', 'author'));
            setPublishers(formatSelectOption(publisherData, 'publisher_id', 'publisher_name'));
            setVariants(formatSelectOption(variantData, 'variant_id', 'variant_name'));
        } catch (err) {
            setError("Failed to load filter data");
        }
    };

    fetchFilters();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search') || '';
        const pageParam = parseInt(params.get('page')) || 1;

        setSearchTerm(searchParam);
        setCurrentPage(pageParam);
        setHasMounted(true);
    }, [location.search]);

    useEffect(() => {
        if (!hasMounted) return;
        const params = new URLSearchParams();

        if (searchTerm) params.set('search', searchTerm);
        if (currentPage) params.set('page', currentPage);

        const newSearch = `?${params.toString()}`;
        if (location.search !== newSearch) {
            navigate({ search: params.toString() }, { replace: true });
        }
        window.scrollTo({ top: 0 });
    }, [searchTerm, currentPage, hasMounted]);

    useEffect(() => {
        if (!hasMounted) return;
        setCurrentPage(1);
    }, [searchTerm])

    useEffect(() => {
        if (!hasMounted) return;

        const fetchBooks = async () => {
            try {
                setLoading(true);
                setError('');
                const bookData = await BookApi.getAll(30, currentPage, searchTerm, false);
                setBooks(bookData.data);
                setTotalPages(bookData.totalPages);
                setIsMobileFilterVisible(false);
                window.scrollTo({ top: 0});
            } catch (err) {
                setError("Failed to load books");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [currentPage, searchTerm, hasMounted]);

    return (
        <section className='w-full mx-auto relative'>
            <div className='grid grid-cols-1 md:grid-cols-[20%_80%] xl:grid-cols-[10%_90%]'>
                {/* Filter Container */}
                <div className='hidden md:flex flex-col gap-2 items-center p-2 border-r-1 border-accent-black'>
                    {/* Categories */}
                    <h1 className=' font-bold text-accent-aux'>Categories</h1>
                    <hr className=' w-[80%]'/>
                    <div className='flex flex-col gap-2 items-start p-2 text-accent-aux font-semibold'>
                        {categories.map((cat) => (
                            <div key={cat.value} onClick={() => setSearchTerm(cat.label)} className='flex flex-row gap-2 items-center hover:underline cursor-pointer'>
                                <h1>{cat.label}</h1>
                            </div>
                        ))}
                    </div>
                    {/* Variants */}
                    <h1 className=' font-bold text-accent-aux'>Variants</h1>
                    <hr className=' w-[80%]'/>
                    <div className='flex flex-col gap-2 items-start p-2 text-accent-aux font-semibold'>
                        {variants.map((vat) => (
                            <div key={vat.value} onClick={() => setSearchTerm(vat.label)} className='flex flex-row gap-2 items-center hover:underline cursor-pointer'>
                                <h1>{vat.label}</h1>
                            </div>
                        ))}
                    </div>

                    {/* Publishers */}
                    <h1 className=' font-bold text-accent-aux'>Publishers</h1>
                    <hr className=' w-[80%]'/>
                    <div className='flex flex-col gap-2 items-start p-2 text-accent-aux font-semibold'>
                        {publishers.map((pub) => (
                            <div key={pub.value} onClick={() => setSearchTerm(pub.label)} className='flex flex-row gap-2 items-center hover:underline cursor-pointer'>
                                <h1>{pub.label}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Store Front Container */}
                <div className='flex flex-col gap-1 px-6 py-2'>
                    {/* Filter Container */}
                    <div className='flex flex-row gap-2 justify-between items-center'>
                        {searchTerm ? (           
                        <div className='flex flex-row gap-2'>
                            <h1 className='font-bold'>Searches for</h1>
                            <p className='font-light'>"{searchTerm}"</p>
                        </div>) : (<div></div>)}
                        <div className='flex flex-row gap-2 items-center text-xl md:hidden' onClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)}>
                            <h1 className='font-bold'>Filters</h1>
                                <motion.i 
                                    initial={{rotate: 0}}
                                    animate={{rotate: isMobileFilterVisible ? 180 : 0}}
                                    className="fa-solid fa-angle-up"/>
                        </div>
                    </div>

                    {/* Books Container */}
                    <div className='min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2 items-stretch'>
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center h-64">
                                <BounceLoader size={50} color="#c6c930" loading={true} />
                            </div>
                        ) : error ? (
                            <div className="col-span-full text-center text-red-600 font-semibold">
                                {error}
                            </div>
                        ) : books.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">
                                No books found.
                            </div>
                        ) : (
                            books.map(book => (
                                <div key={book.book_id} className='shadow border-2 border-accent-secondary/50'>
                                    <BookCard data={book} showPrice={true} backgroundClr='bg-accent-black/8'/>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
            <div className='flex flex-row gap-2 p-4 items-center justify-center'>
                {Array.from({length: totalPages}, (_, i) => (
                    <PaginationButton key={i}
                        pageNumber={i + 1}
                        currentPage={currentPage}
                        onClick={setCurrentPage}/>
                ))}
            </div>
                {/* Mobile Filter View */}
                {isMobileFilterVisible && (
            <motion.div
                className='md:hidden absolute top-10 right-0 w-[50vw] z-20 border-4 rounded bg-white p-2 border-accent-secondary'
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.15
                        }
                    },
                    hidden: {
                        transition: {
                            staggerChildren: 0.1,
                            staggerDirection: -1
                        }
                    }
                }}
            >
                {[categories, variants, publishers].map((dataSet, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={{
                            hidden: { opacity: 0, y: -10 },
                            visible: (i) => ({
                                opacity: 1,
                                y: 0,
                                transition: { delay: i * 0.1, ease: "easeInOut" }
                            })
                        }}
                    >
                        <ItemTab
                            data={dataSet}
                            item_label={['Categories', 'Variants', 'Publishers'][index]}
                            onClickSearchTerm={setSearchTerm}
                        />
                    </motion.div>
                ))}
            </motion.div>
        )}
        </section>
    )
}