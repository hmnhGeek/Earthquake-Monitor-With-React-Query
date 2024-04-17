export const FETCH_EQ_DETAILS_BY_EVENT_ID = 'FETCH_EQ_DETAILS_BY_EVENT_ID';
export const FETCH_EQ_DETAILS_BY_EVENT_ID_SUCCESS = 'FETCH_EQ_DETAILS_BY_EVENT_ID_SUCCESS';
export const FETCH_EQ_DETAILS_BY_EVENT_ID_FAILURE = 'FETCH_EQ_DETAILS_BY_EVENT_ID_FAILURE';

export type FetchEqDetailsByEventIdAction = { type: typeof FETCH_EQ_DETAILS_BY_EVENT_ID, payload: string };
export type FetchEqDetailsByEventIdSuccessAction = { type: typeof FETCH_EQ_DETAILS_BY_EVENT_ID_SUCCESS, payload: any };
export type FetchEqDetailsByEventIdFailureAction = { type: typeof FETCH_EQ_DETAILS_BY_EVENT_ID_FAILURE };

export type DetailsPageActionTypes = 
    | FetchEqDetailsByEventIdAction
    | FetchEqDetailsByEventIdSuccessAction
    | FetchEqDetailsByEventIdFailureAction;