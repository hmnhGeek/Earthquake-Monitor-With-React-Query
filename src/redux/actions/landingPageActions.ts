import api from "@/app/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
);

export const fetchDateRangeData = createAsyncThunk(
    "earthquake/fetchDateRangeData",
    async ({startDate, endDate}: {startDate: string, endDate: string}) => {
        // let {startDate, endDate} = payload;
        const response = await api.get(`/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}`);
        return response.data;
    }
);