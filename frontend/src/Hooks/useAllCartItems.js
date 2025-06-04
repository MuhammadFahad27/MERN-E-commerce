import axios from "axios";
import {useDispatch,useSelector} from 'react-redux'
import { endFetchAllItems, fetchAllItems, startFetchAllItems } from "../Redux Toolkit/Cart/cartSlice";
import {toast} from 'sonner'

export const useAllCartItems = ()=>{

    // const userId = useSelector((state)=>state?.user?.user?.id) ;
    const dispatch = useDispatch () ;

     const fetchAllCartItems = async (userId)=>{

        if(!userId){

            toast.error('id is reuired')
            return ;
        }

            try {

                  dispatch(startFetchAllItems()) ;
                const response = await axios.get(import.meta.env.VITE_API_URL+`/all-cart-items/${userId}`,{

                    withCredentials:true
                })
                if(response.data?.success){

                    dispatch(fetchAllItems(response.data))
                    
                    return ;
                }
                
            } catch (error) {
                
                console.log(error?.response?.data?.message)
                dispatch(endFetchAllItems()) ;
            }

        }

    return {fetchAllCartItems} ;
}
