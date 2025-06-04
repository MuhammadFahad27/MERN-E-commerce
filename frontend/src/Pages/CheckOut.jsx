import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import {toast} from 'sonner'
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { clearCart } from '../Redux Toolkit/Cart/cartSlice';
import { useAllCartItems } from '../Hooks/useAllCartItems';
import OrderSuccess from '../Components/OrderSuccess';


const CheckOut = () => {

  const cart = useSelector((state) => state?.cart?.cart);

  useEffect(() => {
      
       if (!cart || cart?.length === 0) {
        navigate('/'); 
      }
   
  }, []);
  const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();
  const [shippingMethod, setShippingMethod] = useState('fast');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const darkMode = useSelector((state) => state.theme.darkMode);
    const totalProducts = useSelector((state)=>state?.cart?.totalProducts)
    let totalPrice = useSelector((state)=>state.cart.totalPrice)
    const user = useSelector((state)=>state?.user?.user?.id) ;
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const {fetchAllCartItems} = useAllCartItems()
    const [order,setOrder] = useState(false) ;
  

    if(shippingMethod === 'fast') {

        totalPrice += 9.99 
    }
    else{

      totalPrice+=4.99
    }
  
   // for card 

   if(paymentMethod==='cash'){

    totalPrice+= 1
   }

    const orderItems = cart?.map((item) => ({
      product: item?.product._id,               
      name: item?.product.name,
      quantity: item?.quantity,
      price: item?.product?.price,
      image: item?.product?.images[0]             
  }));

  const clearAllCartItems = async (userId) => {
    try {
      const response = await axios.delete(import.meta.env.VITE_API_URL+`/clear-cart/${userId}`,{
        withCredentials:true
      }) ;
      if(response.data.success){

        dispatch(clearCart()) ;
        return ;
      }
    } catch (error) {
      console.log(error) ;
    }
  }
    

  const onSubmit = async (data)=>{
    
    const {

       name , 
        country ,
        address,
        phone ,
        city ,
    } = data ;

    try {

      setLoading(true)
      const response = await axios.post(import.meta.env.VITE_API_URL+'/create-order',{

        name , 
        country ,
        address,
        phone ,
        city ,
        user ,
        orderItems ,
        totalPrice ,
        totalProducts,
        shippingMethod,
        paymentMethod

      },{withCredentials:true})

      if(response.data.success){
        setLoading(false)
        toast.success(response.data.message) ;
        reset() 
        setOrder(true) ;
        // navigate('/order-success')
         await clearAllCartItems(user) ;
        dispatch(clearCart())
        await fetchAllCartItems() ;
        

        return ;
      }
      
    } catch (error) {
        toast.error(error?.response?.data?.message)
        setOrder(false)
        setLoading(false)
    }



  }

  const theme = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      heading: 'text-gray-900',
      inputBg: 'bg-white',
      border: 'border-gray-200',
      button: 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer',
      buttonSecondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      cardBg: 'bg-white',
      accentText: 'text-indigo-600',
      productCard: 'bg-white border-gray-200',
      selected: 'ring-2 ring-indigo-500 bg-indigo-50',
      divider: 'border-gray-100',
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-300',
      heading: 'text-white',
      inputBg: 'bg-gray-950',
      border: 'border-gray-700',
      button: 'bg-green-600 text-black hover:bg-green-500 cursor-pointer',
      buttonSecondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
      cardBg: 'bg-gray-950',
      accentText: 'text-indigo-400',
      productCard: 'bg-zinc-950 border-gray-700',
      selected: 'ring-2 ring-indigo-400 bg-gray-700',
      divider: 'border-gray-700',
    },
  };
  
  const currentTheme = darkMode ? theme.dark : theme.light;
  
  

  return (
    <main className={`min-h-screen p-4 md:p-8 ${currentTheme.bg} ${currentTheme.text} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Order summary and shipping/payment */}
          <div className="lg:w-2/3 space-y-6">
            <h1 className={`text-2xl md:text-3xl font-bold ${currentTheme.heading}`}>Order Summary</h1>
            
            {/* Ordered Products Section */}
           <section className={`p-6 rounded-xl shadow-sm ${currentTheme.cardBg} border ${currentTheme.border}`}>
  <div className="flex-1 space-y-4">
    {cart.map((item) => (
      <div
        key={item?._id}
        className={`flex flex-col sm:flex-row gap-4 p-4 rounded-lg border ${currentTheme.productCard}`}
      >
        {/* Image Box */}
        <div className="w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${currentTheme.heading}`}>
              {item.product.name}
            </h3>
          </div>

          <div className=" space-y-1">
            <p className="">
              <span className="font-medium">Actual Price:</span> ${item.product.price}
            </p>
            <p className="">
              <span className="font-medium">Quantity:</span> {item.quantity}
            </p>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex sm:flex-col justify-between items-end sm:items-center sm:gap-4">
          <p className="text-lg font-semibold">
            <span className="font-medium">Total Price:</span> ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


            
            {/* Shipping & Payment Methods Section */}
            <section className="space-y-6">
              {/* Shipping Method */}
              <div className={`p-6 rounded-xl shadow-sm ${currentTheme.cardBg} border ${currentTheme.border}`}>
                <h2 className={`text-lg font-semibold mb-4 ${currentTheme.heading}`}>Shipping Options</h2>
                <div className="space-y-3">
                  <div 
                    onClick={() => setShippingMethod('fast')} 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${currentTheme.productCard} border ${currentTheme.border} ${shippingMethod === 'fast' ? currentTheme.selected : 'hover:bg-opacity-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {shippingMethod === 'fast' ? (
                          <div className={`w-5 h-5 rounded-full mr-3 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`}></div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full mr-3 border ${currentTheme.border}`}></div>
                        )}
                        <h3 className="font-medium">Fast Delivery</h3>
                      </div>
                      <span className="font-medium">$9.99</span>
                    </div>
                    <p className="text-sm opacity-80 mt-1 ml-8">Delivery: 1-2 Days</p>
                  </div>
                  <div 
                    onClick={() => setShippingMethod('standard')} 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${currentTheme.productCard} border ${currentTheme.border} ${shippingMethod === 'standard' ? currentTheme.selected : 'hover:bg-opacity-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {shippingMethod === 'standard' ? (
                          <div className={`w-5 h-5 rounded-full mr-3 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`}></div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full mr-3 border ${currentTheme.border}`}></div>
                        )}
                        <h3 className="font-medium">Standard Delivery</h3>
                      </div>
                      <span className="font-medium">$4.99</span>
                    </div>
                    <p className="text-sm opacity-80 mt-1 ml-8">Delivery: 4-5 Days</p>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className={`p-6 rounded-xl shadow-sm ${currentTheme.cardBg} border ${currentTheme.border}`}>
                <h2 className={`text-lg font-semibold mb-4 ${currentTheme.heading}`}>Payment Options</h2>
                <div className="space-y-3">
                  <div 
                    onClick={() => setPaymentMethod('card')} 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${currentTheme.productCard} border ${currentTheme.border} ${paymentMethod === 'card' ? currentTheme.selected : 'hover:bg-opacity-50'}`}
                  >
                    <div className="flex items-center">
                      {paymentMethod === 'card' ? (
                        <div className={`w-5 h-5 rounded-full mr-3 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`}></div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full mr-3 border ${currentTheme.border}`}></div>
                      )}
                      <h3 className="font-medium">Card Payment</h3>
                    </div>
                    <p className="text-sm opacity-80 mt-1 ml-8">Pay securely with your credit or debit card</p>
                  </div>
                  <div 
                    onClick={() => setPaymentMethod('cash')} 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${currentTheme.productCard} border ${currentTheme.border} ${paymentMethod === 'cash' ? currentTheme.selected : 'hover:bg-opacity-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {paymentMethod === 'cash' ? (
                          <div className={`w-5 h-5 rounded-full mr-3 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`}></div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full mr-3 border ${currentTheme.border}`}></div>
                        )}
                        <h3 className="font-medium">Cash on Delivery</h3>
                      </div>
                      <span className="font-medium">+$1.00</span>
                    </div>
                    <p className="text-sm opacity-80 mt-1 ml-8">Pay when you receive your order</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Right column - Payment form */}
          <div className="lg:w-1/3">
            <section className={`p-6 rounded-xl shadow-sm ${currentTheme.cardBg} border ${currentTheme.border} sticky top-8`}>
              <h2 className={`text-xl font-semibold mb-3 ${currentTheme.heading}`}>Payment Details</h2>
              <p className="text-sm mb-6 opacity-80">Complete your order by providing your payment details.</p>
              
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Full Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.inputBg} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                    placeholder="John Doe"
                    required
                  {...register('name', { required: 'name is required' })}/>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Complete Address</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.inputBg} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                    placeholder="123 Main St, Apt 4B"
                    required
                  {...register('address', { required: 'address is required' })}/>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>City</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.inputBg} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                      placeholder="New York"
                      required
                    {...register('city', { required: 'city is required' })}/>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Country</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.inputBg} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                      placeholder="United States"
                      required
                    {...register('country', { required: 'country is required' })}/>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Contact Number</label>
                  <input 
                    type="tel" 
                    className={`w-full px-4 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.inputBg} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                    placeholder="+1 (555) 123-4567 or  yours country code"
                    required
                  {...register('phone', { required: 'address is required' })}/>
                </div>
               
                
                <button 
                  type="submit" 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors 
                     ${currentTheme.button} mt-6 flex items-center justify-center space-x-2 hover:shadow-md`}
                  disabled={loading}>
                  <span>{loading ? <Spinner/> : `Place Your Order ${totalPrice.toFixed(2)}$`}</span>
                 
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>

    {

      order && <OrderSuccess/>
    }
    </main>
  );
};

export default CheckOut;