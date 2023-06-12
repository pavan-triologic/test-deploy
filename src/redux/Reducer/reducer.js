import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    basket: [],
    settings: undefined,
    products: "",
};

//Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = createSlice({
    name: "reducer",
    initialState,
    reducers: {
        getSettingData: (state, action) => {
            state.settings = action.payload;
        },
    },
});
export const { getSettingData } = reducer.actions;
export default reducer.reducer;
