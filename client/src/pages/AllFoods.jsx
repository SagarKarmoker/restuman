import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllFoodsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data } = useLoaderData();

    // Filter foods based on search query
    const filteredFoods = data.filter((food) =>
        food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Page Title Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-extrabold leading-tight">All Foods</h1>
                    <p className="text-lg mt-4">Discover a wide variety of delicious food items.</p>
                </div>
            </section>

            {/* Search Bar Section */}
            <section className="py-6 px-5">
                <div className="container mx-auto text-center">
                    <input
                        type="text"
                        placeholder="Search for food..."
                        className="input input-bordered w-full max-w-md text-lg shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </section>

            {/* Food Cards Section */}
            <section className="py-10 px-5">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFoods.length === 0 ? (
                        <div className="col-span-full text-center text-xl text-gray-500">
                            No foods found matching your search.
                        </div>
                    ) : (
                        filteredFoods.map((food) => (
                            <div key={food._id} className="card bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                                <figure>
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="w-full h-56 object-cover transform transition duration-300 hover:scale-105"
                                    />
                                </figure>
                                <div className="card-body p-6 text-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{food.foodName}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{food.description}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-semibold text-blue-500">{food.price} USD</span>
                                        <span className="badge badge-primary px-4 py-1 rounded-full text-sm">{food.quantity} Available</span>
                                    </div>
                                    <div className="card-actions justify-center mt-4">
                                        <Link to={`/food/${food._id}`} className="btn btn-primary px-6 py-2 rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-full">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default AllFoodsPage;
