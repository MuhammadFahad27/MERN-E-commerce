import React, { useEffect, useState } from 'react'
import { Toaster, toast } from "sonner";
import {Routes , Route, useNavigate} from 'react-router-dom'
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Error from './Pages/Error';
import Home from './Pages/Home';
import About from './Pages/About';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from './Components/Loader';
import Dashboard from './Pages/Admin/Dashboard';
import Products from './Pages/Admin/Products';
import Categories from './Pages/Admin/Categories';
import PrivateRoutes from './Components/Admin/PrivateRoutes';
import Profile from './Pages/Profile';
import Customers from './Pages/Admin/Customers';
import CreateProduct from './Pages/Admin/CreateProduct';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import SingleProduct from './Pages/Admin/SingleProduct';
import AllProducts from './Pages/AllProducts';
import UserProduct from './Pages/UserProduct';
import AuthRoute from './Components/AuthRoute';
import Cart from './Pages/Cart';
import AllReviews from './Pages/AllReviews';
import UserRoute from './Components/UserRoute';
import { useAllCartItems } from './Hooks/useAllCartItems';
import CheckOut from './Pages/CheckOut';
import UserOrders from './Pages/UserOrders';
import AllOrders from './Pages/Admin/AllOrders';




const App = () => {

  const location = useLocation() ;
  
  const SignIn_SignUp  =  ['/sign-in' , '/sign-up']
  const [loading,setLoading] = useState(false) ;
  const userId = useSelector((state) => state?.user?.user?.id) ;
  

  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  const {fetchAllCartItems} = useAllCartItems() ;

  
    
    useEffect(() => {
      async function fetchData() {
        await fetchAllCartItems(userId);
      }
      fetchData();
    }, []);

 


  const visible = SignIn_SignUp.includes(location.pathname) ;
  const darkMode = useSelector((state) => state.theme.darkMode)
  const role = useSelector((state) => state?.user?.user?.role)



 useEffect(() => {

  const checkAuth  = async ()=>{

    try {

      
      setLoading(true) ;
      const response = await axios.get(import.meta.env.VITE_API_URL+'/auth/verification',{

        withCredentials:true 
      })

      
      const authenticated = await response.data ;

      if(!authenticated.success){

          navigate('/sign-in') ;
          
          setLoading(false) ; 
         
         
          return ;
      }
       if(authenticated.success){

         setLoading(false) ;
          
          return 

      }
      
    } catch (error) {
      console.log(error) 
      setLoading(false);
    }
  
  }
  checkAuth() 
 }, []);

  if(loading){

    return <Loader/>
  }
  return (
    
    <>
      <Toaster position="top-right"  theme={darkMode ? "dark" : "light"} richColors duration={2000}  />

      {!visible &&  role !=='admin' && <Header/> }
      <Routes>

       

         {/* <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/> */}

            <Route element={<AuthRoute />}>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
            </Route>

        

        {/* --- User Routes ------ */}

        

            <Route path='/profile/:id' element={<Profile/>}/>
        <Route element={<UserRoute/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/all/Products' element={<AllProducts/>}/>
            <Route path='/user/product-details/:id' element={<UserProduct/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<CheckOut/>}/>
            <Route path='/user-orders' element={<UserOrders/>}/>



        </Route>
      

        {/* ----ADMIN ROUTESS ----- */} 

        <Route element={<PrivateRoutes/>}>

          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/products' element={<Products/>}/>
          <Route path='/admin/categories' element={<Categories/>}/>
          <Route path='/admin/customers' element={<Customers/>}/>
          <Route path='/admin/create-product' element={<CreateProduct/>}/>
          <Route path='/admin/update-product/:id' element={<UpdateProduct/>}/>
          <Route path='/admin/product-details/:id' element={<SingleProduct/>}/>
          <Route path='/admin/product-reviews/:id' element={<AllReviews/>}/>
          <Route path='/admin/orders' element={<AllOrders/>}/>


        </Route>
       

        



        <Route path='*' element={<Error/>}/>
      </Routes>
       {!visible && role !=='admin' &&  <Footer/> }
   </>
  )
}

export default App
