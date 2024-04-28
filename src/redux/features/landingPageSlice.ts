import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { landingPageInitialState } from "../initialStates/landingPageInitialState";
import { fetchDateRangeData, fetchLast24HrsData } from "../actions/landingPageActions";

export const landingPageSlice = createSlice({
    name: "landingPage",
    initialState: landingPageInitialState,
    reducers: {
        setGlobalDateRange: (state, action) => {
            state.currentRange = action.payload;
            if(action.payload && action.payload.length > 1) {
                state.dateRangeSelected = true;
            }
            else {
                state.dateRangeSelected = false;
            }
        }
    },
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
        });

        builder.addCase(fetchDateRangeData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchDateRangeData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.earthquakeData = action.payload;
        });
        builder.addCase(fetchDateRangeData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "There is some error";
            state.earthquakeData = null;
        });
        
    }
});


export const {setGlobalDateRange} = landingPageSlice.actions;
export default landingPageSlice.reducer;