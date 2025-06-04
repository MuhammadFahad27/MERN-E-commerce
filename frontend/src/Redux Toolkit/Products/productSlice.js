import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    products:[] ,
    loading : false 
   
    
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers:{

        startfetchAllProducts:(state)=>{

            
            state.loading = true 
        } ,

        fetchAllProducts:(state,action)=>{

            state.products = action.payload ;
            state.loading = false 
        } ,

        
        endfetchAllProducts:(state)=>{

            
            state.loading = false 
        } ,
        
        

        removeProduct : (state,action)=>{

          state.products = state.products.filter((p)=> p._id !== action.payload  )
        }
  }
    
})

export const {  startfetchAllProducts , fetchAllProducts , endfetchAllProducts , removeProduct , 
} = productSlice.actions

export default productSlice.reducer