import React, { useEffect, useState } from 'react';
import { Toaster } from "sonner";
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Public & Customer Pages
import Home from './Pages/Home';
import About from './Pages/About';
import AllProducts from './Pages/AllProducts';
import UserProduct from './Pages/UserProduct';
import Cart from './Pages/Cart';
import CheckOut from './Pages/CheckOut';
import UserOrders from './Pages/UserOrders';
import Profile from './Pages/Profile';
import Error from './Pages/Error';

// Auth Pages
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

// Admin Pages
import Dashboard from './Pages/Admin/Dashboard';
import Products from './Pages/Admin/Products';
import Categories from './Pages/Admin/Categories';
import Customers from './Pages/Admin/Customers';
import CreateProduct from './Pages/Admin/CreateProduct';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import SingleProduct from './Pages/Admin/SingleProduct';
import AllReviews from './Pages/AllReviews';
import AllOrders from './Pages/Admin/AllOrders';

// Route Guards & Layout
import Header from './Components/Header';
import Footer from './Components/Footer';
import AuthRoute from './Components/AuthRoute';
import UserRoute from './Components/UserRoute';
import PrivateRoutes from './Components/Admin/PrivateRoutes';
import Loader from './Components/Loader';

// State & Hooks
import { signInSuccess } from './Redux Toolkit/User/userSlice';
import { useAllCartItems } from './Hooks/useAllCartItems';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.user.user);
  const role = user?.role;

  const { fetchAllCartItems } = useAllCartItems();

  const isAuthPage = ['/sign-in', '/sign-up'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Verify authentication session on first app load (non-blocking for guests)
  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/auth/verification`,
          { withCredentials: true }
        );

        if (response.data?.success && response.data?.user) {
          dispatch(signInSuccess(response.data.user));
          if (response.data.user.id) {
            fetchAllCartItems(response.data.user.id);
          }
        }
      } catch (err) {
        // Unauthenticated visitor: allow normal guest browsing
      } finally {
        setInitialLoading(false);
      }
    };

    checkAuthSession();
  }, [dispatch]);

  // Fetch cart when authenticated user changes
  useEffect(() => {
    if (user?.id) {
      fetchAllCartItems(user.id);
    }
  }, [user?.id]);

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-slate-900'}`}>
      <Toaster position="top-right" theme={darkMode ? "dark" : "light"} richColors duration={2500} />

      {!isAuthPage && !isAdminRoute && <Header />}

      <div className="flex-grow">
        <Routes>
          {/* === Public Storefront Routes (Accessible by all visitors) === */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/all/Products" element={<AllProducts />} />
          <Route path="/user/product-details/:id" element={<UserProduct />} />

          {/* === Guest Auth Routes (Redirects if already signed in) === */}
          <Route element={<AuthRoute />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* === Protected Customer Routes (Requires Login) === */}
          <Route element={<UserRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/user-orders" element={<UserOrders />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>

          {/* === Protected Admin Routes (Requires Admin Role) === */}
          <Route element={<PrivateRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/create-product" element={<CreateProduct />} />
            <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
            <Route path="/admin/product-details/:id" element={<SingleProduct />} />
            <Route path="/admin/product-reviews/:id" element={<AllReviews />} />
            <Route path="/admin/orders" element={<AllOrders />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>

      {!isAuthPage && !isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
