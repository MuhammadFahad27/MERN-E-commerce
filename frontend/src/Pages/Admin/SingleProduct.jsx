import React, {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";
import {toast} from 'sonner'


const theme = {
  light: {
    bg: "bg-gray-50",
    text: "text-gray-800",
    heading: "text-gray-900",
    border: "border-gray-200",
    card: "bg-white",
    label: "text-gray-600",
    value: "text-gray-800",
    accent: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    rating: "text-yellow-500",
  },
  dark: {
    bg: "bg-zinc-800",
    text: "text-gray-100",
    heading: "text-white",
    border: "border-gray-700",
    card: "bg-zinc-900",
    label: "text-gray-400",
    value: "text-gray-100",
    accent: "text-blue-400",
    button: "bg-blue-700 hover:bg-blue-600 text-white",
    rating: "text-yellow-400",
  },
};

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const currentTheme = darkMode ? theme.dark : theme.light;
  const [reviews, Setreviews] = useState([]);
  const userId = useSelector((state)=>state?.user?.user)
    const [update,setUpdate] = useState(false) ;
  



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
   useEffect(() => {

    const fetchReviews = async ()=>{

      try {

        ;
        const response = await axios.get(import.meta.env.VITE_API_URL+`/all-reviews?id=${id}`,{
          withCredentials:true
        }) ;
        if(response.data.success){

          Setreviews(response.data?.reviews)
          
        }
        
      } catch (error) {

       
        console.log(error)
      }
    }
    fetchReviews()
    
  }, []);


  const deleteReview = async (rId)=>{

    const response = await axios.delete(import.meta.env.VITE_API_URL+`/delete-review/${id}/${rId}`,{

      withCredentials:true 
      
    })

    if(response.data.success){

      toast.success(response?.data?.message) ;
      Setreviews((review) => review.filter((r)=> r._id !== rId) ) ;
      setUpdate(!update)
      return ;
      
    }
  }


 

  if (loading) return <Loader />;

  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className={`min-h-screen py-10 px-4 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
      {/* Image Gallery */}
<div>
  <div className="w-full h-96 rounded-2xl shadow-xl border overflow-hidden flex items-center justify-center bg-gray-100">
    <img
      src={product.images[selectedImage]}
      alt="Main"
      className="max-h-full max-w-full object-contain"
    />
  </div>
  <div className="flex gap-4 mt-4 overflow-x-auto py-2">
    {product.images.map((img, index) => (
      <div
        key={index}
        onClick={() => setSelectedImage(index)}
        className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 cursor-pointer overflow-hidden ${
          selectedImage === index
            ? "border-blue-500"
            : "border-transparent"
        }`}
      >
        <img
          src={img}
          alt={`Thumbnail ${index}`}
          className="w-full h-full object-contain"
        />
      </div>
    ))}
  </div>
</div>


        {/* Product Details */}
        <div className={`${currentTheme.card} p-6 rounded-2xl shadow-md`}>
          <h1 className={`text-3xl font-bold mb-4 ${currentTheme.heading}`}>
            {product.name}
          </h1>
          <p className={`mb-4 ${currentTheme.label}`}>{product?.description}</p>
          <div className="mb-4">
            <span className={`font-semibold ${currentTheme.label}`}>Category:</span>{" "}
            <span className={currentTheme.value}>{product?.category?.name}</span>
          </div>
          <div className="mb-4">
            <span className={`font-semibold ${currentTheme.label}`}>Price:</span>{" "}
            <span className="text-2xl font-bold text-green-600">{product.price}$</span>
          </div>
          <div className="mb-4">
            <span className={`font-semibold ${currentTheme.label}`}>Stock:</span>{" "}
            <span className={currentTheme.value}>{product.stock}</span>
          </div>
          <div className="mb-4">
            <span className={`font-semibold ${currentTheme.label}`}>Rating:</span>{" "}
            <span className={`${currentTheme.rating} font-semibold`}>
              {product.ratings} / 5
            </span>
          </div>
          <div className="mb-2">
            <span className={`font-semibold ${currentTheme.label}`}>Reviews:</span>{" "}
            <span className={currentTheme.value}>{product.numOfReviews}</span>
          </div>
          <div className="text-sm mt-4">
            <p className={currentTheme.label}>
              Created At: {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <p className={currentTheme.label}>
              Updated At: {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>


      {/* Reviews Section For Admin  */}

     {/* Reviews Section For Admin */}
<div className={`max-w-6xl mx-auto mt-12 ${currentTheme.text}`}>
  <h2 className={`text-2xl font-bold mb-6 ${currentTheme.heading}`}>Product Reviews</h2>

  {loading ? (
    <Loader />
  ) : reviews.length === 0 ? (
    <p className={`${currentTheme.label}`}>No reviews found.</p>
  ) : (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.card} shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}
        >
          <div className="flex items-start gap-4 w-full md:w-auto">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg">
              {review.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className={`font-semibold ${currentTheme.text}`}>{review.name}</p>
              <p className={`text-sm ${currentTheme.label}`}>{review.comment}</p>
              <div className="mt-1 text-yellow-400">
                {"★".repeat(review.ratings)}{"☆".repeat(5 - review.ratings)}
              </div>
            </div>
          </div>

          {/* Delete Icon */}
          <button
            title="Delete Review"
            className="text-red-500 hover:text-red-700 transition-colors duration-200
            cursor-pointer"
            
          onClick={()=>{

            deleteReview(review._id)
          }}>
            🗑️
          </button>
        </div>
      ))}
    </div>
  )}
</div>



    </div>
  );
};

export default SingleProduct;
