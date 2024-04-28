import api from '@/app/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEqDetailsByEventId = createAsyncThunk(
    "earthquake/fetchEqDetailsByEventId",
    async ({eventId}: {eventId: string}) => {
        const response = await api.get(`/fdsnws/event/1/query?format=geojson&eventid=${eventId}`);
        return response.data;
    }
);