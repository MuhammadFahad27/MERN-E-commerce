import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    allOrders:[] ,
    loading : false ,
   
  
    
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers:{

        startFetchAllOrders:(state,action)=>{

            state.loading = true ;
            state.allOrders = [] ;

        },
        fetchAllOrders:(state,action)=>{

            state.loading = false ;
            state.allOrders = action.payload    ;
        },
        endFetchAllOrders:(state,action)=>{
            
            state.loading = false 
        } ,
      
    
  }
    
})

export const {   
   
    startFetchAllOrders ,
    fetchAllOrders ,
    endFetchAllOrders 
    
    
} = orderSlice.actions

export default orderSlice.reducer