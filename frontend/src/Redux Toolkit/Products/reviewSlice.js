import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    reviews:[] ,
    loading : false 
   
    
}

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers:{

        startfetchAllReviews:(state)=>{

            
            state.loading = true 
        } ,

        fetchAllReviews:(state,action)=>{

            state.reviews = action.payload ;
            state.loading = false 
        } ,

        
        endfetchAllreviews:(state)=>{

            
            state.loading = false 
        } ,

        updatedReviews : (state,action)=>{

            state.reviews = action.payload ;
        }
        
        

        
  }
    
})

export const {  startfetchAllReviews , fetchAllReviews , endfetchAllreviews ,updatedReviews} = reviewSlice.actions

export default reviewSlice.reducer