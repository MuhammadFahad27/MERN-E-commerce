import React from 'react'
import { useSelector } from 'react-redux'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  // Theme configuration
  const theme = {
    light: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      heading: 'text-gray-900',
      border: 'border-gray-200',
      link: 'text-gray-600 hover:text-gray-900',
      icon: 'text-gray-500 hover:text-gray-700',
      divider: 'border-gray-200'
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-300',
      heading: 'text-white',
      border: 'border-gray-700',
      link: 'text-gray-300 hover:text-white',
      icon: 'text-gray-400 hover:text-white',
      divider: 'border-gray-700',
      
    }
  }

  const currentTheme = darkMode ? theme.dark : theme.light

  return (
    <footer className={`${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${currentTheme.heading}`}>E-Commerce</h3>
            <p className="text-sm">
              Making online shopping seamless and enjoyable for everyone.
            </p>
            <div className="flex space-x-4">
             <a href="mailto:muhammadfahadkamboh3@gmail.com" className={`${currentTheme.icon} transition-colors duration-200`}>
                <BiLogoGmail size={20} />
              </a>
             
              <a href="https://wa.me/923233323883" target="_blank" rel="noopener noreferrer" className={`${currentTheme.icon} transition-colors duration-200`}>
                <FaWhatsapp size={20} />
                </a>
             <a href="https://www.linkedin.com/in/muhammadfahadashraf" target="_blank" rel="noopener noreferrer" className={`${currentTheme.icon} transition-colors duration-200`}>
                <FaLinkedin size={20} />
                </a>

             <a href="https://github.com/MuhammadFahad27" target="_blank" rel="noopener noreferrer" className={`${currentTheme.icon} transition-colors duration-200`}>
              <FaGithub size={20} />
            </a>

            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${currentTheme.heading}`}>Quick Links</h3>
            <ul className="space-y-2">
              <Link to={'/'}>
               <li className={`text-sm ${currentTheme.link} transition-colors duration-200`}>
                 Home
              </li>
              </Link>
               <Link to={'/about'}>
               <li className={`text-sm ${currentTheme.link} transition-colors duration-200`}>
                 About
              </li>
              </Link>
             
             
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${currentTheme.heading}`}>Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${currentTheme.link} transition-colors duration-200`}>FAQs</a>
              </li>
              <li>
                <a href="#" className={`text-sm ${currentTheme.link} transition-colors duration-200`}>Shipping Policy</a>
              </li>
              <li>
                <a href="#" className={`text-sm ${currentTheme.link} transition-colors duration-200`}>Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className={`text-sm ${currentTheme.link} transition-colors duration-200`}>Track Order</a>
              </li>
            </ul>
          </div>

         
        </div>

        {/* Divider */}
        <div className={`border-t ${currentTheme.divider} mt-12 pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className={`text-sm ${currentTheme.link} transition-colors duration-200`}>Privacy Policy</a>
              <a href="#" className={`text-sm ${currentTheme.link} transition-colors duration-200`}>Terms of Service</a>
              <a href="#" className={`text-sm ${currentTheme.link} transition-colors duration-200`}>Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer