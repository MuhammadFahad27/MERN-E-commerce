import axios from 'axios'
import {toast} from "sonner" 
import { useSelector , useDispatch } from 'react-redux'
import { useAllCartItems } from './useAllCartItems';


export const useRemoveFromCart = ()=>{

    const dispatch = useDispatch() ;
    const userId = useSelector((state)=>state?.user?.user?.id) ;
    const {fetchAllCartItems} = useAllCartItems() ;

    const removeCart = async (id)=>{

        try {

            const response = await axios.delete(import.meta.env.VITE_API_URL+`/remove-from-cart/${id}/${userId}`,{withCredentials:true})

            if(response.data?.success){

                toast.success(response.data?.message) ;
                await fetchAllCartItems(userId)
                return ;
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    return {removeCart}


}