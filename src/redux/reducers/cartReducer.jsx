import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userCart: [],
    userOrder: [],
}

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        getUserCartAction: (state, action) => {
            state.userCart.push(action.payload);
        },
        updateCartAction: (state, action) => {
            const { id, value } = action.payload;
            const updateProductIndex = state.userCart.findIndex(
                (item) => item.product.id === id
            );
            if (state.userCart[updateProductIndex].quantity === 1 && value === -1) {
                state.userCart = state.userCart.filter((item) => item.id !== id);
            } else {
                state.userCart[updateProductIndex].quantity += value;
            }
        },
        deleteProductCartAction: (state, action) => {
            const { id } = action.payload;
            state.userCart = state.userCart.filter((item) => item.product.id !== id);
        },
    },
});

export const { 
    getUserCartAction,
    updateCartAction,
    deleteProductCartAction,
} = cartReducer.actions

export default cartReducer.reducer
