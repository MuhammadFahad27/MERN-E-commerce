import React, {   useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { Link, Links } from 'react-router-dom'
import axios from 'axios'
import { fetchAllItems } from '../Redux Toolkit/Cart/cartSlice'
import { useAddToCart } from '../Hooks/useAddToCart'
import { useRemoveFromCart } from '../Hooks/useRemoveFromCart'
import { useAllCartItems } from '../Hooks/useAllCartItems'

const Cart = () => {


    
     
    const theme = {
        light: {
            bg: 'bg-gray-50',
            text: 'text-gray-800',
            heading: 'text-gray-900',
            inputBg: 'bg-white',
            border: 'border-gray-300',
            button: 'bg-black text-white hover:bg-gray-800',
            cardBg: 'bg-white',
            emptyCartText: 'text-gray-500',
            productCard: 'bg-white border-gray-200',
        },
        dark: {
            bg: 'bg-zinc-900',
            text: 'text-gray-100',
            heading: 'text-white',
            inputBg: 'bg-gray-800',
            border: 'border-gray-700',
            button: 'bg-white text-black hover:bg-gray-200',
            cardBg: 'bg-slate-950',
            emptyCartText: 'text-gray-400',
            productCard: 'bg-gray-950 border-gray-700',
        },
    };
    const userId = useSelector((state) => state.user.user.id)
    const loading = useSelector((state) => state.cart.loading);
    const dispatch = useDispatch() ;
    const darkMode = useSelector((state) => state.theme.darkMode)
    const currentTheme = darkMode ? theme.dark : theme.light;
    const cart = useSelector((state) => state?.cart?.cart);
    const totalProducts = useSelector((state)=>state?.cart?.totalProducts)
    const totalPrice = useSelector((state)=>state.cart.totalPrice)

    
    const {addCart} = useAddToCart() ;
    const {removeCart} = useRemoveFromCart() ;
    const {fetchAllCartItems} = useAllCartItems() ;

    useEffect(() => {
        
       async function fetchCart() {

            await fetchAllCartItems(userId) ;
       }
       fetchCart()
    }, []);
     useEffect(() => {
        
       console.log("cart items :",cart)
    }, [cart]);

    
    const deleteProduct = async (id)=>{

        try {

            const response = await axios.delete(import.meta.env.VITE_API_URL+`/remove-product/${id}/${userId}`,{
                withCredentials:true
            })
              if(response.data?.success){

                    dispatch(fetchAllItems(response.data))
                    
                    return ;
                }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${currentTheme.bg} ${currentTheme.text}`}>
            <div className="max-w-7xl mx-auto">
                <h1 className={`text-3xl font-bold mb-8 ${currentTheme.heading}`}>Your Shopping Cart</h1>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
                    </div>
                ) : !cart  || cart?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FiShoppingCart className={`text-6xl mb-4 ${currentTheme.emptyCartText}`} />
                        <h2 className={`text-2xl font-semibold mb-2 ${currentTheme.heading}`}>Your cart is empty</h2>
                        <p className={`text-lg ${currentTheme.emptyCartText} mb-6`}>Looks like you haven't added anything to your cart yet</p>
                        <Link to={'/all/products'}>
                            <button className={`px-6 py-2 rounded-md font-medium transition-all ${currentTheme.button}`}>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-4">
                            {cart?.map((item) => (
                                <div key={item?._id} className={`flex flex-col sm:flex-row gap-4 p-4 rounded-lg border ${currentTheme.productCard}`}>
                                    <div className="w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                                        <img 
                                            src={item.product.images[0]} 
                                            alt={item.product.name} 
                                            className="w-full h-full object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`text-lg font-semibold ${currentTheme.heading}`}>{item.product.name}</h3>
                                            <p className="text-sm mt-1 line-clamp-2">{item.product.description}</p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-lg font-medium">${item.product.price}</p>
                                            <div className="flex items-center mt-2">
                                                <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
                                                cursor-pointer"
                                                onClick={()=>{

                                                    removeCart(item?.product?._id)
                                                }}>
                                                    <AiOutlineMinus />
                                                </button>
                                                <span className="mx-4 w-6 text-center">{item?.quantity}</span>
                                                <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"

                                               onClick={()=>{

                                                    addCart(item?.product?._id)
                                               }}>
                                                    <AiOutlinePlus />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-col justify-between items-end sm:items-center sm:gap-4">
                                        <button className="p-2 text-red-500 hover:text-red-600 transition-colors cursor-pointer "
                                        onClick={()=>{

                                             deleteProduct(item?.product?._id)
                                        }}>
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                        <p className="text-lg font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Order Summary */}
                        <div className={`lg:w-96 p-6 rounded-lg border ${currentTheme.productCard} sticky top-4 h-fit`}>
                            <h2 className={`text-xl font-bold mb-4 ${currentTheme.heading}`}>Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Total Items:</span>
                                    {/* <span>{cart[0]?.totalProducts}</span> */}
                                     <span>{totalProducts}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${totalPrice}</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span>Discount :</span>
                                    <span>0%</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t ${currentTheme.border}">
                                    <span>Total:</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <Link to={'/checkout'}>
                                     <button className={`w-full py-3 rounded-md font-medium
                                    cursor-pointer mt-6 ${currentTheme.button} transition-colors`}>
                                    Proceed to Checkout
                                </button>
                                </Link>
                               
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart