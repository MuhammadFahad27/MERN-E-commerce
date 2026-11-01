import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useAllCartItems } from "./useAllCartItems";
import { endCartLoading, setCartLoading } from "../Redux Toolkit/Cart/cartSlice";

export const useAddToCart = () => {
    const user = useSelector((state) => state?.user?.user);
    const userId = user?.id || user?._id;
    const dispatch = useDispatch();
    const { fetchAllCartItems } = useAllCartItems();

    const addCart = async (id) => {
        if (!userId) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            dispatch(setCartLoading());
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/add-to-cart/${id}/${userId}`,
                {},
                {
                    withCredentials: true,
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            );

            if (response.data?.success) {
                await fetchAllCartItems(userId);
                dispatch(endCartLoading());
                toast.success(response.data?.message || 'Added to cart');
                return;
            }
        } catch (error) {
            dispatch(endCartLoading());
            const msg = error?.response?.data?.message || 'Failed to add item to cart';
            toast.error(msg);
            console.error('Add to cart error:', msg);
        }
    };

    return { addCart };
};
