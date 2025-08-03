import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    cart:[] ,
    loading : false ,
    totalProducts:0 ,
    totalPrice:0 ,
    isAdding : false ,
  
    
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
        },
        setCartLoading:(state)=>{

            state.isAdding = true ;
        },
        endCartLoading:(state)=>{

            state.isAdding = false  ;
        },

      
       
        

       

  }
    
})

export const {   
    startFetchAllItems,
    fetchAllItems,
    endFetchAllItems  ,
    clearCart,
    setCartLoading , 
    endCartLoading
    
    
} = cartSlice.actions

export default cartSlice.reducer