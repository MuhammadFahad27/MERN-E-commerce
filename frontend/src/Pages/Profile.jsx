// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, useParams } from 'react-router-dom'
// import { useForm } from "react-hook-form"
// import axios from 'axios' 
// import { useDispatch } from 'react-redux'
// import { toast } from 'sonner'
// import { updateProfile } from '../Redux Toolkit/User/userSlice'

// const Profile = () => {
//   const role = useSelector((state) => state?.user?.user?.role)
//   const user = useSelector((state) => state?.user?.user)
//   const [details, setDetails] = useState()
//   const [update, setupdate] = useState(false)
//   const dispatch = useDispatch() ;

//   const darkMode = useSelector((state) => state.theme.darkMode)

//   const theme = {
//     light: {
//       bg: 'bg-white',
//       text: 'text-gray-800',
//       heading: 'text-gray-900',
//       inputBg: 'bg-white',
//       border: 'border-gray-200',
//       button: 'bg-black text-white hover:bg-gray-800',
//     },
//     dark: {
//       bg: 'bg-gray-900',
//       text: 'text-gray-100',
//       heading: 'text-white',
//       inputBg: 'bg-gray-800',
//       border: 'border-gray-700',
//       button: 'bg-white text-black hover:bg-gray-200',
//     },
//   }
  
//   const currentTheme = darkMode ? theme.dark : theme.light
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
    
//   } = useForm()
  
//   const { id } = useParams()
// useEffect(() => {
//     const currentUser = async () => {
//       try {
//         const response = await axios.get(import.meta.env.VITE_API_URL + `/user-details/${id}`, { withCredentials: true })
//         if(response.data.success){


//             setDetails(response.data.user) 
//                reset({
//                   username: response.data.user.username,
//                   email: response.data.user.email,
                  
//                 });
            
//             return 
          
//         }
//       } catch (error) {
//         toast.error(error?.response?.data?.message)
//         return 
        
//       }
//     }

//     currentUser()
//   }, [id,update , reset])

//   if (!role) {
//     return <Navigate to={'/sign-in'} />
//   }

  
  

  

//   const onSubmit = async (data) => {
//     console.log(data)

//     try {

//         const api_response = await axios.put(import.meta.env.VITE_API_URL+`/update-user/${id}`,data,{
//             withCredentials:true 
//         })

        

//         if(api_response.data.success){

//             setupdate(!update)
//             toast.success(api_response.data.message) ;
//             dispatch(updateProfile(api_response.data.user))
//             reset() ;
//             return ;
//         }
        
//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
//     finally{

//         reset() ;
//     }
    

    
//   }

//   return (
//     <main className={`min-h-screen flex items-center justify-center p-4 ${currentTheme.bg} ${currentTheme.text}`}>
//       <div className="w-full max-w-xl p-8 rounded-lg shadow-lg border" >
//         <h1 className={`text-3xl font-bold mb-6 text-center ${currentTheme.heading}`}>Welcome, {user?.name}</h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-1">Username</label>
//             <input
//               type="text"
//               placeholder={details?.username}
//               {...register("username")}
//               className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder={details?.email}
//               {...register("email")}
//               className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               {...register("password")}
//               className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               placeholder="********"
//             />
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-2 rounded-md font-medium 
//                 cursor-pointer  ${currentTheme.button}`}
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </main>
//   )
// }

// export default Profile

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
      bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
      text: 'text-gray-700',
      heading: 'text-gray-900',
      inputBg: 'bg-white',
      border: 'border-gray-200',
      button: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300',
      card: 'bg-white/80 backdrop-blur-sm border-gray-200/50',
      label: 'text-gray-700',
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      text: 'text-gray-200',
      heading: 'text-white',
      inputBg: 'bg-gray-800/50',
      border: 'border-gray-600/50',
      button: 'bg-gradient-to-r from-gray-100 to-white text-gray-900 hover:from-white hover:to-gray-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300',
      card: 'bg-gray-800/60 backdrop-blur-sm border-gray-700/50',
      label: 'text-gray-300',
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
    <main className={`min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className={`w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl border ${currentTheme.card} transition-all duration-300`}>
        <div className="text-center mb-8">
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${currentTheme.heading}`}>
            Welcome Back
          </h1>
          <p className={`text-lg sm:text-xl font-medium ${currentTheme.text} opacity-80`}>
            {user?.name}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username and Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={`block text-sm font-semibold mb-1 ${currentTheme.label}`}>
                Username
              </label>
              <input
                type="text"
                placeholder={details?.username}
                {...register("username")}
                className={`w-full px-3 py-2.5 text-sm rounded-lg border-2 ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400`}
                
              />
            </div>

            <div className="space-y-1">
              <label className={`block text-sm font-semibold mb-1 ${currentTheme.label}`}>
                Email Address
              </label>
              <input
                type="email"
                placeholder={details?.email}
                {...register("email")}
                className={`w-full px-3 py-2.5 text-sm rounded-lg border-2 ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400`}
                
              />
            </div>
          </div>

          {/* Password Row */}
          <div className="space-y-1">
            <label className={`block text-sm font-semibold mb-1 ${currentTheme.label}`}>
              New Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-3 py-2.5 text-sm rounded-lg border-2 ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400`}
              placeholder="Enter new password"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className={`w-full py-2.5 text-sm rounded-lg font-semibold cursor-pointer ${currentTheme.button}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Profile
