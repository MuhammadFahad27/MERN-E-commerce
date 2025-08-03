// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { FaChevronDown, FaChevronUp  , FaAngleDown} from 'react-icons/fa'
// import { FaFilter } from 'react-icons/fa';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import StarRatings from 'react-star-ratings';
// import { useAddToCart } from '../Hooks/useAddToCart';
// import { endfetchAllCategories, fetchAllCategories, startfetchAllCategories } from '../Redux Toolkit/Category/categorySlice';



// const AllProducts = () => {

//    const theme = {
//     light: {
//       bg: 'bg-white',
//       text: 'text-black',
//       heading: 'text-black',
//       inputBg: 'bg-gray-100',
//       border: 'border-gray-300',
//       button: 'bg-blue-600 hover:bg-blue-900',
//       description:'text-black'
//     },
//     dark: {
//       bg: 'bg-[#121212]',
//       text: 'text-[#f1f1f1]',
//       heading: 'text-[#1E90FF]',
//       inputBg: 'bg-[#1e1e1e]',
//       border: 'border-[#333]',
//       button: 'bg-[#1f2d40] hover:bg-[#24364d]',
//     },
//   }

//   const dispatch = useDispatch() ;
//   const [addingId, setAddingId] = useState(null);
  


//   const [filter, setFilters] = useState({

//     search:'' ,
//     sort:'' ,
//     category:[],
//     priceRange: [],
//     rating: [],
//   })
//   const categories = useSelector((state) => state.category.categories)
//   const {isAdding} = useSelector((state) => state?.cart) ;
//   const darkMode = useSelector((state) => state.theme.darkMode) ;
//   const [products,setProducts] = useState(null) ;
//   const [page,setPage] = useState(1) ;
//   const [total,setTotal] = useState(0) ;
//   const [is_Cat, setCat] = useState(false)
//   const [isPrice, setPrice] = useState(false)
//   const [israting, setRating] = useState(false)
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const currentTheme = darkMode ? theme.dark : theme.light
//   const navigate = useNavigate() ;
//   const {addCart} = useAddToCart() ;

  

//   const handleRoute = (id)=>{

//     navigate(`/user/product-details/${id}`)
      
//   }

// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const params = new URLSearchParams();

//       // Convert filters to query parameters
//       if (filter.search) params.append("search", filter.search);
//       if (filter.sort) params.append("sort", filter.sort);
//       if (filter.category.length)
//         filter.category.forEach((cat) => params.append("category", cat));
//       if (filter.priceRange.length)
//         filter.priceRange.forEach((range) => params.append("priceRange", range));
//       if (filter.rating.length)
//         filter.rating.forEach((rate) => params.append("rating", rate));

//       params.append("page", page);

//       const url = `${import.meta.env.VITE_API_URL}/get/products?${params.toString()}`;
//       console.log("URL:", url);

//       const res = await axios.get(url, { withCredentials: true });

//       if (res.data.success) {
//         setProducts(res.data.products);
//         setTotal(res.data.totalPages);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchProducts();
// }, [filter, page]);

// useEffect(() => {
    
//       const Categories = async ()=>{
    
//         try {

//           dispatch(startfetchAllCategories()) ;
//           const response = await axios.get(import.meta.env.VITE_API_URL+'/get-categories')
//           const api_response = await response.data ;

//           if(api_response.success){

//             dispatch(fetchAllCategories(api_response.allCategories)) 
//             return 
//           }

         
//         } catch (error) {

//           dispatch(endfetchAllCategories()) ;
//           console.log('Error while fetching Categorie ',error) ;
          
//         }
    
       
//       }
//         Categories()
//      }, [])

//   const userId = useSelector((state)=>state?.user?.user?.id) ;
  



//   return (
//     <main className={`${currentTheme.bg} ${currentTheme.text} min-h-screen flex`}>
//       <section className={`flex flex-col lg:flex-row ${currentTheme.text}`}>
//         <div className={`lg:hidden p-4 flex justify-between items-center border-b ${currentTheme.border}`}>
//           <h2 className={`font-semibold text-lg ${currentTheme.text}`}>Filters</h2>
//           <button 
//             onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
//             className={`p-2 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-500'}`}
//           >
//             {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
//             <FaFilter className={`inline ml-2 ${darkMode ? 'text-white' : 'text-black'}`} />
//           </button>
//         </div>

//         <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 p-4 space-y-6 border-r ${currentTheme.border}`}>
//           {/* Categories */}
//           <div>
//             <button
//               onClick={() => setCat(!is_Cat)}
//               className={`flex items-center justify-between w-full font-semibold text-lg cursor-pointer ${currentTheme.heading}`}
//             >
//               Categories <FaAngleDown className={`transition-transform ${is_Cat ? "rotate-180" : ""}`} />
//             </button>
//             {is_Cat && (
//               <div className="mt-2 space-y-2">
//                 {categories.map((c) => (
//                   <label key={c._id} className={`flex items-center gap-2 ${currentTheme.text}`}>
//                     <input type="checkbox" value={c._id} className="accent-blue-500" onChange={(e) => {
//                       const value = e.target.value;
//                       const checked = e.target.checked;
//                       setFilters(prev => ({
//                           ...prev,
//                           category: checked
//                           ? [...prev.category, value]
//                           : prev.category.filter((cat) => cat !== value)
//                       }));
//                     }}/>
//                     {c.name}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Prices */}
//           <div>
//             <button
//               onClick={() => setPrice(!isPrice)}
//               className={`flex items-center justify-between w-full font-semibold text-lg cursor-pointer ${currentTheme.heading}`}
//             >
//               Prices <FaAngleDown className={`transition-transform ${isPrice ? "rotate-180" : ""}`} />
//             </button>
//             {isPrice && (
//               <div className="mt-2 space-y-2">
//                 {[
//                   "1-50", "50-100", "100-200", "200-300",
//                   "300-400", "400-500", "500-600", "600-700",
//                   "700-800", "800-900", "900-1000", "1000-99999"
//                 ].map((range, idx) => (
//                   <label key={idx} className={`flex items-center gap-2 ${currentTheme.text}`}>
//                     <input type="checkbox" value={range} className="accent-blue-500" onChange={(e)=>{
//                       const value = e.target.value ;
//                       const check = e.target.checked
//                       setFilters(prev=> ({
//                           ...prev , 
//                           priceRange:check ? 
//                           [...prev.priceRange,value]:
//                           prev.priceRange.filter((p)=>p!==value) 
//                       }))
//                     }}/>
//                     {range}$
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Ratings */}
//           <div>
//             <button
//               onClick={() => setRating(!israting)}
//               className={`flex items-center justify-between w-full font-semibold text-lg cursor-pointer ${currentTheme.heading}`}
//             >
//               Ratings <FaAngleDown className={`transition-transform ${israting ? "rotate-180" : ""}`} />
//             </button>
//             {israting && (
//               <div className="mt-2 space-y-2">
//                 {["1-2", "2-3", "3-4", "4-5"].map((rating, idx) => (
//                   <label key={idx} className={`flex items-center gap-2 ${currentTheme.text}`}>
//                     <input type="checkbox"  value={rating} className="accent-blue-500"
//                       onChange={(e)=>{
//                         const value = e.target.value ;
//                         const check = e.target.checked 
//                         setFilters(prev=> ({
//                             ...prev , 
//                             rating:check ?
//                             [...prev.rating || [],value] :
//                             prev.rating.filter((p)=> p !== value)                      
//                         }))
//                       }}/>
//                     {rating} Stars
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Section 2 - Main Content */}
//         <section className={`flex-1 p-4 lg:p-6 ${currentTheme.text}`}>
//           {/* Header - Responsive stacked on mobile */}
//           <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4 mb-6 ${currentTheme.border}`}>
//             {/* Sort Dropdown - Full width on mobile */}
//             <div className="w-full md:w-auto">
//               <label className={`mr-2 font-semibold ${currentTheme.heading}`}>Products</label>
//               <select className={`w-full md:w-auto p-2 rounded ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.border}`} 
//                 onChange={(e)=>{
//                   setFilters(prev=> ({
//                       ...prev , 
//                       sort:e.target.value 
//                   }))
//                 }}>
//                 <option disabled selected>--- Sort ---</option>
//                 <option value={'priceDesc'}>Price: High To Low</option>
//                 <option value={'priceAsc'}> Price: Low To High</option>
//                 <option value={'latest'}>Latest Products</option>
//                 <option value={'oldest'}>Oldest Products</option>
//               </select>

                
              
//             </div>

//              {/* Search Input - Full width on mobile */}
//             <div className="w-full md:w-auto">
//               <label className={`mr-2 font-semibold ${currentTheme.heading}`}>Search Products</label>
//               <input 
//                 type="search" 
//                 placeholder="Search..." 
//                 className={`w-full md:w-64 p-2 rounded ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.border}`} 
//                 onChange={(e)=>{
//                   setFilters(prev=> ({
//                       ...prev , 
//                       search:e.target.value 
//                   }))

//                   setPage(1)
//                 }}/>
//             </div>

//             <div>
//               <button className='bg-red-500 p-1 rounded cursor-pointer'
//               onClick={()=>{

//                 setFilters({
//                     search: '',
//                     sort: '',
//                     category: [],
//                     priceRange: [],
//                     rating: []
//                   });

                
//               }}>Reset Filter</button>
//             </div>

           
//           </div>

//           {/* Section 3 - Product Display - Responsive grid */}
//           <section>
//            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//   {/* Loading and Error States */}
//   {!products ? (
    
//       <div className="col-span-full flex items-center justify-center py-20">
//      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//   </div>

   
//   ) : products.length === 0 ? (
    
//     <div className="col-span-full text-center py-12">
//       <p className={`text-xl ${currentTheme.text}`}>No products found</p>
//     </div>

//   ) : (
//     //  Actual Products --->>> 
    
//     products.map((p) => (
//       <div
//         key={p._id}
//         className={`p-7 sm:p-4 rounded shadow-md ${currentTheme.inputBg} hover:shadow-lg transition-shadow h-full flex flex-col ${currentTheme.text}
//           cursor-pointer border ${currentTheme.border}`
        
//         }
//      >
//         {/* Image */}
//         <div className={`aspect-square bg-gray-50  mb-3 rounded overflow-hidden`}
//          onClick={()=>{
//         handleRoute(p?._id)
//       }}>
//           <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
//         </div>
        
//         {/* Title & Description */}
//         <h2 className="font-semibold text-base sm:text-lg mb-1 hover:underline hover:cursor-pointer truncate"
//          onClick={()=>{
//         handleRoute(p?._id)
//       }}>{p?.name}</h2>
//           <p className={`${currentTheme.bg} text-xs sm:text-sm mb-2 line-clamp-2`}>
//           {p.description || 'Product description here...'}
//         </p>

//          <div className="flex  mb-2">
//               <StarRatings
//                 rating={p?.ratings}
//                 starRatedColor="gold"
//                 numberOfStars={5}
//                 name="rating"
//                 starDimension="15px"
//                 starSpacing="4px"
//               />
//           </div>
      

//         {/* Price & Button */}
//         <div className="flex justify-between items-center mt-auto pt-2">
//           <span className="font-bold text-sm sm:text-base">{p.price}$</span>
//           <button className={`text-white px-3 py-1 sm:px-4 sm:py-2 rounded 
//             cursor-pointer text-xs sm:text-sm shadow-sm ${currentTheme.button}
//             ${isAdding ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//             onClick={()=>{
//                setAddingId(p._id);
//               addCart(p?._id).finally(()=>setAddingId(null))
//             }}
//             disabled={isAdding}>
//             {addingId === p._id ? "Adding to cart..." : "Add to cart"}
//           </button>
//         </div>
//       </div>
//     ))
//   )}
// </div>

//           {/* Pagination - Styled to match your theme */}

//           {

//               <div className="flex justify-center mt-8 gap-2">
//             {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => (
//               <button
//                 key={pageNum}
//                 onClick={() => setPage(pageNum)}
//                 className={`w-10 h-10 flex items-center cursor-pointer justify-center rounded-md text-sm font-medium transition-colors
//                   ${page === pageNum 
//                     ? `${currentTheme.button} text-white` 
//                     : `${currentTheme.border} border
//                     ${currentTheme.text} hover:${currentTheme.button} hover:text-white`}
//                 `}
//               >
//                 {pageNum}
//               </button>
//             ))}
// </div>
//           }
        

//           </section>
//         </section>
        
//       </section>
//     </main>
//   )
// }

// export default AllProducts

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronDown, FaChevronUp, FaAngleDown } from 'react-icons/fa'
import { FaFilter } from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { useAddToCart } from '../Hooks/useAddToCart';
import { endfetchAllCategories, fetchAllCategories, startfetchAllCategories } from '../Redux Toolkit/Category/categorySlice';

const AllProducts = () => {
  const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-black',
      heading: 'text-black',
      inputBg: 'bg-gray-100',
      border: 'border-gray-300',
      button: 'bg-blue-600 hover:bg-blue-900',
      description: 'text-black'
    },
    dark: {
      bg: 'bg-[#121212]',
      text: 'text-[#f1f1f1]',
      heading: 'text-[#1E90FF]',
      inputBg: 'bg-[#1e1e1e]',
      border: 'border-[#333]',
      button: 'bg-[#1f2d40] hover:bg-[#24364d]',
    },
  }

  const dispatch = useDispatch();
  const [addingId, setAddingId] = useState(null);
  const [filter, setFilters] = useState({
    search: '',
    sort: '',
    category: [],
    priceRange: [],
    rating: [],
  })
  const categories = useSelector((state) => state.category.categories)
  const { isAdding } = useSelector((state) => state?.cart);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [is_Cat, setCat] = useState(false)
  const [isPrice, setPrice] = useState(false)
  const [israting, setRating] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const currentTheme = darkMode ? theme.dark : theme.light
  const navigate = useNavigate();
  const { addCart } = useAddToCart();

  const handleRoute = (id) => {
    navigate(`/user/product-details/${id}`)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        if (filter.search) params.append("search", filter.search);
        if (filter.sort) params.append("sort", filter.sort);
        if (filter.category.length)
          filter.category.forEach((cat) => params.append("category", cat));
        if (filter.priceRange.length)
          filter.priceRange.forEach((range) => params.append("priceRange", range));
        if (filter.rating.length)
          filter.rating.forEach((rate) => params.append("rating", rate));

        params.append("page", page);

        const url = `${import.meta.env.VITE_API_URL}/get/products?${params.toString()}`;
        console.log("URL:", url);

        const res = await axios.get(url, { withCredentials: true });

        if (res.data.success) {
          setProducts(res.data.products);
          setTotal(res.data.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [filter, page]);

  useEffect(() => {
    const Categories = async () => {
      try {
        dispatch(startfetchAllCategories());
        const response = await axios.get(import.meta.env.VITE_API_URL + '/get-categories')
        const api_response = await response.data;

        if (api_response.success) {
          dispatch(fetchAllCategories(api_response.allCategories))
          return
        }
      } catch (error) {
        dispatch(endfetchAllCategories());
        console.log('Error while fetching Categorie ', error);
      }
    }
    Categories()
  }, [])

  const userId = useSelector((state) => state?.user?.user?.id);

  return (
    <main className={`${currentTheme.bg} ${currentTheme.text} min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <div className={`lg:hidden mb-4 p-3 flex justify-between items-center rounded-lg ${currentTheme.inputBg}`}>
          <h2 className="font-semibold text-lg">Filters</h2>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className={`p-2 rounded-md flex items-center gap-2 ${currentTheme.button}`}
          >
            {mobileFiltersOpen ? 'Hide' : 'Show'} Filters
            <FaFilter className="text-white" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar - hidden on mobile when not open */}
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72`}>
            <div className={`p-4 rounded-lg ${currentTheme.inputBg} space-y-6 sticky top-4`}>
              {/* Categories */}
              <div>
                <button
                  onClick={() => setCat(!is_Cat)}
                  className={`flex items-center justify-between w-full font-semibold text-lg cursor-pointer ${currentTheme.heading}`}
                >
                  Categories <FaAngleDown className={`transition-transform ${is_Cat ? "rotate-180" : ""}`} />
                </button>
                {is_Cat && (
                  <div className="mt-2 space-y-2">
                    {categories.map((c) => (
                      <label key={c._id} className={`flex items-center gap-2 ${currentTheme.text}`}>
                        <input type="checkbox" value={c._id} className="accent-blue-500" onChange={(e) => {
                          const value = e.target.value;
                          const checked = e.target.checked;
                          setFilters(prev => ({
                            ...prev,
                            category: checked
                              ? [...prev.category, value]
                              : prev.category.filter((cat) => cat !== value)
                          }));
                        }} />
                        {c.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Prices */}
              <div>
                <button
                  onClick={() => setPrice(!isPrice)}
                  className={`flex items-center justify-between w-full font-semibold text-lg cursor-pointer ${currentTheme.heading}`}
                >
                  Prices <FaAngleDown className={`transition-transform ${isPrice ? "rotate-180" : ""}`} />
                </button>
                {isPrice && (
                  <div className="mt-2 space-y-2">
                    {[
                      "1-50", "50-100", "100-200", "200-300",
                      "300-400", "400-500", "500-600", "600-700",
                      "700-800", "800-900", "900-1000", "1000-99999"
                    ].map((range, idx) => (
                      <label key={idx} className={`flex items-center gap-2 ${currentTheme.text}`}>
                        <input type="checkbox" value={range} className="accent-blue-500" onChange={(e) => {
                          const value = e.target.value;
                          const check = e.target.checked
                          setFilters(prev => ({
                            ...prev,
                            priceRange: check ?
                              [...prev.priceRange, value] :
                              prev.priceRange.filter((p) => p !== value)
                          }))
                        }} />
                        {range}$
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Ratings */}
              <div>
                <button
                  onClick={() => setRating(!israting)}
                  className={`flex items-center justify-between w-full font-semibold text-lg cursor-pointer ${currentTheme.heading}`}
                >
                  Ratings <FaAngleDown className={`transition-transform ${israting ? "rotate-180" : ""}`} />
                </button>
                {israting && (
                  <div className="mt-2 space-y-2">
                    {["1-2", "2-3", "3-4", "4-5"].map((rating, idx) => (
                      <label key={idx} className={`flex items-center gap-2 ${currentTheme.text}`}>
                        <input type="checkbox" value={rating} className="accent-blue-500"
                          onChange={(e) => {
                            const value = e.target.value;
                            const check = e.target.checked
                            setFilters(prev => ({
                              ...prev,
                              rating: check ?
                                [...prev.rating || [], value] :
                                prev.rating.filter((p) => p !== value)
                            }))
                          }} />
                        {rating} Stars
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            {/* Filter controls */}
            <div className={`mb-6 p-4 rounded-lg ${currentTheme.inputBg}`}>
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="w-full md:w-auto">
                  <label className={`mr-2 font-semibold ${currentTheme.heading}`}>Sort By</label>
                  <select className={`w-full p-2 rounded ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.border}`}
                    onChange={(e) => {
                      setFilters(prev => ({
                        ...prev,
                        sort: e.target.value
                      }))
                    }}>
                    <option value="" disabled selected>--- Sort ---</option>
                    <option value={'priceDesc'}>Price: High To Low</option>
                    <option value={'priceAsc'}> Price: Low To High</option>
                    <option value={'latest'}>Latest Products</option>
                    <option value={'oldest'}>Oldest Products</option>
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <label className={`mr-2 font-semibold ${currentTheme.heading}`}>Search</label>
                  <input
                    type="search"
                    placeholder="Search products..."
                    className={`w-full p-2 rounded ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.border}`}
                    onChange={(e) => {
                      setFilters(prev => ({
                        ...prev,
                        search: e.target.value
                      }))
                      setPage(1)
                    }} />
                </div>

                <button className='bg-red-500 text-white px-3 py-2 rounded cursor-pointer hover:bg-red-600 transition'
                  onClick={() => {
                    setFilters({
                      search: '',
                      sort: '',
                      category: [],
                      priceRange: [],
                      rating: []
                    });
                  }}>
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Products grid */}
            <div>
              {!products ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className={`text-xl ${currentTheme.text}`}>No products found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <div
                      key={p._id}
                      className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${currentTheme.inputBg} border ${currentTheme.border}`}
                    >
                      {/* Image container with fixed aspect ratio */}
                      <div 
                        className="relative pt-[100%] bg-gray-100 cursor-pointer"
                        onClick={() => handleRoute(p?._id)}
                      >
                        <img 
                          src={p.images[0]} 
                          alt={p.name} 
                          className="absolute top-0 left-0 w-full h-full object-contain p-4"
                        />
                      </div>

                      {/* Product info */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h2 
                          className="font-semibold text-lg mb-2 hover:underline cursor-pointer line-clamp-2"
                          onClick={() => handleRoute(p?._id)}
                        >
                          {p?.name}
                        </h2>
                        
                        <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {p.description || 'No description available'}
                        </p>

                        <div className="flex mb-3">
                          <StarRatings
                            rating={p?.ratings}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name="rating"
                            starDimension="16px"
                            starSpacing="2px"
                          />
                        </div>

                        {/* Price and button */}
                        <div className="mt-auto flex justify-between items-center">
                          <span className="font-bold text-lg">{p.price}$</span>
                          <button 
                            className={`text-white px-4 py-2 rounded text-sm ${currentTheme.button} transition-colors
                              ${isAdding ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                            onClick={() => {
                              setAddingId(p._id);
                              addCart(p?._id).finally(() => setAddingId(null))
                            }}
                            disabled={isAdding}
                          >
                            {addingId === p._id ? "Adding..." : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {total > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                        ${page === pageNum
                          ? `${currentTheme.button} text-white`
                          : `${currentTheme.border} border ${currentTheme.text} hover:${currentTheme.button} hover:text-white`}
                      `}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default AllProducts
