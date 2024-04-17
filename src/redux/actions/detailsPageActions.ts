import { Dispatch } from 'redux';
import { fetchEqDetailsByEventIdFailure, fetchEqDetailsByEventIdStart, fetchEqDetailsByEventIdSuccess } from '../actionCreators/detailsPageActionCreators';
import api from '@/app/api/api';

export const fetchEqDetailsByEventId = (eventId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchEqDetailsByEventIdStart(eventId));

            const response = await api.get(`/fdsnws/event/1/query?format=geojson&eventid=${eventId}`);
            dispatch(fetchEqDetailsByEventIdSuccess(response.data));
        } catch (error: any) {
            dispatch(fetchEqDetailsByEventIdFailure());
        }
    }
}