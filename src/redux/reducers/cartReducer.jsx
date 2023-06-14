import { createSlice } from '@reduxjs/toolkit'
import {http} from '../../util/index'

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
        submitOrderAction: (state, action) => {
            state.userOrder.push(action.payload);
        },
    },
});

export const {
    getUserCartAction,
    updateCartAction,
    deleteProductCartAction,
    submitOrderAction,
} = cartReducer.actions

export default cartReducer.reducer

export const submitOrderApi = (data) => {
    return async (dispatch) => {
        const result = await http.post("/api/Users/order", data);
        alert(result.data.content);
        const action = submitOrderAction(data.orderDetail);
        dispatch(action);
    };
};