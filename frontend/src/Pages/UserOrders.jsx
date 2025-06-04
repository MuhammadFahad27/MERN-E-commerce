import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { endFetchAllOrders, fetchAllOrders, startFetchAllOrders } from '../Redux Toolkit/Order/orderSlice';
import {
  FaBox, FaCreditCard, FaMoneyBillWave,
  FaTruck, FaCheckCircle, FaTimesCircle, FaClock
} from 'react-icons/fa';
import { current } from '@reduxjs/toolkit';

const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.order?.allOrders);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = {
    light: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      cardBg: 'bg-white',
      border: 'border-gray-200',
      accent: 'text-indigo-600',
      divider: 'border-gray-300',
      pending: 'bg-yellow-100 text-yellow-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      shipped: 'bg-purple-600 text-white-100',

      infoCard: 'bg-gray-50'
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-300',
      heading: 'text-white',
      cardBg: 'bg-zinc-950',
      border: 'border-gray-700',
      accent: 'text-indigo-400',
      divider: 'border-gray-600',
      pending: 'bg-yellow-900 text-yellow-200',
      delivered: 'bg-green-900 text-green-200',
      cancelled: 'bg-red-900 text-red-200',
      shipped: 'bg-purple-400 text-white-100',

      infoCard: 'bg-zinc-900'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  useEffect(() => {
    const userOrders = async () => {
      try {
        dispatch(startFetchAllOrders());
        const response = await axios.get(import.meta.env.VITE_API_URL + `/all/user-orders`, {
          withCredentials: true
        });
        if (response.data.success) {
          dispatch(fetchAllOrders(response.data.order));
        }
      } catch (error) {
        console.log(error);
        dispatch(endFetchAllOrders());
      }
    };
    userOrders();
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FaCheckCircle className="mr-1" />;
      case 'cancelled': return <FaTimesCircle className="mr-1" />;
      case 'shipped': return  <FaTruck className="mr-1" />;
      default: return <FaClock className="mr-1" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered': return currentTheme.delivered;
      case 'cancelled': return currentTheme.cancelled;
      case 'shipped' : return currentTheme.shipped
      default: return currentTheme.pending;
    }
  };

  const calculateShipping = (shippingMethod) => shippingMethod === 'fast' ? 9.99 : 4.99;
  const calculateCashCharge = (paymentMethod) => paymentMethod === 'cash' ? 1.00 : 0;
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 ${currentTheme.bg}`}>
      <div className="max-w-6xl mx-auto">
        <div className='flex items-center justify-between'>
         <h1 className={`text-2xl md:text-3xl font-bold mb-8 ${currentTheme.heading}`}>Your Orders</h1>
         <h1 className={`text-2xl md:text-3xl font-bold mb-6 ${currentTheme.heading}`}>Total Orders : {orders?.length}</h1>

        </div>

        {!orders?.length ? (
          <div className={`text-center py-20 ${currentTheme.text}`}>
            <FaBox className="mx-auto text-5xl mb-4 text-gray-400" />
            <p className="text-lg md:text-xl">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => {
              const shippingCharge = calculateShipping(order.shippingMethod);
              const cashCharge = calculateCashCharge(order.paymentMethod);
              const subtotal = order.totalPrice - shippingCharge - cashCharge;

              return (
                <div key={order._id} className={`rounded-2xl shadow-md p-4 sm:p-6 ${currentTheme.cardBg} ${currentTheme.border} border transition hover:shadow-lg`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 border-b pb-4">
                    <div>
                      <h2 className={`text-base md:text-lg font-semibold ${currentTheme.heading}`}>
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>
                      <p className={`text-xs md:text-sm ${currentTheme.text}`}>{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm md:text-base font-medium ${getStatusClass(order.orderStatus)}`}>
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex items-start gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain border" />
                        <div className="flex-1">
                          <h4 className={`text-sm md:text-base font-medium ${currentTheme.heading}`}>{item.name}</h4>
                          <p className={`text-sm mt-1 ${currentTheme.text}`}>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                          <p className={`text-base font-semibold mt-1 ${currentTheme.accent}`}>${(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`grid sm:grid-cols-2 gap-6 mt-6 p-4 rounded-xl ${currentTheme.infoCard}`}>
                    <div>
                      <p className={`font-semibold ${currentTheme.heading}`}>Payment Method</p>
                      <div className="flex items-center mt-1 text-sm">
                        {order.paymentMethod === 'card' ? <FaCreditCard className="mr-2 text-yellow-500" /> : <FaMoneyBillWave className="mr-2 text-green-300" />}
                        <span className={currentTheme.text}>
                          {order.paymentMethod === 'card' ? 'Card' : 'Cash on Delivery'}
                          {order.paymentMethod === 'cash' && <span className="ml-1">(+ $1.00 fee)</span>}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className={`font-semibold ${currentTheme.heading}`}>Shipping Method</p>
                      <div className="flex items-center mt-1 text-sm">
                        <FaTruck className="mr-2 text-green-500" />
                        <span className={currentTheme.text}>
                          {order.shippingMethod === 'fast' ? 'Express' : 'Standard'} (${shippingCharge.toFixed(2)})
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${currentTheme.text}`}>{order.city}, {order.country}</p>
                    </div>
                  </div>

                  <div className={`mt-6 pt-4 border-t ${currentTheme.divider}`}>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className={currentTheme.text}>Subtotal:</span>
                        <span className={currentTheme.text}>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={currentTheme.text}>Shipping:</span>
                        <span className={currentTheme.text}>${shippingCharge.toFixed(2)}</span>
                      </div>
                      {cashCharge > 0 && (
                        <div className="flex justify-between">
                          <span className={currentTheme.text}>Cash Fee:</span>
                          <span className={currentTheme.text}>${cashCharge.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base md:text-lg font-bold">
                        <span className={currentTheme.heading}>Total:</span>
                        <span className={`text-xl md:text-2xl ${currentTheme.accent}`}>${order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
