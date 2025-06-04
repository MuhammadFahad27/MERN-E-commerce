import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios' 
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { updateProfile } from '../Redux Toolkit/User/userSlice'

const Profile = () => {
  const role = useSelector((state) => state?.user?.user?.role)
  const user = useSelector((state) => state?.user?.user)
  const [details, setDetails] = useState()
  const [update, setupdate] = useState(false)
  const dispatch = useDispatch() ;

  const darkMode = useSelector((state) => state.theme.darkMode)

  const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      inputBg: 'bg-white',
      border: 'border-gray-200',
      button: 'bg-black text-white hover:bg-gray-800',
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      heading: 'text-white',
      inputBg: 'bg-gray-800',
      border: 'border-gray-700',
      button: 'bg-white text-black hover:bg-gray-200',
    },
  }
  
  const currentTheme = darkMode ? theme.dark : theme.light
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
    
  } = useForm()
  
  const { id } = useParams()
useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + `/user-details/${id}`, { withCredentials: true })
        if(response.data.success){


            setDetails(response.data.user) 
               reset({
                  username: response.data.user.username,
                  email: response.data.user.email,
                  
                });
            
            return 
          
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
        return 
        
      }
    }

    currentUser()
  }, [id,update , reset])

  if (!role) {
    return <Navigate to={'/sign-in'} />
  }

  
  

  

  const onSubmit = async (data) => {
    console.log(data)

    try {

        const api_response = await axios.put(import.meta.env.VITE_API_URL+`/update-user/${id}`,data,{
            withCredentials:true 
        })

        

        if(api_response.data.success){

            setupdate(!update)
            toast.success(api_response.data.message) ;
            dispatch(updateProfile(api_response.data.user))
            reset() ;
            return ;
        }
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    finally{

        reset() ;
    }
    

    
  }

  return (
    <main className={`min-h-screen flex items-center justify-center p-4 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="w-full max-w-xl p-8 rounded-lg shadow-lg border" >
        <h1 className={`text-3xl font-bold mb-6 text-center ${currentTheme.heading}`}>Welcome, {user?.name}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder={details?.username}
              {...register("username")}
              className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder={details?.email}
              {...register("email")}
              className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium 
                cursor-pointer  ${currentTheme.button}`}
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  )
}

export default Profile
