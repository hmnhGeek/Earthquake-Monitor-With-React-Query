import { createSlice } from "@reduxjs/toolkit";
import { detailsPageInitialState } from "../initialStates/detailsPageInitialState";
import { fetchEqDetailsByEventId } from "../actions/detailsPageActions";

export const detailsPageSlice = createSlice({
    name: "detailsPage",
    initialState: detailsPageInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEqDetailsByEventId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchEqDetailsByEventId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.earthquakeDetailsData = action.payload;
        });
        builder.addCase(fetchEqDetailsByEventId.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "There is some error";
            state.earthquakeDetailsData = null;
        });
    }
});

export default detailsPageSlice.reducer;