import React from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingBasket, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  
  const theme = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      heading: 'text-gray-900',
      button: 'bg-indigo-600 text-white hover:bg-indigo-700',
      cardBg: 'bg-white',
      accentText: 'text-indigo-600',
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-300',
      heading: 'text-white',
      button: 'bg-green-600 text-black hover:bg-green-500',
      cardBg: 'bg-gray-950',
      accentText: 'text-indigo-400',
    },
  };
  
  const currentTheme = darkMode ? theme.dark : theme.light;

  return (
    <div className={`min-h-screen py-16 px-4 ${currentTheme.bg}`}>
      <div className={`max-w-md mx-auto ${currentTheme.cardBg} rounded-xl shadow-lg overflow-hidden p-8 text-center`}>
        <div className="flex justify-center mb-6">
          <FaShoppingBasket className={`text-5xl ${currentTheme.accentText}`} />
        </div>
        
        <h1 className={`text-2xl font-bold mb-4 ${currentTheme.heading}`}>Your Cart is Empty</h1>
        
        <p className={`mb-6 ${currentTheme.text}`}>
          Looks like you haven't added anything to your cart yet. Let's get started!
        </p>
        
        <div className="space-y-4">
          <Link
            to="/all/products"
            className={`inline-flex items-center justify-center px-6 py-3 rounded-md font-medium ${currentTheme.button} transition-colors`}
          >
            Browse Products
            <FaArrowRight className="ml-2" />
          </Link>
          
          <p className={`text-sm ${currentTheme.text}`}>
            Already have an account?{' '}
            <Link to="/login" className={`font-medium ${currentTheme.accentText} hover:underline`}>
              Sign in
            </Link>{' '}
            to see your saved items.
          </p>
        </div>
        
        {!darkMode && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className={`text-sm font-medium mb-2 ${currentTheme.text}`}>Need inspiration?</h3>
            <div className="flex justify-center space-x-4">
              <button className="text-sm text-indigo-600 hover:underline">Trending</button>
              <button className="text-sm text-indigo-600 hover:underline">Best Sellers</button>
              <button className="text-sm text-indigo-600 hover:underline">New Arrivals</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyCart ;