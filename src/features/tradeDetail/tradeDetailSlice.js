import { createSlice } from "@reduxjs/toolkit";

const tradeDetailSlice = createSlice({
    name: "tradeDetail",
    // for sell we need: stock_id, ticker, qunatity, date, price, signal

    initialState: {
        tradeDetail: {
            stockId: -1,
            tradePrice: 0.0,
            tradeDate: "",
            tradeQuantity: 0,
            tradeTicker: "",
            tradeSignal: "",
        }
    },
    reducers: {
        setTradeDetail: (state, action) => {
        const { stockId, tradePrice, tradeDate, tradeQuantity, tradeTicker, tradeSignal } = action.payload;
        state.tradeDetail.stockId = stockId;
        state.tradeDetail.tradePrice = tradePrice;
        state.tradeDetail.tradeDate = tradeDate;
        state.tradeDetail.tradeQuantity = tradeQuantity;
        state.tradeDetail.tradeTicker = tradeTicker;
        state.tradeDetail.tradeSignal = tradeSignal;
        
        },
        emptyTradeDetail: (state) => {
            state.tradeDetail.stockId = -1;
            state.tradeDetail.tradePrice = 0.0;
            state.tradeDetail.tradeDate = "";
            state.tradeDetail.tradeQuantity = 0;
            state.tradeDetail.tradeTicker = "";
            state.tradeDetail.tradeSignal = "";
        }

    },
    });

export const { setTradeDetail, emptyTradeDetail } = tradeDetailSlice.actions;
export default tradeDetailSlice.reducer;
