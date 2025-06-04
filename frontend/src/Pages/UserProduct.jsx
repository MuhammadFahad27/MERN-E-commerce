import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft } from 'react-icons/fi';
import StarRatings from 'react-star-ratings';
import { useAddToCart } from '../Hooks/useAddToCart';
import { useRemoveFromCart } from '../Hooks/useRemoveFromCart';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { endfetchAllreviews, fetchAllReviews, startfetchAllReviews, updatedReviews } from '../Redux Toolkit/Products/reviewSlice';
// import { fetchAllProducts } from '../Redux Toolkit/Products/productSlice';



const UserProduct = () => {

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset 
    } = useForm();

    const [ratings,setRating] = useState(0)
  const theme = {
    light: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      heading: "text-gray-900",
      border: "border-gray-300 border-2",
      card: "bg-white",
      label: "text-gray-600",
      value: "text-gray-900 font-medium",
      accent: "text-teal-600",
      button: "bg-teal-600 hover:bg-teal-700 text-white",
      rating: "text-yellow-500",
      inputBg:'bg-transparent text-black '
    },
    dark: {
      bg: "bg-zinc-900",
      text: "text-gray-200",
      heading: "text-white",
      border: "border-gray-700",
      card: "bg-gray-950",
      label: "text-gray-400",
      value: "text-white font-medium",
      accent: "text-teal-400",
      button: "bg-teal-600 hover:bg-teal-950 text-white cursor-pointer",
      rating: "text-yellow-400",
      inputBg:'text-white'

    },
  };

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const currentTheme = darkMode ? theme.dark : theme.light;
  const dispatch = useDispatch() ;
  const userId = useSelector((state)=>state.user?.user?.id)
     const cart = useSelector((state) => state?.cart?.cart);
  
  const {addCart} = useAddToCart() ;
  const {removeCart} = useRemoveFromCart() ;
  const fetching = useSelector((state)=>state.review.loading) ;
  const reviews = useSelector((state)=>state?.review?.reviews)
  const [update,setUpdate] = useState(false) ;
  
  // Add review 
  const onSubmit = async (data)=>{

    const {comment} = data 
    if(!ratings){

        toast.error('Select Ratings ');
        return ;
    }

    try {

      const response = await axios.post(import.meta.env.VITE_API_URL+`/reviews/${userId}/${id}`,{

        comment ,
        ratings
      },{

        withCredentials:true 
      })
      
      if(response.data.success){

        toast.success(response.data.message) ;
        reset() ;
        setRating(0) ;
        dispatch(updatedReviews(response.data?.reviews))
        setUpdate(true) ;
        // dispatch(fetchAllProducts(response.data?.product))
        return 
      }
    } catch (error) {
      
      toast.error(error?.response?.data?.message) ;
    }
  }

  
  
  
  // products details 
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/details/${id}`
        );
        if (response.data.success) {
         
          setProduct(response?.data?.product);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id,update]);

  // fetch Reviews 
  useEffect(() => {

    const fetchReviews = async ()=>{

      try {

        dispatch(startfetchAllReviews()) ;
        const response = await axios.get(import.meta.env.VITE_API_URL+`/all-reviews?id=${id}`,{
          withCredentials:true
        }) ;
        if(response.data.success){

          
          dispatch(fetchAllReviews(response.data?.reviews))
        }
        
      } catch (error) {

        dispatch(endfetchAllreviews()) ;
        console.log(error)
      }
    }
    fetchReviews()
    
  }, []);

  
 

 const quantity = cart.find(item => item?.product?._id === id)?.quantity || 0;


  
  

  

  if (loading) {
    return (
      <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} p-8`}>
        <div className="max-w-7xl mx-auto">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} p-8`}>
        <div className="max-w-7xl mx-auto">Product not found</div>
      </div>
    );
  }



  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-6">
          <Link to="/all/Products" className={`text-sm font-medium ${currentTheme.text} hover:text-teal-500`}>
            <FiArrowLeft className="mr-2" />
          </Link>
        </nav>

        {/* Product Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <div className={`rounded-lg overflow-hidden mb-4 ${currentTheme.card} ${currentTheme.border} border`}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-md overflow-hidden border ${currentTheme.border} ${
                    selectedImage === index ? 'ring-2 ring-teal-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-20 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={`p-6 rounded-lg ${currentTheme.card} ${currentTheme.border} border`}>
            <h1 className={`text-3xl font-bold mb-2 ${currentTheme.heading}`}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className={`${currentTheme.label}`}>
                No of reviews: {product.numOfReviews}
              </span>
            </div>

            {/* Price */}
            <div className="mb-1">
              <span className={`text-3xl font-bold ${currentTheme.accent}`}>
                ${product.price.toFixed(2)}
              </span>
            </div>
          <div className="flex  mb-1">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="gold"
                numberOfStars={5}
                name="rating"
                starDimension="19px"
                starSpacing="4px"
              />
          </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className={`text-lg font-semibold mb-2 ${currentTheme.heading}`}>Description</h2>
              <p className={`${currentTheme.text}`}>{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <h2 className={`text-lg font-semibold mb-2 ${currentTheme.heading}`}>Availability</h2>
              <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h2 className={`text-lg font-semibold mb-2 ${currentTheme.heading}`}>Category</h2>
              <p className={`${currentTheme.text}`}>{product.category?.name}</p>
            </div>

            {/* Quantity Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button className={`text-xl px-4 py-1 rounded ${currentTheme.button}`} title="Decrease"
               onClick={()=>{

                removeCart(id)
              }}>
                -
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button className={`text-xl px-4 py-1 rounded ${currentTheme.button}`} title="Increase"
              onClick={()=>{

                addCart(id)
              }}>
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                className={` w-full px-6 py-3 rounded-md font-medium
                cursor-pointer ${currentTheme.button} transition-colors`}
                disabled={product.stock <= 0}
              onClick={()=>{

                addCart(id)
                
              }}>
                Add to Cart
              </button>
              
            </div>
          </div>
        </div>
        
       {/* Reviews Section */}
<div className={`mt-12 ${currentTheme.card} ${currentTheme.border} border rounded-lg p-6`}>
  <h2 className={`text-2xl font-bold mb-6 ${currentTheme.heading}`}>Leave a Review</h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

    {/* Comment Input */}
    <div>
      <label htmlFor="comment" className={`block text-lg font-medium mb-2 ${currentTheme.label}`}>
        Your Thoughts
      </label>
      <textarea
        id="comment"
        rows="4"
        className={`w-full px-4 py-3 text-lg rounded-lg resize-none ${currentTheme.inputBg} ${currentTheme.border} border ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-teal-500`}
        placeholder="Share your experience..."
        {...register('comment', {
          required: 'Review cannot be empty',
        })}
      ></textarea>
      {errors.comment && (
        <p className="mt-2 text-sm text-red-500">
          {errors.comment.message}
        </p>
      )}
    </div>

    {/* Rating */}
    <div>
      <label className={`block text-lg font-medium mb-2 ${currentTheme.label}`}>
        Your Rating
      </label>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
             
            className={`text-3xl transition-transform duration-150 ${star <= ratings ? 'text-yellow-400' : 'text-gray-400'} hover:scale-110`}
          >
            ★
          </button>
        ))}
      </div>
    </div>

    {/* Submit */}
    <div className="flex justify-end">
      <button
        type="submit"
        className={`px-6 py-3 rounded-md font-semibold ${currentTheme.button} transition hover:shadow-md`}
      >
        Post Review
      </button>
    </div>
  </form>
</div>

{/* Reviews Section */}
<div className={`mt-12 ${currentTheme.card} ${currentTheme.border} border rounded-lg p-6`}>
  <h2 className={`text-2xl font-bold mb-4 ${currentTheme.heading}`}>Customer Reviews</h2>

  {fetching ? (
    // Loading spinner
    <div className="flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : reviews.length === 0 ? (
    // No reviews found
    <p className={`${currentTheme.text}`}>No reviews found.</p>
  ) : (
    // Map through reviews
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className={`p-4 rounded-md ${currentTheme.border} border`}>
          <div className="flex items-center gap-2 mb-2">
            {/* Icon and name */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <span className={`font-semibold ${currentTheme.text}`}>{review.name}</span>
            </div>
          </div>

          {/* Rating */}
          <StarRatings
            rating={review.ratings}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="3px"
          />

          {/* Comment */}
          <p className={`mt-2 ${currentTheme.text}`}>{review.comment}</p>
        </div>
      ))}
    </div>
  )}
</div>




    
      </div>
    </div>
  );
};

export default UserProduct;
