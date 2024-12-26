import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export default function Food() {
    const { user } = useContext(AuthContext);
    const food = useLoaderData();
    const navigate = useNavigate(); 

    const {
        foodName,
        foodImage,
        foodCategory,
        quantity,
        price,
        foodOrigin,
        shortDescription,
        purchaseCount,
        addBy,
        _id
    } = food.data;

    // Handle the Purchase Button Click
    const handlePurchaseClick = () => {
        navigate(`/purchase-food/${_id}`);
    };

    if(!food) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            {/* Food Details Container */}
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl">
                {/* Food Image Section */}
                <div className="flex justify-center mb-6">
                    <img
                        src={foodImage}
                        alt={foodName}
                        className="w-full h-96 object-cover rounded-lg shadow-xl"
                    />
                </div>

                {/* Food Info Section */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800">{foodName}</h1>
                    <p className="text-lg font-medium text-gray-600 mt-2">{foodCategory} | {foodOrigin}</p>

                    <div className="flex justify-center items-center mt-4">
                        <span className="text-2xl font-semibold text-green-600">{price} USD</span>
                        <span className="ml-6 badge badge-secondary">{quantity} Available</span>
                    </div>

                    {/* Short Description */}
                    <p className="mt-6 text-lg text-gray-700">{shortDescription}</p>

                    {/* Purchase Count */}
                    <div className="mt-4 text-lg text-gray-600">
                        <span className="font-semibold">Purchased: </span>{purchaseCount} times
                    </div>

                    {/* Added By Info */}
                    <div className="mt-6 text-sm text-gray-500">
                        <span className="font-semibold">Added By: </span>{addBy.name} ({addBy.email})
                    </div>

                    {/* Purchase Button */}
                    <div className="mt-6">
                        <button
                            className="btn btn-primary px-6 py-2 rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            onClick={handlePurchaseClick}
                            disabled={quantity === 0 || addBy.email === user?.email}
                        >
                            {quantity === 0 ? 'Out of Stock' : 'Purchase'}
                        </button>
                    </div>

                    {/* Back Button (optional) */}
                    <div className="mt-6">
                        <button
                            className="btn btn-secondary px-6 py-2 rounded-full text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
