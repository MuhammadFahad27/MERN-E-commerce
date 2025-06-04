import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {toast} from 'sonner'
import axios from "axios"
import Loader from '../../Components/Loader'
import { endfetchAllProducts, fetchAllProducts, startfetchAllProducts } from '../../Redux Toolkit/Products/productSlice';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import Delete from '../../Components/Delete';

const Products = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const loading = useSelector((state) => state.product.loading);
  const {products} = useSelector((state)=>state.product) ;
  const [filterProducts,setFilterProducts] = useState([]) ;
  const [isdelete,setDelete] = useState(false) ;
  const [id,setId] = useState();
  const [action, setAction] = useState('delete-product') ;
  

  const handleDelete = ()=>{

    setDelete(!isdelete) ;
  }
 

  const dispatch = useDispatch() ;

  const theme = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      inputBg: 'bg-white',
      border: 'border-gray-300',
      button: 'bg-black text-white hover:bg-gray-800',
      tableHead: 'bg-gray-200 text-left text-sm font-medium',
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-100',
      heading: 'text-white',
      inputBg: 'bg-zinc-800',
      border: 'border-gray-700',
      button: 'bg-white text-black hover:bg-gray-200',
      tableHead: 'bg-gray-950 text-left text-sm font-medium',
    },
  };

  const currentTheme = darkMode ? theme.dark : theme.light;
 

  useEffect(() => { 

    const allProducts = async ()=>{

        try {

            dispatch(startfetchAllProducts()) ;
            const api_response = await axios.get(import.meta.env.VITE_API_URL+'/all-products',{
            withCredentials:true 
          })

          if(api_response.data.success){

          
            dispatch(fetchAllProducts(api_response.data.allProducts))
            setFilterProducts(api_response.data.allProducts) ;
          }
          
          
        } catch (error) {
          
          dispatch(endfetchAllProducts())
          toast.error(error?.response?.data?.message)
        }
    }
   allProducts() ;
  }, [])

  const handleFilter = async (e)=>{

    
    const name = e.target.value ;

    if(!name){

      setFilterProducts(products)
      return ;
    }
  
      const api_response = await axios.get(import.meta.env.VITE_API_URL+`/admin/search-products?name=${name}`,{
      withCredentials:true 
      })

      if(api_response.data.success){

            setFilterProducts(api_response.data.products) ; 
            return ;
  
        }

}
  return (

    
    loading ? <Loader/> :
   
    

    <main className={`min-h-screen p-6 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${currentTheme.heading}`}>All Products : {products?.length}</h1>
          <Link to="/admin/create-product" className={`px-4 py-2 rounded-md ${currentTheme.button}`}>
            Create Product
          </Link>
        </div>

        {/* Search Input */}
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className={`px-4 py-2 rounded-md w-full md:w-1/3 ${currentTheme.inputBg} ${currentTheme.border} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onChange={handleFilter}/>
          {/* <button className={`px-4 py-2 rounded-md ${currentTheme.button}`}>Search</button> */}
        </div>

    {/* Table Layout */}
<div className="overflow-auto">
  <table className="min-w-full border-collapse">
    <thead className={currentTheme.tableHead}>
      <tr>
        <th className="py-3 px-4 border-b">S.No</th>
        <th className="py-3 px-4 border-b">Image</th>
        <th className="py-3 px-4 border-b">Product Name</th>
        <th className="py-3 px-4 border-b">Category</th>
        <th className="py-3 px-4 border-b">Created At</th>
        <th className="py-3 px-4 border-b whitespace-nowrap min-w-[120px] text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {
      
      
        filterProducts?.length === 0 ? (

          <h1 className='text-xl text-center text-red-400 mt-2'>No Product Found </h1>
        ) :
      
        
      
      (filterProducts.map((product, i) => (
        <tr key={product._id}>
          <td className="py-3 px-4 border-b">{i + 1}</td>

          <td className="py-3 px-4 border-b">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-16 h-16 object-contain rounded" 
            />
          </td>

          <td className="py-3 px-4 border-b"><Link to={`/admin/product-details/${product._id}`}
          className='hover:underline'>{product.name}</Link></td>

          <td className="py-3 px-4 border-b">
            {product.category?.name || 'No Category'}
          </td>

          <td className="py-3 px-4 border-b">
            {new Date(product.createdAt).toLocaleDateString()}
          </td>

          <td className="py-3 px-4 border-b text-center">
            <div className="flex justify-center gap-3 items-center cursor-pointer">
              <Link to={`/admin/update-product/${product._id}`}
               >

                <button className="text-blue-600 hover:text-blue-800
                cursor-pointer" title="Edit">
                  <RiEdit2Line size={20} />
              </button>
              </Link>
           
              <button className="text-red-600 hover:text-red-800 cursor-pointer "
              onClick={()=>{

                handleDelete() ;
                setId(product._id) ;
              }} 
               title="Delete">
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </td>
        </tr>
      )))

    }
    </tbody>
  </table>
</div>

{


  isdelete && <Delete isdelete={isdelete} setDelete={setDelete} id={id} 
  action={action} setFilterProducts={setFilterProducts}/>
}

      </div>
    </main>
  );
};

export default Products;
