import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    assets: [], // Changed to an object where each ticker is a key
    activities: [], // Transaction logs
    balance: 0, // Total balance of present stock
    joined: "", // date of creating profile
  },
  reducers: {
    setDashboardData: (state, action) => {
      const { transformedAssets, activities, balance, joined } = action.payload;
      const totalBalance = Number(balance.total_investment) + Number(balance.total_profit_loss);
      // formatting the joined date to get day month and year
      let date = new Date(joined.created_at);
      date = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      state.assets = transformedAssets;
      state.activities = activities;
      state.balance = totalBalance;
      state.joined = date;
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
