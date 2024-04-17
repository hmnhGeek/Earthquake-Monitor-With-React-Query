export const LOAD_LAST_24_HRS_DATA = 'LOAD_LAST_24_HRS_DATA';
export const LOAD_LAST_24_HRS_DATA_SUCCESS = 'LOAD_LAST_24_HRS_DATA_SUCCESS';
export const LOAD_LAST_24_HRS_DATA_FAILURE = 'LOAD_LAST_24_HRS_DATA_FAILURE';

export const FETCH_DATE_RANGE_DATA = 'FETCH_DATE_RANGE_DATA';
export const FETCH_DATE_RANGE_DATA_SUCCESS = 'FETCH_DATE_RANGE_DATA_SUCCESS';
export const FETCH_DATE_RANGE_DATA_FAILURE = 'FETCH_DATE_RANGE_DATA_FAILURE';

export type LoadLast24HrsDataAction = { type: typeof LOAD_LAST_24_HRS_DATA };
export type LoadLast24HrsDataActionSuccessAction = { type: typeof LOAD_LAST_24_HRS_DATA_SUCCESS, payload: any };
export type LoadLast24HrsDataActionFailureAction = { type: typeof LOAD_LAST_24_HRS_DATA_FAILURE };

export type FetchDateRangeDataAction = { type: typeof FETCH_DATE_RANGE_DATA };
export type FetchDateRangeDataSuccessAction = { type: typeof FETCH_DATE_RANGE_DATA_SUCCESS, payload: any };
export type FetchDateRangeDataFailureAction = { type: typeof FETCH_DATE_RANGE_DATA_FAILURE };

export type LandingPageActionTypes = 
    | LoadLast24HrsDataAction
    | LoadLast24HrsDataActionSuccessAction
    | LoadLast24HrsDataActionFailureAction
    | FetchDateRangeDataAction
    | FetchDateRangeDataSuccessAction
    | FetchDateRangeDataFailureAction;