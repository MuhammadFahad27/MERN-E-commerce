import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    user:[] ,
    isLoggedIn : false ,
    loading : false ,
    
    
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
    reducers:{

        signInStart : (state )=>{

            state.loading = true 

        },
        signInSuccess : (state , action)=>{

            state.loading = true ;
            state.user = action.payload  
            state.isLoggedIn = true 
            state.isAuthenticated = true 

        },
         signInEnd : (state )=>{

            state.loading = false

        },
         signOut : (state )=>{

            
            state.user = []
            state.isLoggedIn = false 
            state.loading = false 
            state.isAuthenticated = false 

        },
        updateProfile : (state,action)=>{

            state.user = action.payload 
        },
      
       


       

        
    }
})

export const { signInStart ,signInSuccess ,signInEnd ,signOut , updateProfile ,
    
 } = userSlice.actions

export default userSlice.reducer