import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    pythonData: {
        volatility: 0.0,
        slope : 0.0,
        RSI: 0.0,
        moving_avg: 0.0,
        avg_volume: 0.0,
        signal_value: 0.0,
    },
};

const pythonDataSlice = createSlice({
    name: 'pythonData',
    initialState,
    reducers: {
        setPythonData: (state, action) => {
            state.pythonData.volatility = action.payload.volatility;
            state.pythonData.slope = action.payload.slope;
            state.pythonData.RSI = action.payload.RSI;
            state.pythonData.moving_avg = action.payload.moving_avg;
            state.pythonData.avg_volume = action.payload.avg_volume;
            state.pythonData.signal_value = action.payload.signal_value;
        },
        removePythonData: (state) => {
            state.pythonData.volatility = 0.0;
            state.pythonData.slope = 0.0;
            state.pythonData.RSI = 0.0;
            state.pythonData.moving_avg = 0.0;
            state.pythonData.avg_volume = 0.0;
            state.pythonData.signal_value = 0.0;
        },
    },
});

export const { setPythonData, removePythonData } = pythonDataSlice.actions;
export default pythonDataSlice.reducer;