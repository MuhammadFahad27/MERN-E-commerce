import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { endfetchALlCustomers, fetchALlCustomers, StartfetchALlCustomers } from '../../Redux Toolkit/Customers/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io'
import Delete from '../../Components/Delete'
import Loader from '../../Components/Loader'

const Customers = () => {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state?.customer?.allCustomers)
  const [filterCustomers , setFilterCustomers ]= useState([]) ;
  const loading = useSelector((state) => state?.customer?.loading)

  const darkMode = useSelector((state) => state.theme.darkMode)
  const [isdelete , setDelete ] = useState(false) ;
  const [id,setId] = useState();
  const [isUpdated , setUpdated ] = useState(false) ;
  

  const handleDelete = ()=>{

    setDelete(!isdelete) ;
  }

  const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      table: 'bg-gray-100',
      border: 'border-gray-200',
    },
    dark: {
      bg: 'bg-zinc-900',
      text: 'text-gray-100',
      heading: 'text-white',
      table: 'bg-gray-800',
      border: 'border-gray-700',
    },
  }

  const currentTheme = darkMode ? theme.dark : theme.light

  useEffect(() => {
    const customers = async () => {
      try { 

          dispatch(StartfetchALlCustomers()) ;
          const api_response = await axios.get(import.meta.env.VITE_API_URL + '/admin/all-users', {
          withCredentials: true,
        })
        if(api_response.data.success){

        
          dispatch(fetchALlCustomers(api_response.data.allUsers)) ;
          setFilterCustomers(api_response.data.allUsers) ;
        }
      } catch (error) {
        dispatch(endfetchALlCustomers())
        toast.error(error?.response?.data?.message)

      }
    }
    customers()
  }, [isUpdated])

  const handleFilter = async (e)=>{

      const name = e.target.value ;

      if(!name){

        setFilterCustomers(customers)
        return ;
      }


      try {
        
          const api_response = await axios.get(import.meta.env.VITE_API_URL+`/get-users?name=${name}`,{
            withCredentials:true 
          })
          console.log(api_response.data.users) ;
          setFilterCustomers(api_response.data.users) ;


      } catch (error) {
        console.log(error)
      }
  }

  const handleRole = async (role , id )=>{

 

    try {

      const api_response = await axios.put(import.meta.env.VITE_API_URL+`/admin/update-role/${id}`,{role},{
        withCredentials:true 
      })

      if(api_response.data.success){

        console.log("Updated User : ",api_response.data.user)
        setUpdated(!isUpdated)
        toast.success(api_response.data.message)
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }


  }

  return (

    loading ? <Loader/> :
    <main className={`min-h-screen p-4 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className={`text-2xl md:text-3xl font-bold ${currentTheme.heading}`}>
              Total Customers: {customers?.length}
            </h1>
            <input
              type="search"
              placeholder="Search customer "
              className="bg-transparent border px-3 py-2 rounded-md w-full md:w-64"
              onChange={handleFilter}
            />
        </div>

      

         {

           customers?.length === 0 ? <h1 className='text-center xl:text-xl '>No Customer Found </h1> :

              <div className="overflow-x-auto rounded-lg shadow">
          <table className={`min-w-full text-sm text-left ${currentTheme.table} ${currentTheme.border}`}>
            <thead className="uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email Address</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Update Role</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            {/* <tbody>
             
              {filterCustomers?.map((customer, index) => (
                <tr key={customer._id} className="border-t">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{customer.username}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.role.toUpperCase()}</td>
                  <td className="px-6 py-4 text-green-500 text-xl">
                    {customer.role === 'admin' ? <IoMdCheckmarkCircle /> : <IoMdCloseCircle className='text-red-400'/>}
                  </td>
                  <td className="px-6 py-4 text-green-500 text-xl">
                    {customer.role !== 'admin' ?  <IoMdCheckmarkCircle />: <IoMdCloseCircle className='text-red-500' />   }
                  </td>
                  <td className="px-6 py-4">
                    
                    <select className="border rounded px-2 py-1 bg-white text-black
                    cursor-pointer" onChange={(e)=>{

                        handleRole(e.target.value , customer._id)
                    }}>
                      <option value="user" selected={customer.role === 'user'}>User</option>
                      <option value="admin" selected={customer.role === 'admin'}>Admin</option>
                      
                    </select>
                  </td>
                  <td className="px-6 py-4 text-red-500 cursor-pointer">
                    <button className='cursor-pointer' onClick={()=>{

                      setDelete(!isdelete)
                      setId(customer._id)
                    }}>

                        <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}
            <tbody>
  {filterCustomers?.length === 0 ? (
    <tr>
      <td colSpan="8" className="text-center py-4 text-red-500 text-lg">
        No Customer Found
      </td>
    </tr>
  ) : (
    filterCustomers?.map((customer, index) => (
      <tr key={customer._id} className="border-t">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{customer.username}</td>
        <td className="px-6 py-4">{customer.email}</td>
        <td className="px-6 py-4">{customer.role.toUpperCase()}</td>
        <td className="px-6 py-4 text-green-500 text-xl">
          {customer.role === 'admin' ? (
            <IoMdCheckmarkCircle />
          ) : (
            <IoMdCloseCircle className="text-red-400" />
          )}
        </td>
        <td className="px-6 py-4 text-green-500 text-xl">
          {customer.role !== 'admin' ? (
            <IoMdCheckmarkCircle />
          ) : (
            <IoMdCloseCircle className="text-red-500" />
          )}
        </td>
        <td className="px-6 py-4">
          <select
            className="border rounded px-2 py-1 bg-white text-black cursor-pointer"
            onChange={(e) => handleRole(e.target.value, customer._id)}
          >
            <option value="user" selected={customer.role === 'user'}>
              User
            </option>
            <option value="admin" selected={customer.role === 'admin'}>
              Admin
            </option>
          </select>
        </td>
        <td className="px-6 py-4 text-red-500 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => {
              setDelete(!isdelete);
              setId(customer._id);
            }}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
          {

            isdelete && <Delete isdelete={isdelete} setDelete={setDelete} id={id}  setFilterCustomers={setFilterCustomers}/>
          }
        </div>
          }

      
      </div>
    </main>
  )
}

export default Customers
