import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { landingPageInitialState } from "../initialStates/landingPageInitialState";
import api from "@/app/api/api";

export const fetchLast24HrsData = createAsyncThunk(
    "earthquake/fetchLast24HrsData",
    async () => {
        // Today's date
        var today = new Date();
        var todayFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
        // Yesterday's date
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yesterdayFormatted = yesterday.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
        let response = await api.get(`/fdsnws/event/1/query?format=geojson&starttime=${yesterdayFormatted}&endtime=${todayFormatted}`);
        return response.data;
    }
)

export const landingPageSlice = createSlice({
    name: "landingPage",
    initialState: landingPageInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLast24HrsData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLast24HrsData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.earthquakeData = action.payload;
        });
        builder.addCase(fetchLast24HrsData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "There is some error";
            state.earthquakeData = null;
        })
    }
});

export default landingPageSlice.reducer;