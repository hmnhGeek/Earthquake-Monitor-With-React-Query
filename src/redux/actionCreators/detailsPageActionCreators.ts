import { FETCH_EQ_DETAILS_BY_EVENT_ID, FETCH_EQ_DETAILS_BY_EVENT_ID_FAILURE, FETCH_EQ_DETAILS_BY_EVENT_ID_SUCCESS } from "../constants/detailsPageConstants";

export const fetchEqDetailsByEventIdStart = (eventId: string) => ({ type: FETCH_EQ_DETAILS_BY_EVENT_ID, payload: eventId });
export const fetchEqDetailsByEventIdSuccess = (data: any) => ({ type: FETCH_EQ_DETAILS_BY_EVENT_ID_SUCCESS, payload: data });
export const fetchEqDetailsByEventIdFailure = () => ({ type: FETCH_EQ_DETAILS_BY_EVENT_ID_FAILURE });