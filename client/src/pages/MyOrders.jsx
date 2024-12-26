import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

export default function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const api = useAxios();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await api.get(`/my-orders?email=${user.email}`);
        if (response.status === 200) {
          setMyOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?.email) {
      fetchMyOrders();
    }
  }, [user?.email]);

  const handleDeleteOrder = async (id) => {
    try {
      const response = await api.delete(`/delete-order/${id}`);
      if (response.status === 200) {
        setMyOrders(myOrders.filter(order => order._id !== id));
        Swal.fire({
          title: 'Order Deleted',
          text: 'Your order has been successfully deleted.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true
        });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while deleting your order.',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">My Orders</h2>

      {/* Conditional rendering: Show message if no orders */}
      {myOrders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myOrders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              {/* Order details */}
              <h3 className="text-xl font-semibold mb-2">Order #{order._id}</h3>
              <p className="text-gray-700 mb-2">
                <strong>Ordered On:</strong> {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p>

              {/* Order item details */}
              <div className="text-gray-700 mb-2">
                <strong>Items:</strong>
                <div>
                  <p><strong>{order.foodName}</strong></p>
                  <p>Quantity: {order.foodQuantity}</p>
                  <p>Price: ${order.foodPrice}</p>
                </div>
                <p>Total Order Value: ${order.totalOrderValue}</p>
              </div>

              {/* Total Price */}
              <p className="text-gray-700 mb-2">
                <strong>Total Price:</strong> ${order.totalOrderValue}
              </p>

              <div className='flex justify-between'>
                {/* View Order Details button */}
                {/* <div className="mt-4 text-center w-1/2">
                  <Link
                    to={`/order/${order._id}`}
                    className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                  >
                    View Order Details
                  </Link>
                </div> */}

                {/* Delete Order Button */}
                <div className="mt-4 text-center w-full">
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="inline-block px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
