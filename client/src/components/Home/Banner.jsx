import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to All Foods page

const BannerSection = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/allfoods');
    };

    return (
        <section className="relative">
            {/* Banner Slider */}
            <div className="carousel w-full h-[400px] lg:h-[600px] rounded-3xl">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://st4.depositphotos.com/4590583/28898/i/450/depositphotos_288989496-stock-photo-banner-food-top-view-free.jpg"
                        alt="Banner 1"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
                        <h2 className="text-4xl font-bold">Discover the Best Foods</h2>
                        <p className="mt-4 text-xl">Explore our curated collection of the most delicious dishes from around the world.</p>
                        <button
                            onClick={handleRedirect}
                            className="btn btn-primary mt-6 px-6 py-3 text-lg"
                        >
                            Explore All Foods
                        </button>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://thumbs.dreamstime.com/b/healthy-food-background-fresh-salmon-fish-vegetables-berries-nuts-top-view-banner-closeup-healthy-food-background-140780969.jpg"
                        alt="Banner 2"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
                        <h2 className="text-4xl font-bold">Healthy & Tasty Meals</h2>
                        <p className="mt-4 text-xl">Indulge in healthy meals that don’t compromise on taste and quality.</p>
                        <button
                            onClick={handleRedirect}
                            className="btn btn-primary mt-6 px-6 py-3 text-lg"
                        >
                            Explore All Foods
                        </button>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://t3.ftcdn.net/jpg/09/10/35/70/360_F_910357060_bsCm8hLwyCHZ0BzIKERTloH9y3KXMz4A.jpg"
                        alt="Banner 3"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
                        <h2 className="text-4xl font-bold">Special Offers & Discounts</h2>
                        <p className="mt-4 text-xl">Get exclusive offers on the best food items, only for you.</p>
                        <button
                            onClick={handleRedirect}
                            className="btn btn-primary mt-6 px-6 py-3 text-lg"
                        >
                            Explore All Foods
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <a href="#slide1" className="btn btn-sm btn-circle mr-2">•</a>
                <a href="#slide2" className="btn btn-sm btn-circle mr-2">•</a>
                <a href="#slide3" className="btn btn-sm btn-circle">•</a>
            </div>
        </section>
    );
};

export default BannerSection;
