import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopFoodsSection = () => {
    const [topFoods, setTopFoods] = useState([]);
    const navigate = useNavigate();

    // Fetch top-selling foods from the API
    const fetchTopFoods = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/highest-sales');
            setTopFoods(response.data);
        } catch (error) {
            console.error('Error fetching top foods:', error);
        }
    };

    useEffect(() => {
        fetchTopFoods();
    }, []);

    // Handle the navigation to the All Foods page
    const handleSeeAllClick = () => {
        navigate('/allfoods');
    };

    // Handle the navigation to the Single Food Page
    const handleDetailsClick = (foodId) => {
        navigate(`/food/${foodId}`);
    };

    return (
        <section className="py-10 bg-base-100">
            <div className="container mx-auto text-center mb-8">
                <h2 className="text-3xl font-bold">Top Selling Foods</h2>
                <p className="text-lg text-gray-600">Check out our top-selling food items based on customer purchases.</p>
            </div>

            {/* Grid of top-selling foods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-auto">
                {topFoods.map((food) => (
                    <div key={food._id} className="card w-full bg-base-200 shadow-xl">
                        <figure>
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title text-xl font-semibold">{food.foodName}</h3>
                            <p className="text-gray-600">{food.shortDescription}</p>
                            <p className="text-sm text-gray-500">Purchases: {food.purchaseCount}</p>
                            <div className="card-actions justify-end mt-4">
                                <button
                                    onClick={() => handleDetailsClick(food._id)}
                                    className="btn btn-primary"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* See All Button */}
            <div className="text-center mt-8">
                <button onClick={handleSeeAllClick} className="btn btn-outline btn-lg">
                    See All Foods
                </button>
            </div>
        </section>
    );
};

export default TopFoodsSection;
