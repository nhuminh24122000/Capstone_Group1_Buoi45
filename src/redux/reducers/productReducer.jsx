import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/index";

const initialState = {
    product: null,
    productDetail: null,
    search: '',
    productSearch: null,
};

const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers: {
        getSearch: (state, action) => {
            state.search = action.payload
        },
        getProduct: (state, action) => {
            state.product = action.payload
        },
        getProductDetail: (state, action) => {
            state.productDetail = action.payload
        },
        getProductSearch: (state, action) => {
            state.productSearch = action.payload
        },
    },
});

export const { getSearch, getProduct, getProductDetail, getProductSearch } = productReducer.actions;

export default productReducer.reducer;

export const getProductApi = () => {
    return async (dispatch) => {
        const result = await http.get('/api/Product')
        const actionProduct = getProduct(result.data.content)
        dispatch(actionProduct)
    }
}
export const getProductDetailApi = (id) => {
    return async (dispatch) => {
        const result = await http.get(`/api/Product/getbyid?id=${id}`)
        const actionDetail = getProductDetail(result.data.content)
        dispatch(actionDetail)
    }
}