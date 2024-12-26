import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

export default function UpdateMyFood() {
    const food = useLoaderData();
    const navigate = useNavigate();
    const api = useAxios();

    const {
        foodName,
        foodImage,
        foodCategory,
        quantity,
        price,
        foodOrigin,
        shortDescription,
        _id,
    } = food.data;

    const [formData, setFormData] = useState({
        foodName,
        foodImage,
        foodCategory,
        quantity,
        price,
        foodOrigin,
        shortDescription,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.patch(`/update-food/${_id}`, formData);
            console.log(response)
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Food item updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/my-foods'); 
            }
        } catch (error) {
            console.error("Error updating food:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h2 className="text-3xl font-semibold text-center mb-6">Update Food Item</h2>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Food Name */}
                    <div>
                        <label htmlFor="foodName" className="block text-gray-700">Food Name</label>
                        <input
                            type="text"
                            id="foodName"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleInputChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Food Image */}
                    <div>
                        <label htmlFor="foodImage" className="block text-gray-700">Food Image URL</label>
                        <input
                            type="url"
                            id="foodImage"
                            name="foodImage"
                            value={formData.foodImage}
                            onChange={handleInputChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Food Category */}
                    <div>
                        <label htmlFor="foodCategory" className="block text-gray-700">Food Category</label>
                        <select
                            id="foodCategory"
                            name="foodCategory"
                            value={formData.foodCategory}
                            onChange={handleInputChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="vegetarian">Vegetarian</option>
                            <option value="non-vegetarian">Non-Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="dessert">Dessert</option>
                            <option value="beverage">Beverage</option>
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            required
                            min="1"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            required
                            min="0.01"
                            step="0.01"
                        />
                    </div>

                    {/* Food Origin */}
                    <div>
                        <label htmlFor="foodOrigin" className="block text-gray-700">Food Origin</label>
                        <input
                            type="text"
                            id="foodOrigin"
                            name="foodOrigin"
                            value={formData.foodOrigin}
                            onChange={handleInputChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label htmlFor="shortDescription" className="block text-gray-700">Short Description</label>
                        <textarea
                            id="shortDescription"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleInputChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Update Food
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
