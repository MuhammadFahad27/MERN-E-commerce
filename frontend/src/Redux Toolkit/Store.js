import { combineReducers,configureStore } from '@reduxjs/toolkit'
import {persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';
import themeReducer from "../Redux Toolkit/Theme/themeSlice"
import userReducers from "../Redux Toolkit/User/userSlice"
import categoryReducers from "../Redux Toolkit/Category/categorySlice"
import customerReducers from "../Redux Toolkit/Customers/customerSlice"
import productReducers from "../Redux Toolkit/Products/productSlice"
import cartReducers from "../Redux Toolkit/Cart/cartSlice"
import reviewReducers from "../Redux Toolkit/Products/reviewSlice" 
import orderReducers from "../Redux Toolkit/Order/orderSlice" 
import adminOrdersReducers from "../Redux Toolkit/Order/adminOrdersSlice" 




const rootReducer = combineReducers({
  theme:themeReducer ,
  user:userReducers ,
  category: categoryReducers,
  customer:customerReducers,
  product:productReducers,
  cart:cartReducers,
  review:reviewReducers,
  order :orderReducers,
  adminOrders:adminOrdersReducers

}) ;

const persistConfig = {

    key:'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({

    serializableCheck:false
  })
})

export const persistor = persistStore(store)