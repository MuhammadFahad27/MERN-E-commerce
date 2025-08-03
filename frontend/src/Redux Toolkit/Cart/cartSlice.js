import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    cart:[] ,
    loading : false ,
    totalProducts:0 ,
    totalPrice:0 ,
  
    
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{

        startFetchAllItems:(state,action)=>{

            state.loading = true ;
            state.cart = [] ;

        },
        fetchAllItems:(state,action)=>{

            state.loading = false ;
              state.cart = action.payload?.item[0]?.products ;
              state.totalPrice = action.payload?.item[0]?.totalPrice 
              state.totalProducts = action.payload?.item[0]?.totalProducts  ; 
               
        },
        endFetchAllItems:(state,action)=>{
            
            state.loading = false 
        } ,
        clearCart:(state,action)=>{

            state.cart = [],
            state.totalPrice = 0 ;
            state.totalProducts = 0 
            
            
        }
      
       
        

       

  }
    
})

export const {   
    startFetchAllItems,
    fetchAllItems,
    endFetchAllItems  ,
    clearCart
    
    
} = cartSlice.actions

export default cartSlice.reducer