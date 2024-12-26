import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const api = useAxios();

  const [formData, setFormData] = useState({
    foodName: '',
    foodImageURL: '',
    foodCategory: '',
    quantity: 1,
    price: '',
    addByName: user?.displayName || '',  
    addByEmail: user?.email || '',       
    foodOrigin: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        addByName: user.displayName || '',
        addByEmail: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate price as a number
    if (isNaN(formData.price) || formData.price <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    // Validate quantity as a number
    if (isNaN(formData.quantity) || formData.quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/add-food', formData);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Food item added successfully!',
        });

        setFormData({
          foodName: '',
          foodImageURL: '',
          foodCategory: '',
          quantity: 1,
          price: '',
          foodOrigin: '',
          description: '',
          addByName: user?.displayName || '', 
          addByEmail: user?.email || '',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-20 px-5">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Food Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label htmlFor="foodImageURL" className="block text-gray-700">Food Image</label>
            <input
              type="text"
              id="foodImageURL"
              name="foodImageURL"
              value={formData.foodImageURL}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

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
              <option value="">Select a category</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="dessert">Dessert</option>
              <option value="beverage">Beverage</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              min="1"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="addByName" className="block text-gray-700">Added By (Name)</label>
            <input
              type="text"
              id="addByName"
              name="addByName"
              value={formData.addByName}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div>
            <label htmlFor="addByEmail" className="block text-gray-700">Added By (Email)</label>
            <input
              type="email"
              id="addByEmail"
              name="addByEmail"
              value={formData.addByEmail}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div>
            <label htmlFor="foodOrigin" className="block text-gray-700">Food Origin (Country)</label>
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

          <div>
            <label htmlFor="description" className="block text-gray-700">Food Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              {loading ? 'Adding...' : 'Add Food'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
