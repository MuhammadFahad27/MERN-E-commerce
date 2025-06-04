import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FiMenu, FiShoppingCart, FiUser, FiX } from 'react-icons/fi'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../Redux Toolkit/Theme/themeSlice';
import axios from "axios" 
import {toast} from 'sonner'
import {useNavigate} from 'react-router-dom'
import { signOut } from '../Redux Toolkit/User/userSlice';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user  = useSelector((state)=>state?.user?.isLoggedIn) ;
  const role  = useSelector((state)=>state?.user?.user?.role) ;
  const id = useSelector((state)=>state?.user?.user?.id) ;
  const total = useSelector((state)=>state?.cart?.totalProducts)
 
  

  const navigate = useNavigate() ;
  

  // Theme colors
  const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-700',
      hoverText: 'hover:text-blue-500',
      activeText: 'text-blue-600',
      border: 'border-gray-300',
      shadow: 'shadow-md',
      profileMenu: 'bg-white',
      profileHover: 'hover:bg-gray-100',
      mobileMenu: 'bg-white',
      searchBorder: 'border-gray-300',
      searchFocus: 'focus:ring-blue-500',
      button:'hover:text-black border '
    },
    dark: {
      bg: 'bg-zinc-800',
      text: 'text-gray-200',
      hoverText: 'hover:text-blue-400',
      activeText: 'text-blue-400',
      border: 'border-gray-600',
      shadow: ' shadow-gray-900',
      profileMenu: 'bg-zinc-700',
      profileHover: 'hover:bg-zinc-600',
      mobileMenu: 'bg-zinc-800',
      searchBorder: 'border-gray-600',
      searchFocus: 'focus:ring-blue-400',
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  const handleLogOut = async ()=>{

    try {

        
            const response = await axios.post(import.meta.env.VITE_API_URL+'/auth/sign-out',{},{withCredentials:true}) ;
            const user = await response.data;

        if(user.success){

          dispatch(signOut())
          toast.success(user.message) ;
          navigate('/sign-in')
           window.location.href = '/sign-in';
          
          
      }
      
    } catch (error) {
      
        toast.success(error?.response?.data?.message) ;
          dispatch(signOut());
    window.location.href = '/sign-in';

    }
  }

  return (
    <header className={`flex items-center justify-between p-4 ${currentTheme.bg} ${currentTheme.shadow}
    transition-colors duration-300 relative`}>
      
      {/* === LEFT SECTION === */}

      
      <div className="flex items-center space-x-4">
       
        <button
          className="md:hidden text-2xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX className={currentTheme.text} /> : <FiMenu className={currentTheme.text} />}
        </button>

        {/* Title - hidden on mobile, visible on md+ */}
        <Link to={'/'} className=" md:block">
          <h1 className={`text-2xl font-bold ${currentTheme.text}`}>E-Commerce</h1>
        </Link>
      </div>

      {/* === MIDDLE SECTION: Search bar - visible on sm+ (mobile hidden) === */}
      {/* <div className="sm:flex flex-grow mx-4 md:justify-center">
        <input
          type="search"
          placeholder="Search products..."
          className={`w-full max-w-md border ${currentTheme.searchBorder} rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${currentTheme.searchFocus} ${currentTheme.bg} ${currentTheme.text}`}
        />
      </div> */}

      {/* === RIGHT SECTION === */}
      <div className="flex items-center space-x-4">
        {/* Nav Links - hidden on mobile, visible on md+ */}
        <nav className={`hidden md:flex space-x-6 font-medium ${currentTheme.text}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${currentTheme.activeText} border-b-2 border-blue-600 pb-1`
                : currentTheme.hoverText
            }
          >
            Home
          </NavLink>

          {

            !user &&  <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              isActive
                ? `${currentTheme.activeText} border-b-2 border-blue-600 pb-1`
                : currentTheme.hoverText
            }
          >
            Sign Up
          </NavLink>
          }
         
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${currentTheme.activeText} border-b-2 border-blue-600 pb-1`
                : currentTheme.hoverText
            }
          >
            About
          </NavLink>
        </nav>

        {/* Theme Toggle - always visible */}
        <button className={`text-xl cursor-pointer ${currentTheme.text}`} onClick={() => dispatch(toggleTheme())}>
          {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
         
        {/* Cart Icon - always visible */}
{
  user && (
    <div className="relative">
      <Link to={'/cart'}>
         <FiShoppingCart className={`text-xl cursor-pointer ${currentTheme.text}`} />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs  px-1.5 py-0.5a rounded-full">
        {total}
      </span>
      </Link>
     
    </div>
  )
}

        {/* Profile Icon - always visible */}
        <div className="relative">

          {

            user &&  <FiUser
            className={`text-xl cursor-pointer ${currentTheme.text}`}
            onClick={() => setProfileOpen(!profileOpen)}
          />
          }
         

          {profileOpen && (
            <div className={`absolute right-0 mt-2 w-32 border rounded ${currentTheme.profileMenu} ${currentTheme.shadow} z-50`}>
              
              {

                user && 
                 
                  <Link
                    to={`/profile/${id}`}
                    onClick={() => setProfileOpen(false)}
                    className={`block px-4 py-2 ${currentTheme.text} ${currentTheme.profileHover}`}
                  >
                    Profile
                  </Link>

              }
            
                
                  <Link
                    to={`/user-orders`}
                    onClick={() => setProfileOpen(false)}
                    className={`block px-4 py-2 ${currentTheme.text} ${currentTheme.profileHover}`}
                  >
                    Orders
                  </Link>
              <button
                onClick={() => {
                  setProfileOpen(false)
                  handleLogOut()
                }}
                className={`block w-full text-left px-4 py-2 ${currentTheme.text} ${currentTheme.profileHover}`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* === Mobile Menu Overlay === */}
      {menuOpen && (
        <div className={`fixed inset-0 ${currentTheme.mobileMenu} z-40 flex flex-col p-6 space-y-6 ${currentTheme.text}`}>
          {/* Mobile menu header with close button */}
          <div className="flex justify-between items-center mb-8">
            {/* <Link to={'/'} onClick={() => setMenuOpen(false)}>
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>E-Commerce</h1>
            </Link> */}
            {/* <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl"
              aria-label="Close menu"
            >
              <FiX className={currentTheme.text} />
            </button> */}
          </div>


          {/* Mobile navigation links */}
          <nav className="flex flex-col space-y-4 text-lg">
            <NavLink 
              to="/" 
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) => 
                isActive 
                  ? `${currentTheme.activeText} font-bold` 
                  : `hover:text-blue-500`
              }
            >
              Home
            </NavLink>

            {

              !user && 
               <NavLink 
              to="/sign-up" 
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) => 
                isActive 
                  ? `${currentTheme.activeText} font-bold` 
                  : `hover:text-blue-500`
              }
            >
              Sign Up
            </NavLink>
            }
           
            <NavLink 
              to="/about" 
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) => 
                isActive 
                  ? `${currentTheme.activeText} font-bold` 
                  : `hover:text-blue-500`
              }
            >
              About
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header