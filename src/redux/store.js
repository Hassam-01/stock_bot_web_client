import { configureStore } from '@reduxjs/toolkit'
import userIdReducer from '../features/userID/userIdSlice'
import userNameReducer from '../features/username/usernameSlice'
import authReducer from '../features/authentication/authSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import tradeDetailReducer from '../features/tradeDetail/tradeDetailSlice'
import setTradeSlice from '../features/setTrade/setTradeSlice'
import pythonDataSlice from '../features/pyhtonData/pythonDataSlice'
export const store = configureStore({
  reducer: {
    userId: userIdReducer,
    username: userNameReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    tradeDetail: tradeDetailReducer,
    setTrade : setTradeSlice,
    pythonData: pythonDataSlice,
  },
})