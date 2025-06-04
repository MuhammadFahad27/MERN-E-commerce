import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  // Theme configuration
  const theme = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      cardBg: 'bg-white',
      border: 'border-gray-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      heading: 'text-gray-900',
      link: 'text-blue-600 hover:text-blue-800'
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-200',
      cardBg: 'bg-gray-800',
      border: 'border-gray-700',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      heading: 'text-white',
      link: 'text-blue-400 hover:text-blue-300'
    }
  }

  const currentTheme = darkMode ? theme.dark : theme.light

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${currentTheme.bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl ${currentTheme.heading} mb-6`}>
            About Our Company
          </h1>
          <p className={`max-w-3xl mx-auto text-xl ${currentTheme.text}`}>
            We're revolutionizing the e-commerce space with innovative solutions and customer-first approach.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Mission Card */}
          <div className={`rounded-lg shadow-lg p-6 ${currentTheme.cardBg} border ${currentTheme.border} transition-colors duration-300`}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`ml-3 text-lg font-medium ${currentTheme.heading}`}>Our Mission</h3>
            </div>
            <p className={`mt-2 ${currentTheme.text}`}>
              To empower businesses and consumers through seamless e-commerce experiences that are fast, secure, and enjoyable.
            </p>
          </div>

          {/* Values Card */}
          <div className={`rounded-lg shadow-lg p-6 ${currentTheme.cardBg} border ${currentTheme.border} transition-colors duration-300`}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`ml-3 text-lg font-medium ${currentTheme.heading}`}>Core Values</h3>
            </div>
            <ul className={`mt-2 space-y-2 ${currentTheme.text}`}>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-green-500">•</span>
                <span className="ml-2">Customer Obsession</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-green-500">•</span>
                <span className="ml-2">Innovation</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-green-500">•</span>
                <span className="ml-2">Transparency</span>
              </li>
            </ul>
          </div>

          {/* Team Card */}
          <div className={`rounded-lg shadow-lg p-6 ${currentTheme.cardBg} border ${currentTheme.border} transition-colors duration-300`}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`ml-3 text-lg font-medium ${currentTheme.heading}`}>Our Team</h3>
            </div>
            <p className={`mt-2 ${currentTheme.text}`}>
              A diverse group of passionate individuals with expertise in technology, design, and business development.
            </p>
            <button className={`mt-4 px-4 py-2 rounded-md ${currentTheme.button} transition-colors duration-300`}>
              Meet the Team
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`py-12 px-6 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} mb-16 transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <p className={`text-4xl font-extrabold ${currentTheme.heading} sm:text-5xl`}>10M+</p>
                <p className={`mt-2 text-lg font-medium ${currentTheme.text}`}>Customers</p>
              </div>
              <div className="text-center">
                <p className={`text-4xl font-extrabold ${currentTheme.heading} sm:text-5xl`}>500K+</p>
                <p className={`mt-2 text-lg font-medium ${currentTheme.text}`}>Products</p>
              </div>
              <div className="text-center">
                <p className={`text-4xl font-extrabold ${currentTheme.heading} sm:text-5xl`}>120+</p>
                <p className={`mt-2 text-lg font-medium ${currentTheme.text}`}>Countries</p>
              </div>
              <div className="text-center">
                <p className={`text-4xl font-extrabold ${currentTheme.heading} sm:text-5xl`}>24/7</p>
                <p className={`mt-2 text-lg font-medium ${currentTheme.text}`}>Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${currentTheme.heading} sm:text-4xl mb-6`}>
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-600">Start your journey today.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${currentTheme.button} transition-colors duration-300`}
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="#"
                className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${currentTheme.link} transition-colors duration-300`}
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About