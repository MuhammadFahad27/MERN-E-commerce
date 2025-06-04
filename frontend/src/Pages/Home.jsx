import React from 'react'
import { useSelector } from 'react-redux'
import logo from '../assets/logo.jpg'
import {Link} from 'react-router-dom'

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  // Modern theme configuration
  const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      buttonPrimary: 'bg-black hover:bg-gray-800 hover:text-black border text-white',
      buttonSecondary: 'bg-white hover:bg-gray-50 text-black border border-black',
      overlay: 'bg-white/90',
      divider: 'border-gray-100'
    },
    dark: {
      bg: 'bg-gray-950',
      text: 'text-gray-100',
      heading: 'text-white',
      buttonPrimary: 'bg-white hover:bg-transparent hover:text-gray-100 hover:border text-black',
      buttonSecondary: 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700',
      overlay: 'bg-gray-950/90',
      divider: 'border-gray-800'
    }
  }

  const currentTheme = darkMode ? theme.dark : theme.light

  return (
    <main className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500`}>
      {/* Hero Section with Gradient Overlay */}
      <section className="relative h-screen max-h-[900px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={logo} 
            alt="Premium Collection" 
            className="w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 ${currentTheme.overlay} transition-colors duration-500`}></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight ${currentTheme.heading}`}>
              Elevate Your <span className="font-medium">Style</span> Journey
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              Discover curated collections that blend timeless elegance with modern sophistication.
            </p>
            <div className="flex gap-4">
              <Link to={'/all/products'}>
                <button className={`px-8 py-3.5 rounded-full text-sm uppercase 
                  cursor-pointer tracking-wider ${currentTheme.buttonPrimary} transition-all duration-300 
                  hover:scale-[1.02] transform hover:shadow-lg`}>
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse">
          <div className={`w-6 h-10 rounded-full border ${currentTheme.divider} flex items-start justify-center p-1`}>
            <div className="w-1 h-2 rounded-full bg-gray-500 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className={`max-w-4xl mx-auto text-center mb-20 ${currentTheme.text}`}>
            <span className="text-sm uppercase tracking-widest opacity-70 mb-4 inline-block">Craftsmanship</span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">Where Quality Meets Design</h2>
            <div className="w-20 h-px mx-auto bg-gray-300 dark:bg-gray-700 mb-6"></div>
            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
              Each piece in our collection tells a story of meticulous craftsmanship and thoughtful design.
            </p>
          </div>

          {/* Featured Product Showcase */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative group">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-[1.01] transition duration-500">
                <img 
                  src={logo} 
                  alt="Featured Product" 
                  className="w-full h-full object-cover object-center transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -inset-4 border border-gray-200 dark:border-gray-700 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <span className="text-sm uppercase tracking-widest opacity-70 mb-4 inline-block">Featured</span>
              <h3 className={`text-3xl font-light mb-6 leading-tight ${currentTheme.heading}`}>The Essence Collection</h3>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                Our signature line embodies timeless elegance with contemporary functionality. Designed to last through seasons and crafted to impress in every detail.
              </p>
              <Link to={'/all/products'}>
                <button className={`px-8 py-3.5 rounded-full text-sm uppercase 
                  cursor-pointer tracking-wider ${currentTheme.buttonPrimary} transition-all duration-300 hover:scale-[1.02]`}>
                  Explore Collection
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 border-t ${currentTheme.divider} transition-colors duration-500`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-light mb-3">Quality Assurance</h3>
              <p className="opacity-80 leading-relaxed">Rigorous standards ensure every product meets our excellence criteria.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-light mb-3">Timeless Design</h3>
              <p className="opacity-80 leading-relaxed">Collections crafted to remain relevant season after season.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-light mb-3">Ethical Sourcing</h3>
              <p className="opacity-80 leading-relaxed">Responsibly sourced materials from trusted partners worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={`py-24 ${currentTheme.divider} transition-colors duration-500`}>
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <span className="text-sm uppercase tracking-widest opacity-70 mb-4 inline-block">Stay Updated</span>
          <h3 className="text-2xl font-light mb-6">Join Our Community</h3>
          <p className="mb-8 opacity-90 max-w-md mx-auto leading-relaxed">
            Subscribe for exclusive offers, early access to new collections, and style inspiration delivered to your inbox.
          </p>
       
        </div>
      </section>
    </main>
  )
}

export default Home