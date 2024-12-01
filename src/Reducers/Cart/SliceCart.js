import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
    cart: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers:
    {
        setCart: (state, action) => {
          console.log("nekhdem");
            state.cart = [...action.payload]
        },
        setPrice: (state, action) => {
            console.log("nekhdem");
            state.totalPrice = action.payload;
        },
        deleteFromCart: (state, action) => {
            state.cart = state.cart.filter(v => v._id != action.payload)
        },
        plusQuantity: (state, action) => {
            const index = state.cart.findIndex((product) => product.productID == action.payload);
            if (index >= 0)
                state.cart[index].quantity++;
        },
        minusQuantity: (state, action) => {
            const index = state.cart.findIndex((product) => product.productID == action.payload);
            if (index >= 0)
                state.cart[index].quantity--;
        }
    }
})

export const { setPrice, setCart, deleteFromCart, plusQuantity, minusQuantity } = cartSlice.actions;
export default cartSlice.reducer;