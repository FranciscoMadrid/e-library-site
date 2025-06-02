import React, { useEffect, useState } from 'react';
import * as CategoryApi from '../../api/category.api.js';
import * as AuthorApi from '../../api/author.api.js';
import * as PublisherApi from '../../api/publisher.api.js';
import * as VariantApi from '../../api/variant.api.js';
import * as BookApi from '../../api/book.api.js';
import Select from 'react-select';
import ImageDropzone from '../component/ImageDropzone.jsx';

export default function Helper() {
    const [bookTitle, setBookTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [variants, setVariants] = useState([]);
    const [publicationDate, setPublicationDate] = useState('');

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedPublishers, setSelectedPublishers] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);

    const [dropzones, setDropzones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatSelectOption = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };

    useEffect(() => {
        setDropzones(prev => {
            const existingIds = prev.map(dz => dz.id);
            const newDropzones = selectedVariants
                .filter(variant => !existingIds.includes(variant.value))
                .map(variant => ({ id: variant.value, images: [] }));
            return [...prev, ...newDropzones];
        });
    }, [selectedVariants]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryData, authorData, publisherData, variantData] = await Promise.all([
                    CategoryApi.getAll(),
                    AuthorApi.getAll(),
                    PublisherApi.getAll(),
                    VariantApi.getAll()
                ]);

                setCategories(formatSelectOption(categoryData, 'category_id', 'category'));
                setAuthors(formatSelectOption(authorData, 'author_id', 'author'));
                setPublishers(formatSelectOption(publisherData, 'publisher_id', 'publisher_name'));
                setVariants(formatSelectOption(variantData, 'variant_id', 'variant_name'));
            } catch (error) {
                console.error(error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleImageChange = (id, images) => {
        setDropzones(prev =>
            prev.map(dz => (dz.id === id ? { ...dz, images } : dz))
        );
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    dropzones.forEach(dz => {
        dz.images.forEach(img => {
            formData.append(`variant_${dz.id}[]`, img);
        });
    });

    try {
        const uploadRes = await fetch('http://localhost:4000/upload-multiple', {
            method: 'POST',
            body: formData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
            alert('Image upload failed');
            return;
        }

        const variantImages = Object.entries(uploadResult.uploaded).flatMap(([variantId, urls]) =>
            urls.map(url => ({
                fk_variant_id: parseInt(variantId),
                image_path: url,
                alt_text: url.split('/').pop()
            }))
        );

        const payload = {
            title: bookTitle,
            publication_date: publicationDate,
            category: selectedCategories.map(c => c.value),
            author: selectedAuthors.map(a => a.value),
            publisher: selectedPublishers.map(p => p.value),
            variant: selectedVariants.map(v => ({
                fk_variant_id: v.value,
                price: parseFloat(v.price) || 0
            })),
            image: variantImages
        };

        console.log("Final Payload:", payload);

        const res = await BookApi.createBook(payload);
        alert('Book submitted successfully!');
        console.log('Response:', res);
    } catch (err) {
        console.error(err);
        alert('Unexpected error during submission');
    }
};

    return (
        <div className='w-full h-full mx-auto items-center justify-center flex p-20'>
            <div className='p-6 border-2 rounded-xl'>
                <form className='w-[600px]' onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-2 items-center w-full'>
                        <h1>Book Title</h1>
                        <input type='text' value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className='border-2 border-accent-black p-1 w-full' />
                    </div>
                    <div className='flex flex-row gap-2 items-center w-full'>
                        <h1>Publication Date</h1>
                        <input type='date' value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} className='border-2 border-accent-black p-1 w-full' />
                    </div>

                    <div className='flex flex-col items-center justify-between w-full space-y-4'>

                        <div className='flex flex-col w-full'>
                            <label className='mb-1 font-semibold'>Categories</label>
                            <Select
                                isMulti
                                name='category'
                                options={categories}
                                value={selectedCategories}
                                onChange={setSelectedCategories}
                                className='w-full'
                                classNamePrefix='select'
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='mb-1 font-semibold'>Authors</label>
                            <Select
                                isMulti
                                name='author'
                                options={authors}
                                value={selectedAuthors}
                                onChange={setSelectedAuthors}
                                className='w-full'
                                classNamePrefix='select'
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='mb-1 font-semibold'>Publishers</label>
                            <Select
                                isMulti
                                name='publisher'
                                options={publishers}
                                value={selectedPublishers}
                                onChange={setSelectedPublishers}
                                className='w-full'
                                classNamePrefix='select'
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='mb-1 font-semibold'>Book Variants</label>
                                <Select
                                    isMulti
                                    name='variant'
                                    options={variants}
                                    value={selectedVariants}
                                    onChange={(values) => {
                                        setSelectedVariants(prev =>
                                            values.map(v => {
                                                const existing = prev.find(p => p.value === v.value);
                                                return existing || { ...v, price: '' }; // preserve existing price or set empty
                                            })
                                        );
                                    }}
                                    className='w-full'
                                    classNamePrefix='select'
                                />
                        </div>

                        {selectedVariants.map((variant) => {
                            const dz = dropzones.find(d => d.id === variant.value);
                            return (
                                <div key={variant.value} className='flex flex-col gap-2 items-center border-b-2 p-4'>
                                    <p className='font-semibold'>{variant.label}</p>

                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={variant.price}
                                        onChange={(e) => {
                                            const updated = selectedVariants.map(v =>
                                                v.value === variant.value ? { ...v, price: e.target.value } : v
                                            );
                                            setSelectedVariants(updated);
                                        }}
                                        className="border border-gray-400 p-1 w-full"
                                    />

                                    <ImageDropzone
                                        onImagesChange={(images) => handleImageChange(variant.value, images)}
                                        existingImages={dz?.images || []}
                                    />
                                </div>
                            );
                        })}

                        <button
                            type='submit'
                            className='p-2 text-white bg-accent-primary font-bold rounded-2xl w-40 transition duration-150 hover:bg-accent-black cursor-pointer'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}