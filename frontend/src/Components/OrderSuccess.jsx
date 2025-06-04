import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const OrderSuccess = ({ onClose }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  
  const theme = {
    light: {
      bg: 'bg-gray-50',
      overlay: 'bg-black bg-opacity-50',
      modalBg: 'bg-white',
      text: 'text-gray-700',
      heading: 'text-gray-900',
      button: 'bg-indigo-600 text-white hover:bg-indigo-700',
      secondaryButton: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300',
      successBg: 'bg-green-100',
      successIcon: 'text-green-600',
      divider: 'border-gray-200',
    },
    dark: {
      bg: 'bg-zinc-900',
      overlay: 'bg-black bg-opacity-70',
      modalBg: 'bg-gray-800',
      text: 'text-gray-300',
      heading: 'text-white',
      button: 'bg-green-600 text-black hover:bg-green-500',
      secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600',
      successBg: 'bg-green-900 bg-opacity-30',
      successIcon: 'text-green-400',
      divider: 'border-gray-700',
    },
  };
  
  const currentTheme = darkMode ? theme.dark : theme.light;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <main>
      <div className={`fixed inset-0 ${currentTheme.overlay} flex items-center justify-center z-50 p-4`}>
        <div
          
          className={`${currentTheme.modalBg} rounded-xl p-6 max-w-sm w-full shadow-xl text-center`}
        >
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${currentTheme.successBg} mb-4`}>
            <div
              
            >
              <FaCheck className={`h-8 w-8 ${currentTheme.successIcon}`} />
            </div>
          </div>
          
          <h3 className={`text-lg font-medium ${currentTheme.heading} mb-2`}>Order Confirmed!</h3>
          <p className={`text-sm ${currentTheme.text} mb-4`}>
            Your order has been placed successfully. We've sent you an email with the details.
          </p>
          
          <div className="flex flex-col space-y-3">
            <Link
              to="/user-orders"
              className={`w-full ${currentTheme.button} py-2 px-4 rounded-md text-sm font-medium transition-colors`}
            >
              View Orders
            </Link>
            <Link to={'/all/products'}>
             <button
              onClick={onClose}
              className={`w-full ${currentTheme.secondaryButton} py-2 px-4 rounded-md text-sm font-medium border transition-colors`}
            >
              Continue Shopping
            </button>
            </Link>
           
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;