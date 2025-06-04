  import React, { useEffect, useState } from 'react'
  import { useForm } from "react-hook-form"
  import { useDispatch, useSelector } from 'react-redux'
  import { AiOutlinePlus } from 'react-icons/ai'
  import { FiSearch } from 'react-icons/fi'
  import axios from 'axios'
  import {toast} from 'sonner'
  import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri'
  import {addCategory, endfetchAllCategories, fetchAllCategories, startfetchAllCategories} from '../../Redux Toolkit/Category/categorySlice'
  import {removeCategory} from '../../Redux Toolkit/Category/categorySlice'
import UpdateCategory from '../../Components/UpdateCategory'
import Loader from '../../Components/Loader'
import Spinner from '../../Components/Spinner'





  const Categories = () => {
    const { register, handleSubmit, formState: { errors } ,reset} = useForm()
    const darkMode = useSelector((state) => state.theme.darkMode)
    const categories = useSelector ((state)=>state?.category?.categories) ;
    const loading = useSelector ((state)=>state?.category?.loading) ;

    const [name,setName] = useState(false) ;
    const [id,setId] = useState('') ;
    const [updated,setIsUpdate]= useState(false) ;
    const [search,setSearch] = useState(null) ;
    const [searchLoading,setLoading] = useState(false) ; 
   

    

    const handleSearch = async(e)=>{

        const category = e.target.value ;

        if(!category){

          setSearch(null) ;
          setLoading(false) ;
          return 
        }
        try {

            setLoading(true)
          const result = await axios.get(import.meta.env.VITE_API_URL+`/admin/get-categories/${category}`,{
            withCredentials:true 
          }) ;

          if(result.data.success){

            setLoading(false) ;
            setSearch(result?.data?.result) ;
            

          }
          
        } catch (error) {
          setLoading(false)
          toast.error('me error hon ',error?.response?.data?.message)
        }
    }

    
     // fetch All Categories 
    
     useEffect(() => {
    
      const Categories = async ()=>{
    
        try {

          dispatch(startfetchAllCategories()) ;
          const response = await axios.get(import.meta.env.VITE_API_URL+'/get-categories')
          const api_response = await response.data ;

          if(api_response.success){

            dispatch(fetchAllCategories(api_response.allCategories)) 
            return 
          }

         
        } catch (error) {

          dispatch(endfetchAllCategories()) ;
          console.log('Error while fetching Categorie ',error) ;
          
        }
    
       
      }
        Categories()
     }, [updated])

   
    
    const theme = {
      light: {
        bg: 'bg-white',
        text: 'text-gray-800',
        heading: 'text-gray-900',
        cardBg: 'bg-gray-50',
        inputBg: 'bg-white',
        border: 'border-gray-200',
        buttonPrimary: 'bg-black text-white hover:bg-gray-800',
        buttonSecondary: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300',
        icon: 'text-gray-500'
      },
      dark: {
        bg: 'bg-zinc-900',
        text: 'text-gray-100',
        heading: 'text-white',
        cardBg: 'bg-zinc-800',
        inputBg: 'bg-zinc-900',
        border: 'border-gray-900',
        buttonPrimary: 'bg-white text-black hover:bg-gray-200',
        buttonSecondary: 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700',
        icon: 'text-gray-100'
      },
    }

    const currentTheme = darkMode ? theme.dark : theme.light
    const dispatch = useDispatch() ;

    // create categories 
    const onSubmit = async (data) => {
      
      try {

          const response = await axios.post(import.meta.env.VITE_API_URL+'/create-category',data,{
              withCredentials:true
          }) ;

          const api_response = await response.data ;

          if(api_response.success){

              toast.success(api_response.message) ;
              dispatch(addCategory(api_response.category))
              reset() ;
              return ;
          }

          
      } catch (error) {
          
          toast.error(error?.response?.data?.message) ;
      }
    }

    // Delete Category 

    const deleteCategory = async(id)=>{

    
      
      try {

          const response = await axios.delete(import.meta.env.VITE_API_URL+`/delete-category/${id}`,{
              withCredentials:true
          }) ;

          const api_response =  response.data ;

          if(api_response.success){

            toast.success(api_response.message) ;
              dispatch(removeCategory(id))
            
              return ;
          }

          
      } catch (error) {
          
          console.log(error)
      }


    }

    return (

      loading ? <Loader/> :
      <main className={`min-h-screen p-6 ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className={`text-3xl font-light mb-4 md:mb-0 ${currentTheme.heading}`}>
              <span className="font-medium">Product</span> Categories
            </h1>
          </div>

        
          <div className={`p-6 rounded-xl ${currentTheme.cardBg} border ${currentTheme.border} mb-8`}>
            <h2 className={`text-xl font-medium mb-4 ${currentTheme.heading}`}>Create New Category</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                {/* <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Category Name</label> */}
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={`w-full px-4 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g. Electronics, Clothing"
                />
                {errors.name && <p className={`mt-2 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Category name is required</p>}
              </div>
              <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg ${currentTheme.buttonPrimary} transition-colors duration-300 whitespace-nowrap
                  cursor-pointer active:scale-105`}
              disabled={loading}>
                <AiOutlinePlus size={18} />
               {loading ? <Spinner/> :  'Add Category' }
              </button>
            </form>
          </div>

      
          <div className={`rounded-xl border ${currentTheme.border} overflow-hidden`}>
            {/* Header & Search */}
            <div className={`p-4 ${currentTheme.cardBg} border-b ${currentTheme.border} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
              <h2 className={`text-lg font-medium ${currentTheme.heading}`}>All Categories : {categories.length}</h2>

              {/* Search bar */}
              <div className="relative w-full md:w-72">
                <FiSearch className={`absolute top-1/2 left-3 transform -translate-y-1/2 ${currentTheme.icon}`} size={18} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onChange={handleSearch}
                />
              </div>
            </div>

          {/*  ---- all categoruies  */}
      
          
            <div className="p-4">

              

              
              

            {
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                 <thead>
                          <tr className={`${currentTheme.cardBg} border-b ${currentTheme.border} text-left`}>
                              <th className="py-2 px-4 text-md font-semibold">S.No</th>
                              <th className="py-2 px-4 text-md font-semibold">Category Name</th>
                              <th className="py-2 px-4 text-md font-semibold">Created At</th>
                              <th className="py-2 px-4 text-md font-semibold">Actions</th>
                          </tr>
                </thead>
  <tbody>
  {search && search.length > 0 ? (
    
    search.map((category, index) => (
      <tr key={category?._id} className={`border-b ${currentTheme.border}`}>
        <td className="py-2 px-4 text-md xl:text-lg">{index + 1}</td>
        <td className="py-2 px-4 text-md xl:text-lg capitalize">{category?.name}</td>
        <td className="py-2 px-4 text-md xl:text-lg">{new Date(category?.createdAt).toLocaleDateString()}</td>
        <td className="py-2 px-4 text-md xl:text-lg flex gap-3">
          <button className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => {
            setId(category._id);
            setName(!name);
           
           
            
          }}>
            <RiEdit2Line size={18} />
          </button>
          <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() =>{

              deleteCategory(category._id) ;
              setSearch(prev => prev.filter((i)=>i._id !== category._id))
          } }>
            <RiDeleteBin6Line size={18} />
          </button>
        </td>
      </tr>
    ))
  ) : search &&  search.length === 0 ? (
    
    <tr>
      <td colSpan={4} className="py-4 text-center text-gray-500">
        No category found
      </td>
    </tr>
  ) : categories && categories.length > 0 ? (
    
    categories.map((category, index) => (
      <tr key={category._id} className={`border-b ${currentTheme.border}`}>
        <td className="py-2 px-4 text-md xl:text-lg">{index + 1}</td>
        <td className="py-2 px-4 text-md xl:text-lg capitalize">{category.name}</td>
        <td className="py-2 px-4 text-md xl:text-lg">{new Date(category.createdAt).toLocaleDateString()}</td>
        <td className="py-2 px-4 text-md xl:text-lg flex gap-3">
          <button className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => {
            setId(category._id);
            setName(!name);
          }}>
            <RiEdit2Line size={18} />
          </button>
          <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => deleteCategory(category._id)}>
            <RiDeleteBin6Line size={18} />
          </button>
        </td>
      </tr>
    ))
  ) : categories && categories.length === 0 ? (
   
    <tr>
      <td colSpan={4} className="py-4 text-center text-gray-500">
        No category found
      </td>
    </tr>
  ) : null}
    </tbody>


        </table>
  </div>

  

    
  
  
                   
                  
  }

   

   {

      name && <UpdateCategory id={id} setName={setName} name={name}
      updated={updated} setIsUpdate={setIsUpdate}/>
    }

  </div>

          </div>
        </div>
   
      
      </main>
    )
  }

  export default Categories
