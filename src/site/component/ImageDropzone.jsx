import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ onImagesChange, existingImages = [] }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(existingImages.map(file => ({
        file,
        preview: typeof file === 'string' ? file : URL.createObjectURL(file)
        })));
    }, [existingImages]);

    const onDrop = useCallback((acceptedFiles) => {
        const newPreviews = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
        }));

        const newImages = [...images, ...newPreviews];
        setImages(newImages);
        onImagesChange(newImages.map(img => img.file));
    }, [images, onImagesChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
        'image/*': []
        },
        multiple: true
    });

    return (
        <div className="w-full p-4 border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-blue-400 transition-colors"
            {...getRootProps()}>
        <input {...getInputProps()} />
        {
            isDragActive ?
            <p className="text-center text-gray-600">Drop the images here...</p> :
            <p className="text-center text-gray-500">Drag and drop images here, or click to select files</p>
        }

        <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((img, index) => (
            <div key={index} className="w-full aspect-square overflow-hidden rounded border">
                <img
                src={img.preview}
                alt={`Preview ${index}`}
                className="object-cover w-full h-full"
                onLoad={() => typeof img.preview === 'string' && URL.revokeObjectURL(img.preview)}
                />
            </div>
            ))}
        </div>
        </div>
    );
    };

export default ImageDropzone;