import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { endFetch, fetchOrders, startFetch } from '../../Redux Toolkit/Order/adminOrdersSlice';
import { FaBox, FaCreditCard, FaMoneyBillWave, FaTruck, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import {toast} from 'sonner'
const AllOrders = () => {
  const dispatch = useDispatch();
  const { Orders: orders, loading } = useSelector((state) => state.adminOrders);
  const darkMode = useSelector((state) => state.theme.darkMode);
  // const [orderStatus, setUpdatingStatus] = useState('');
  const [isUpdate,setUpdate] = useState(false) ;


  const theme = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      heading: 'text-gray-900',
      cardBg: 'bg-white',
      border: 'border-gray-200',
      accent: 'text-indigo-600',
      icon: 'text-gray-600',
      status: {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
      },
      selectBg: 'bg-white',
      divider: 'border-gray-200',
      price: 'text-indigo-600',
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-200',
      heading: 'text-white',
      cardBg: 'bg-zinc-950',
      border: 'border-gray-700',
      accent: 'text-indigo-400',
      icon: 'text-gray-300',
      status: {
        pending: 'bg-yellow-900 text-yellow-100',
        processing: 'bg-blue-900 text-blue-100',
        shipped: 'bg-purple-900 text-purple-100',
        delivered: 'bg-green-900 text-green-100',
        cancelled: 'bg-red-900 text-red-100',
      },
      selectBg: 'bg-gray-700',
      divider: 'border-gray-700',
      price: 'text-indigo-400',
    },
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        dispatch(startFetch());
        const response = await axios.get(import.meta.env.VITE_API_URL + '/admin/orders', {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(fetchOrders(response.data.Orders));
        }
      } catch (error) {
        console.error(error);
        dispatch(endFetch());
      }
    };
    fetchAdminOrders();
  }, [dispatch,isUpdate]);

  const getStatusStyle = (status) => currentTheme.status[status] || currentTheme.status.pending;

  const formatDate = (date) => new Date(date).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const shippingCharge = (method) => method === 'fast' ? 9.99 : 4.99;
  const cashFee = (method) => method === 'cash' ? 1.00 : 0;

 

  const updateOrderStatus = async (value , id)=>{
    
    try {

      const response = await axios.put(import.meta.env.VITE_API_URL+`/admin/update-status/${id}`,{

        orderStatus:value},{withCredentials:true})

        if(response.data?.success){

          toast.success(response.data.message) ;
          setUpdate(!isUpdate)
          
        }
      
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

    


  }

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${currentTheme.bg}`}>
        <ImSpinner8 className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${currentTheme.bg}`}>
      <h1 className={`text-3xl font-bold mb-6 ${currentTheme.heading}`}>All Orders</h1>
      {orders.length === 0 ? (
        <div className={`text-center py-12 ${currentTheme.text}`}>
          <FaBox className={`mx-auto text-5xl mb-4 ${currentTheme.icon}`} />
          <p className="text-lg">No orders found</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => {
            const ship = shippingCharge(order.shippingMethod);
            const cash = cashFee(order.paymentMethod);
            const subtotal = order.totalPrice - ship - cash;

            return (
              <div key={order._id} className={`rounded-xl p-4 shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                <div className="mb-2 flex justify-between items-center">
                  <h2 className={`font-semibold text-lg ${currentTheme.heading}`}>#{order._id.slice(-6).toUpperCase()}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(order.orderStatus)}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </div>
                <p className={`text-xs mb-4 ${currentTheme.text}`}>Placed on: {formatDate(order.createdAt)}</p>

                <div className={`mb-3 space-y-1 text-sm ${currentTheme.text}`}>
                  <div className="flex items-center"><FaUser className={`mr-2 ${currentTheme.icon}`} />{order.name}</div>
                  <div className="flex items-center"><FaPhone className={`mr-2 ${currentTheme.icon}`} />{order.phone}</div>
                  <div className="flex items-start"><FaMapMarkerAlt className={`mr-2 mt-1 ${currentTheme.icon}`} />{order.address}, {order.city}, {order.country}</div>
                </div>

                <div className={`mb-3 max-h-40 overflow-y-auto divide-y ${currentTheme.divider} text-sm`}>
                  {order.orderItems.map(item => (
                    <div key={item._id} className={`py-2 flex gap-2 ${currentTheme.divider}`}>
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-contain border" />
                      <div className="flex-1">
                        <p className={`truncate ${currentTheme.heading}`}>{item.name}</p>
                        <p className={`text-xs ${currentTheme.text}`}>{item.quantity} x ${item.price.toFixed(2)}</p>
                      </div>
                      <p className={`text-sm font-medium ${currentTheme.price}`}>${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className={`border-t ${currentTheme.divider} pt-3 text-sm space-y-1 ${currentTheme.text}`}>
                  <div className="flex justify-between">
                    <span>Subtotal:</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping ({order.shippingMethod}):</span><span>${ship.toFixed(2)}</span>
                  </div>
                  {cash > 0 && (
                    <div className="flex justify-between">
                      <span>Cash Fee:</span><span>${cash.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span><span className={currentTheme.accent}>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

              <div className={`mb-4  ${currentTheme.text}`}>
                 <label htmlFor="status-select" className={`block text-sm font-medium mb-1 ${currentTheme.text}`}>
                 Status
             </label>
  <select
    id="status-select"
    className={`w-full p-2 rounded-md border ${currentTheme.border} ${currentTheme.selectBg} ${currentTheme.text} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
    
    onChange={(e)=>updateOrderStatus(e.target.value,order._id)}
    value={order.orderStatus}
   
  > 

    <option value="pending" className={`${currentTheme.bg} ${currentTheme.text}`}>Pending</option>
    <option value="processing" className={`${currentTheme.bg} ${currentTheme.text}`}>Processing</option>
    <option value="shipped" className={`${currentTheme.bg} ${currentTheme.text}`}>Shipped</option>
    <option value="delivered" className={`${currentTheme.bg} ${currentTheme.text}`}>Delivered</option>
    <option value="cancelled" className={`${currentTheme.bg} ${currentTheme.text}`}>Cancelled</option>
  </select>
</div>
              </div>
            );
          })}
        </div>
      )}

    
    </div>
  );
};

export default AllOrders;