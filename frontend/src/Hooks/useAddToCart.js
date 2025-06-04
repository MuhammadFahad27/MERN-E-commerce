import axios from "axios";
import {useDispatch,useSelector} from 'react-redux'

import {toast} from 'sonner'
import { useAllCartItems } from "./useAllCartItems";

export const useAddToCart = ()=>{

    const userId = useSelector((state)=>state?.user?.user?.id) ;
    const dispatch = useDispatch () ;
    const {fetchAllCartItems} = useAllCartItems() ;

    const addCart = async (id)=>{

        try {

            const response = await axios.post(import.meta.env.VITE_API_URL+`/add-to-cart/${id}/${userId}`,{},{
                withCredentials:true
            }) ;
            if(response.data?.success){
            
               
                await fetchAllCartItems(userId) ;
                toast.success(response.data?.message) ;
                return ;
                
            }
            
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error?.response?.data?.message)
            
        }
    }

    return {addCart} ;
}