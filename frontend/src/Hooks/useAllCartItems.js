import axios from "axios";
import { useDispatch } from 'react-redux';
import { endFetchAllItems, fetchAllItems, startFetchAllItems } from "../Redux Toolkit/Cart/cartSlice";

export const useAllCartItems = () => {
    const dispatch = useDispatch();

    const fetchAllCartItems = async (userId) => {
        if (!userId) {
            return;
        }

        try {
            dispatch(startFetchAllItems());
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/all-cart-items/${userId}`,
                {
                    withCredentials: true,
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            );

            if (response.data?.success) {
                dispatch(fetchAllItems(response.data));
            }
        } catch (error) {
            dispatch(endFetchAllItems());
            console.error('Fetch cart error:', error?.response?.data?.message);
        }
    };

    return { fetchAllCartItems };
};
