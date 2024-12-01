import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Reducers/Cart/SliceCart";
import wishListSlice from "../Reducers/Wishlist/wishListSlice";
import userSlice from './../Reducers/User/userSlice';
import productsSlice from './../Reducers/Products/productsSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishList: wishListSlice,
    user: userSlice,
    products:productsSlice
  },
});

export default store;


