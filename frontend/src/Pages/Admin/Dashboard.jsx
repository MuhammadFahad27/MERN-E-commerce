import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  FiGrid, FiBox, FiTag, FiShoppingBag, 
  FiUsers, FiChevronRight 
} from 'react-icons/fi'
import {Link, useNavigate} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import axios  from 'axios';
import { signOut } from '../../Redux Toolkit/User/userSlice';
import { toast } from 'sonner';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { toggleTheme } from '../../Redux Toolkit/Theme/themeSlice';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { endFetch, fetchOrders, startFetch } from '../../Redux Toolkit/Order/adminOrdersSlice';
import { endfetchALlCustomers, fetchALlCustomers, StartfetchALlCustomers } from '../../Redux Toolkit/Customers/customerSlice';
import { endfetchAllProducts, fetchAllProducts, startfetchAllProducts } from '../../Redux Toolkit/Products/productSlice';
import { endfetchAllCategories, fetchAllCategories, startfetchAllCategories } from '../../Redux Toolkit/Category/categorySlice';


const Dashboard = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const id = useSelector((state)=> state?.user?.user?.id)
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  // fetch Orders 
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
  }, [dispatch]);

  // fetch Customers 
   useEffect(() => {
    const customers = async () => {
      try { 

          dispatch(StartfetchALlCustomers()) ;
          const api_response = await axios.get(import.meta.env.VITE_API_URL + '/admin/all-users', {
          withCredentials: true,
        })
        if(api_response.data.success){

        
          dispatch(fetchALlCustomers(api_response.data.allUsers)) ;
         
        }
      } catch (error) {
        dispatch(endfetchALlCustomers())
        toast.error(error?.response?.data?.message)

      }
    }
    customers()
  }, [])

  // fetch Products 
   useEffect(() => { 
  
      const allProducts = async ()=>{
  
          try {
  
              dispatch(startfetchAllProducts()) ;
              const api_response = await axios.get(import.meta.env.VITE_API_URL+'/all-products',{
              withCredentials:true 
            })
  
            if(api_response.data.success){
  
            
              dispatch(fetchAllProducts(api_response.data.allProducts))
              return 
            }
            
            
          } catch (error) {
            
            dispatch(endfetchAllProducts())
            toast.error(error?.response?.data?.message)
          }
      }
     allProducts() ;
    }, [])

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
     }, [])

  const categories = useSelector((state) => state?.category?.categories).length
  const customer = useSelector((state)=>state.customer.allCustomers).length ; 
  const products = useSelector((state)=>state?.product?.products).length ;
  const orders = useSelector((state) => state.adminOrders?.Orders).length;

  
  
  
  

 
  // const Total_cat = categories.length-1 ;
  

  const handleLogOut = async ()=>{

    try {

        
          const response = await axios.post(import.meta.env.VITE_API_URL+'/auth/sign-out',{},{withCredentials:true}) ;
            const user = await response.data;

        if(user.success){

          dispatch(signOut())
          toast.success(user.message) ;
          navigate('/sign-in')
          
          
      }
      
    } catch (error) {
      
        toast.success(error?.response?.data?.message) ;

    }
  }

  const theme = {
  dark: {
    bg: 'bg-[#0e0e14]', // Dark but clean background
    text: 'text-zinc-300',
    heading: 'text-zinc-100',
    sidebar: 'bg-[#1a1a24]/90',
    border: 'border-zinc-700',
    link: 'hover:bg-zinc-800 text-zinc-300',
    activeLink: 'bg-zinc-700 text-white font-medium',
    icon: 'text-zinc-500 hover:text-indigo-400'
  },

  light: {
    bg: 'bg-[#fdfdfd]', // Near white but soft
    text: 'text-zinc-800',
    heading: 'text-zinc-900',
    sidebar: 'bg-white/90',
    border: 'border-zinc-200',
    link: 'hover:bg-zinc-100 text-zinc-700',
    activeLink: 'bg-zinc-200 text-zinc-900 font-medium',
    icon: 'text-zinc-500 hover:text-indigo-500'
  }
}



  const currentTheme = darkMode ? theme.dark : theme.light

  

  return (
    <div className={`min-h-screen flex ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500`}>
      {/* Sidebar for large screens - Enhanced with icons and better spacing */}
      <aside className={`hidden lg:flex flex-col w-72 p-6 ${currentTheme.sidebar} ${currentTheme.border} border-r space-y-1`}>
        <div className='flex gap-2 '>
           
          <h2 className={`text-2xl font-semibold mb-8  ${currentTheme.heading}`}>Admin Panel </h2>
           <button className={`text-xl cursor-pointer mb-8 ${currentTheme.text}`} onClick={() => dispatch(toggleTheme())}>
                    {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>
         
        </div>
        
        <nav className="flex flex-col gap-1">
          <Link to={'/admin/dashboard'} className={`flex items-center justify-between px-4 py-3 rounded-lg ${currentTheme.activeLink}`}>
            <div className="flex items-center">
              <FiGrid className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Dashboard
            </div>
            <FiChevronRight className="w-4 h-4" />
          </Link>
          <Link to={'/admin/products'} className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}
            `}>
            <FiBox className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
            Products
          </Link>
          <Link to={"/admin/categories"} className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
            <FiTag className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
            Categories
          </Link>
          <Link to="/admin/orders" className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
            <FiShoppingBag className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
            Orders
          </Link>
          <Link to="/admin/customers" className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
            <FiUsers className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
            Customers
          </Link>
            <Link to={`/profile/${id}`} className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
              <CgProfile  className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Profile 
          </Link>
           <button onClick={handleLogOut} className={`flex items-center px-4 py-3
            cursor-pointer rounded-lg ${currentTheme.link}`}>
              <FaArrowRightFromBracket   className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Log Out 
          </button>
          
        </nav>
      </aside>

   
      <div className="flex-1 flex flex-col">
       
        <header className={`p-6 border-b ${currentTheme.border} lg:hidden`}>
          <h1 className={`text-2xl font-semibold ${currentTheme.heading}`}>Admin Panel </h1>
          <div className="mt-6 flex flex-col gap-2">
            <Link to="/admin/dashboard" className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.activeLink}`}>
              <FiGrid className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Dashboard
            </Link>
            <Link to="/admin/products" className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
              <FiBox className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Products
            </Link>
            <Link to="/admin/categories" className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
              <FiTag className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Categories
            </Link>
            <Link to="/admin/orders" className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
              <FiShoppingBag className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Orders
            </Link>
            <Link to="/admin/customers" className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
              <FiUsers className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Customers
            </Link>
             <Link to={`/profile/${id}`} className={`flex items-center px-4 py-3 rounded-lg ${currentTheme.link}`}>
              <CgProfile  className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              Profile 
          </Link>
           <button onClick={handleLogOut} className={`flex items-center px-4 py-3
            cursor-pointer rounded-lg ${currentTheme.link}`}>
              <FaArrowRightFromBracket   className={`w-5 h-5 mr-3 ${currentTheme.icon}`} />
              
              Log Out 
          </button>
          
           
          </div>
        </header>

       
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-light mb-2 ${currentTheme.heading}`}>
              Welcome to your <span className="font-medium">Admin Dashboard</span>
            </h2>
            <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your store efficiently with our intuitive admin panel
            </p>
            
            {/* Stats Preview - Modern cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { title: 'Total Products', value: products, icon: <FiBox /> },
                { title: 'Active Orders', value: orders, icon: <FiShoppingBag /> },
                { title: 'Categories', value: categories, icon: <FiTag /> },
                { title: 'Customers', value: customer, icon: <FiUsers /> }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`p-5 rounded-xl border ${currentTheme.border} ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-xs`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg xl:text-xl font-medium ${darkMode ? 'text-gray-100' : 'text-gray-500'}`}>
                      {stat.title}
                    </h3>
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      {React.cloneElement(stat.icon, { 
                        className: `w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}` 
                      })}
                    </div>
                  </div>
                  <p className={`text-2xl font-semibold mt-3 ${currentTheme.heading}`}>
                    {stat.value} 
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard