import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExtraSections = () => { 

    const navigate = useNavigate();

    return (
        <div>
            {/* Featured Dishes Section */}
            <section className="py-10 bg-base-100">
                <div className="container mx-auto text-center mb-8">
                    <h2 className="text-3xl font-bold">Featured Dishes</h2>
                    <p className="text-lg text-gray-600">Explore our special dishes curated by our expert chefs.</p>
                </div>

                {/* Featured Dishes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="card w-full bg-base-200 shadow-xl">
                        <figure><img src="https://media-cdn.tripadvisor.com/media/photo-m/1280/28/38/86/7e/chef-special-pizza-i.jpg" alt="Dish 1" className="w-full h-56 object-cover" /></figure>
                        <div className="card-body text-center">
                            <h3 className="text-xl font-semibold">Chef’s Special Pizza</h3>
                            <p className="text-gray-600">A delicious combination of fresh ingredients and secret spices. A must-try!</p>
                            <button onClick={() => navigate('/allfoods')} className="btn btn-primary">Order Now</button>
                        </div>
                    </div>

                    <div className="card w-full bg-base-200 shadow-xl">
                        <figure><img src="https://media-cdn.tripadvisor.com/media/photo-s/11/dc/6c/75/signature-roll.jpg" alt="Dish 2" className="w-full h-56 object-cover" /></figure>
                        <div className="card-body text-center">
                            <h3 className="text-xl font-semibold">Signature Sushi Roll</h3>
                            <p className="text-gray-600">A hand-crafted sushi roll filled with the freshest ingredients for a memorable experience.</p>
                            <button onClick={() => navigate('/allfoods')} className="btn btn-primary">Order Now</button>
                        </div>
                    </div>

                    <div className="card w-full bg-base-200 shadow-xl">
                        <figure><img src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" alt="Dish 3" className="w-full h-56 object-cover" /></figure>
                        <div className="card-body text-center">
                            <h3 className="text-xl font-semibold">Classic Burger</h3>
                            <p className="text-gray-600">Satisfy your cravings with a juicy, tender burger, fresh veggies, and house-made sauce.</p>
                            <button onClick={() => navigate('/allfoods')} className="btn btn-primary">Order Now</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="py-10 bg-base-100">
                <div className="container mx-auto text-center mb-8">
                    <h2 className="text-3xl font-bold">Customer Reviews</h2>
                    <p className="text-lg text-gray-600">See what our customers are saying about us!</p>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h3 className="font-semibold text-xl">John Doe</h3>
                            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
                            <p className="text-gray-600">"The best pizza I've ever had! Great service and fantastic flavors!"</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h3 className="font-semibold text-xl">Jane Smith</h3>
                            <p className="text-yellow-500">⭐⭐⭐⭐</p>
                            <p className="text-gray-600">"Sushi was fresh and delicious. I will definitely be coming back!"</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h3 className="font-semibold text-xl">Michael Brown</h3>
                            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
                            <p className="text-gray-600">"Amazing atmosphere and the burger was perfect. Highly recommended!"</p>
                        </div>
                    </div>
                </div>

                {/* See All Reviews Button */}
                <div className="text-center mt-8">
                    <button className="btn btn-outline btn-lg">See All Reviews</button>
                </div>
            </section>
        </div>
    );
};

export default ExtraSections;
