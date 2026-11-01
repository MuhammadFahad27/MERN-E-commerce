import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiShoppingCart, FiUser, FiX, FiLogOut, FiPackage, FiGrid, FiSun, FiMoon } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../Redux Toolkit/Theme/themeSlice';
import { signOut } from '../Redux Toolkit/User/userSlice';
import axios from "axios";
import { toast } from 'sonner';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const darkMode = useSelector((state) => state.theme.darkMode);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const total = useSelector((state) => state.cart.totalProducts || 0);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/auth/sign-out`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch(signOut());
        toast.success(response.data.message || 'Signed out successfully');
        navigate('/sign-in');
      }
    } catch (error) {
      dispatch(signOut());
      toast.info('Signed out');
      navigate('/sign-in');
    } finally {
      setProfileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 font-semibold'
        : darkMode
        ? 'text-zinc-300 hover:text-white'
        : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 backdrop-blur-md ${
        darkMode
          ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100'
          : 'bg-white/90 border-slate-200/80 text-slate-800 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 focus:outline-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-lg">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">
              MERN<span className="text-blue-600 dark:text-blue-400">Store</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all/Products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink
              to="/admin/dashboard"
              className="text-xs px-2.5 py-1 rounded-md font-semibold bg-purple-600/10 text-purple-600 dark:text-purple-400 hover:bg-purple-600/20 transition-colors"
            >
              Admin Portal
            </NavLink>
          )}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              darkMode
                ? 'text-zinc-300 hover:bg-zinc-800'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="w-5 h-5 text-amber-400" /> : <FiMoon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
              darkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="Shopping Cart"
          >
            <FiShoppingCart className="w-5 h-5" />
            {total > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center animate-in zoom-in-75">
                {total > 99 ? '99+' : total}
              </span>
            )}
          </Link>

          {/* User Profile / Auth State */}
          {isLoggedIn && user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center space-x-2 p-1.5 rounded-xl border transition-all cursor-pointer ${
                  darkMode
                    ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-200'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center uppercase">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-52 rounded-2xl shadow-xl py-2 border z-50 transition-all ${
                    darkMode
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-200 shadow-black/50'
                      : 'bg-white border-slate-200 text-slate-700 shadow-slate-200/80'
                  }`}
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800">
                    <p className="text-xs font-semibold truncate">{user.name}</p>
                    <p className={`text-xs truncate ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                      {user.email}
                    </p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-600/10 text-blue-600 dark:text-blue-400">
                      {user.role || 'customer'}
                    </span>
                  </div>

                  <Link
                    to={`/profile/${user.id}`}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <FiUser className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/user-orders"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <FiPackage className="w-4 h-4 text-slate-400" />
                    <span>My Orders</span>
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-medium"
                    >
                      <FiGrid className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-100 dark:border-zinc-800 mt-1 pt-1">
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer text-left"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/sign-in"
                className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="hidden sm:inline-flex text-xs font-semibold px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-xs"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          className={`md:hidden border-b px-4 py-4 space-y-3 transition-colors ${
            darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
          }`}
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium py-1.5"
          >
            Home
          </NavLink>
          <NavLink
            to="/all/Products"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium py-1.5"
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium py-1.5"
          >
            About
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink
              to="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium py-1.5 text-purple-600 dark:text-purple-400 font-semibold"
            >
              Admin Dashboard
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
