import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import {Link, Navigate} from 'react-router-dom'
import axios from "axios" 
import {toast} from 'sonner'
import {useNavigate} from 'react-router-dom'
import Spinner from '../Components/Spinner'
import { signInEnd, signInStart, signInSuccess } from '../Redux Toolkit/User/userSlice'


const SignIn = () => {
   const darkMode = useSelector((state) => state.theme.darkMode)
   const loading  = useSelector((state)=>state.user.loading) ;
  
   

   const navigate = useNavigate() ;
   const dispatch = useDispatch() ;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = async(data) => {

      try {

          dispatch(signInStart()) ;
          const response = await axios.post(import.meta.env.VITE_API_URL+'/auth/sign-in',data,{
            withCredentials:true
          }) ;
          const user = await response.data;

      if(user.success){

        dispatch(signInSuccess(user.user))
        toast.success(user.message) ;
        if(user?.user?.role === 'admin'){

            navigate('/admin/dashboard') ;
            return ;

          }
          else{


            navigate('/')
          }

          
       
      }
        
      } catch (error) {

          dispatch(signInEnd())
          console.log(error)
          toast.error(error?.response?.data?.message)
        
      }
      finally{

           dispatch(signInEnd())

      }
      
    }

     const theme = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      cardBg: 'bg-white',
      border: 'border-gray-300',
      inputBg: 'bg-white',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      error: 'text-red-600',
      link: 'text-blue-600 hover:text-blue-800',
      label: 'text-gray-700'
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-200',
      cardBg: 'bg-zinc-900',
      border: 'border-gray-700',
      inputBg: 'bg-gray-700',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      error: 'text-red-400',
      link: 'text-blue-400 hover:text-blue-300',
      label: 'text-gray-300'
    }
  }

  const currentTheme = darkMode ? theme.dark : theme.light

  return (
         <main className={`min-h-screen flex items-center justify-center px-4 py-12 ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`}>
            <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${currentTheme.cardBg} border ${currentTheme.border} transition-colors duration-300`}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">
                  <span className="text-blue-600">MERN</span> 
                  <span> E-Commerce</span>
                </h1>
                <p className="text-sm">Sign In to Your Account </p>
              </div>
      
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               
      
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${currentTheme.label}`}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                  />
                  {errors.email && (
                    <p className={`mt-1 text-sm ${currentTheme.error}`}>Email is required</p>
                  )}
                </div>
      
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className={`block text-sm font-medium mb-1 ${currentTheme.label}`}>
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                  />
                  {errors.password && (
                    <p className={`mt-1 text-sm ${currentTheme.error}`}>Password is required</p>
                  )}
                </div>
      
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md 
                      cursor-pointer  font-medium ${currentTheme.button} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300`}
                  >
                    {loading ? <Spinner/> : 'Sign In'}
                  </button>
                </div>
      
                {/* Login Link */}
                <div className="text-center text-sm">
                  <p>
                    Don't have an account?{' '}
                    <Link to={'/sign-up'} className={`font-medium ${currentTheme.link} transition-colors duration-300`}>
                      Sign up
                    </Link>
                   
                  </p>
                </div>
              </form>
            </div>
          </main>
  )
}

export default SignIn
