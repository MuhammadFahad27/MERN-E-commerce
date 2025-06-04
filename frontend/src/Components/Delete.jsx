import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { deleteCustomer } from '../Redux Toolkit/Customers/customerSlice'
import { removeProduct } from '../Redux Toolkit/Products/productSlice'

const Delete = ({ isdelete , setDelete ,id , action ,  setFilterCustomers , 
  setFilterProducts 
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
    
  
  const dispatch = useDispatch() ;

  const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-900',
      buttonCancel: 'bg-gray-200 text-black hover:bg-gray-300',
      buttonDelete: 'bg-red-600 text-white hover:bg-red-700',
    },
    dark: {
      bg: 'bg-gray-800',
      text: 'text-white',
      buttonCancel: 'bg-gray-600 text-white hover:bg-gray-500',
      buttonDelete: 'bg-red-500 text-white hover:bg-red-600',
    },
  }

  const currentTheme = darkMode ? theme.dark : theme.light ;

  const handleDelete = async ()=>{

      try {

          if(action==='delete-product'){

             const response = await axios.delete(import.meta.env.VITE_API_URL+`/admin/delete-product/${id}`,{
               withCredentials:true 
            })
            
           if(response?.data?.success){

                toast.success(response?.data?.message)
                setDelete(!isdelete)
                dispatch(removeProduct(id))
                setFilterProducts(prev=> prev.filter((p)=>p._id !== id ))
               
                return ;
             }
          }
          else{

              const response = await axios.delete(import.meta.env.VITE_API_URL+`/admin/delete-user/${id}`,{
              withCredentials:true 
              })
              if(response?.data?.success){

                toast.success(response?.data?.message)
                setDelete(!isdelete)
                dispatch(deleteCustomer(id))
                setFilterCustomers(prev=> prev.filter((c)=>c._id !== id))

                return ;
             }
          }
        

        
      } catch (error) {
        toast.error(error?.response?.data?.message) ;
      }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blur bg-opacity-40 backdrop-blur-sm z-50">
      <div className={`w-full max-w-sm p-6 rounded-xl shadow-lg ${currentTheme.bg} ${currentTheme.text}`}>
        <h2 className="text-xl font-semibold mb-4 text-center">Are you sure you want to delete?</h2>
        <div className="flex justify-between mt-6">
          <button
            onClick={()=>{

                setDelete(!isdelete)
            }}
            className={`w-1/2 mr-2 py-2 rounded-lg font-medium 
                cursor-pointer ${currentTheme.buttonCancel}`}
          >
            Cancel
          </button>
          <button
            
            className={`w-1/2 ml-2 py-2 rounded-lg font-medium 
                cursor-pointer  ${currentTheme.buttonDelete}`}
          onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Delete
