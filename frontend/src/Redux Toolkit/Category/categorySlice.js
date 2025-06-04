import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    categories:[] ,
    loading : false 
   
    
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers:{

        startfetchAllCategories:(state)=>{

            
            state.loading = true 
        } ,

        fetchAllCategories:(state,action)=>{

            state.categories = action.payload ;
            state.loading = false 
        } ,

        
        endfetchAllCategories:(state)=>{

            
            state.loading = false 
        } ,
        
        addCategory : (state,action)=>{

            state.categories.push (action.payload) ;

        } ,

        removeCategory : (state,action)=>{

          state.categories = state.categories.filter((category)=> category._id !== action.payload  )
        }
  }
    
})

export const {  fetchAllCategories , removeCategory , addCategory ,
  startfetchAllCategories , endfetchAllCategories
} = categorySlice.actions

export default categorySlice.reducer