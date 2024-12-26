import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAxios from '../hooks/useAxios';

const MyFoodsPage = () => {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axiosInstance.get(`my-foods?email=${user?.email}`);
                setFoods(response.data);
            } catch (error) {
                console.error("Error fetching food items:", error);
            }
        };

        if (user?.email) {
            fetchFoods();
        }
    }, [user?.email]);

    const handleUpdateClick = (foodId) => {
        navigate(`/update-food/${foodId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h2 className="text-3xl font-semibold text-center mb-6">My Food Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
                    <div key={food._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold">{food.foodName}</h3>
                        <p className="text-gray-700 mt-2">Price: ${food.price}</p>
                        <p className="text-gray-500 mt-2">Category: {food.foodCategory}</p>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handleUpdateClick(food._id)}
                                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                            >
                                📝 Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFoodsPage;
