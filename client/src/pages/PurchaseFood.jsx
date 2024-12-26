import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

const PurchaseFoodPage = () => {
    const food = useLoaderData();
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(AuthContext);
    const api = useAxios();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const purchaseData = {
            foodId: food.data._id,
            foodName: food.data.foodName,
            price: food.data.price,
            quantity,
            buyerName: user.displayName,
            buyerEmail: user.email,
            buyingDate: Date.now(),
        };

        try {
            if(quantity > food.data.quantity) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'The quantity you want to purchase is more than the available quantity.',
                })
                return;
            }

            await api.post('/purchase', purchaseData)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your purchase was successful!',
            })
            navigate('/my-orders');
        } catch (error) {
            console.error("Error during purchase:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred during purchase. Please try again later.',
            })
        }
    };

    if (!food || !user) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="min-h-screen bg-base-100 px-5 ">
            <section className="py-10">
                <div className="container mx-auto max-w-lg bg-white shadow-md p-6 rounded-md">
                    <h2 className="text-3xl font-semibold text-center">Purchase Food</h2>

                    {/* Purchase Form */}
                    <form onSubmit={handleSubmit} className="mt-6">
                        {/* Food Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Food Name</label>
                            <input
                                type="text"
                                value={food.data.foodName}
                                readOnly
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Price</label>
                            <input
                                type="text"
                                value={`$${food.data.price}`}
                                readOnly
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Quantity */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Buyer Name (Read-only) */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Buyer Name</label>
                            <input
                                type="text"
                                value={user.displayName}
                                readOnly
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Buyer Email (Read-only) */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Buyer Email</label>
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Buying Date (Automatically set) */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Buying Date</label>
                            <input
                                type="text"
                                value={new Date().toLocaleString()}
                                readOnly
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Purchase
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default PurchaseFoodPage;
