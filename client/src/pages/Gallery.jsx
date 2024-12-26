import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const images = [
    { src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 1', name: 'John Doe', description: 'Beautiful scenery' },
    { src: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 2', name: 'Jane Smith', description: 'Amazing sunset' },
    { src: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 3', name: 'Alice Brown', description: 'City lights' },
    { src: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 4', name: 'Bob White', description: 'Mountain view' },
    { src: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 5', name: 'Emma Green', description: 'Beach paradise' },
    { src: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 6', name: 'Liam Black', description: 'Forest trail' },
    { src: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 7', name: 'Olivia Blue', description: 'Sunset on the ocean' },
    { src: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 8', name: 'James Purple', description: 'Starry night sky' },
    { src: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 9', name: 'Sophia Red', description: 'Snowy mountain' },
    { src: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Image 10', name: 'William Gold', description: 'Autumn leaves' },
];

function Gallery() {
    const [openLightbox, setOpenLightbox] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setOpenLightbox(true);
    };

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            {/* Title Section */}
            <div className="text-center py-16 bg-gray-900 text-white rounded-xl">
                <h1 className="text-4xl font-bold">Demo Gallery</h1>
            </div>

            {/* Gallery Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg"
                        onClick={() => handleImageClick(index)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-56 object-cover transform transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">{image.name}</h3>
                                <p className="text-sm">{image.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {openLightbox && (
                <Lightbox
                    open={openLightbox}
                    index={currentIndex}
                    close={() => setOpenLightbox(false)}
                    slides={images.map((image) => image.src)}
                />
            )}
        </div>
    );
}

export default Gallery;
