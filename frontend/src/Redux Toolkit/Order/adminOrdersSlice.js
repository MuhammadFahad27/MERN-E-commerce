import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    Orders:[] ,
    loading : false ,
   
  
    
}

export const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers:{

        startFetch:(state,action)=>{

            state.loading = true ;
            state.Orders = [] ;

        },
        fetchOrders:(state,action)=>{

            state.loading = false ;
            state.Orders = action.payload    ;
        },
        endFetch:(state)=>{
            
            state.loading = false 
        } ,
      
    
  }
    
})

export const {   
   
    startFetch ,
    fetchOrders ,
    endFetch 
    
    
} = adminOrdersSlice.actions

export default adminOrdersSlice.reducer