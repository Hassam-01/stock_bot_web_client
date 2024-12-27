import { createSlice } from "@reduxjs/toolkit";

const setTradeSlice = createSlice({
    name: "setTrade",
    initialState: {
        items: []
    },
    reducers: {
        addTrade: (state, action) => {
            const { name, price, quantity, stock_id, price_id } = action.payload;
            state.items.push({ name, price, quantity, stock_id, price_id });
        },
        removeTrade: (state, action) => {
            const { stock_id } = action.payload;
            state.items = state.items.filter(item => (stock_id !== item.stock_id));
        },
        emptyTrade: (state) => {
            state.items = [];
        }
    },
});

export const { addTrade, removeTrade,emptyTrade } = setTradeSlice.actions;
export default setTradeSlice.reducer;