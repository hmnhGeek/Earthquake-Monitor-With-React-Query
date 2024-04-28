import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { landingPageInitialState } from "../initialStates/landingPageInitialState";
import { fetchLast24HrsData } from "../actions/landingPageActions";

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