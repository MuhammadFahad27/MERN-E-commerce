import axios from 'axios';
import { toast } from "sonner";
import { useSelector, useDispatch } from 'react-redux';
import { useAllCartItems } from './useAllCartItems';

export const useRemoveFromCart = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user?.user);
    const userId = user?.id || user?._id;
    const { fetchAllCartItems } = useAllCartItems();

    const removeCart = async (id) => {
        if (!userId) {
            toast.error('Please login to modify cart');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/remove-from-cart/${id}/${userId}`,
                {
                    withCredentials: true,
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            );

            if (response.data?.success) {
                toast.success(response.data?.message || 'Removed from cart');
                await fetchAllCartItems(userId);
            }
        } catch (error) {
            console.error('Remove from cart error:', error?.response?.data?.message);
        }
    };

    return { removeCart };
};
