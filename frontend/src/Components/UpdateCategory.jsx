import React from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'

const UpdateCategory = ({ id, setName , name , updated , setIsUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const darkMode = useSelector((state) => state.theme.darkMode)

  const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      inputBg: 'bg-white',
      border: 'border-gray-200',
      buttonPrimary: 'bg-black text-white hover:bg-gray-800',
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      heading: 'text-white',
      inputBg: 'bg-gray-800',
      border: 'border-gray-700',
      buttonPrimary: 'bg-white text-black hover:bg-gray-200',
    },
  }

  const currentTheme = darkMode ? theme.dark : theme.light

  const onSubmit = async (data) => {

   
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/update-category/${id}`,
        data,   
        {
          withCredentials: true,
        }
      )

      const api_response = response.data

      if (api_response.success) {
            toast.success(api_response.message)
            setIsUpdate(!updated)
            setName(!name)  
      }
    } catch (error) {
        console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    // Overlay
    <div className="fixed inset-0 bg-blur bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
      {/* Modal Content */}
      <div className={`w-full max-w-md rounded-lg  border-1 p-6 ${currentTheme.bg} ${currentTheme.text} shadow-xl`}>
        <h2 className={`text-2xl font-semibold mb-4 ${currentTheme.heading}`}>Update Category</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Category Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter new category name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">Category name is required</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={()=> setName(!name)}
              
              className="px-4 py-2 rounded-md border text-sm border-gray-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type='submit'
              className={`px-4 py-2 rounded-md text-sm
                cursor-pointer  ${currentTheme.buttonPrimary}`}
           >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateCategory
