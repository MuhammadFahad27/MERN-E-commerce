import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    allCustomers:[] , 
    loading :false 
    
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
    reducers:{

         StartfetchALlCustomers:(state)=>{

            
            state.loading = true 

        },
        fetchALlCustomers:(state,action)=>{

            state.allCustomers = action.payload 
            state.loading = false

        },
         endfetchALlCustomers:(state)=>{

            
            state.loading = false 

        },
        deleteCustomer : (state,action)=>{

            state.allCustomers = state.allCustomers.filter((c)=> c._id !== action.payload )
        }

        
    }
})

export const { fetchALlCustomers  , deleteCustomer , 
    StartfetchALlCustomers , endfetchALlCustomers
 } = customerSlice.actions

export default customerSlice.reducer