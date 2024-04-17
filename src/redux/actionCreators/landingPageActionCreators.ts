import { FETCH_DATE_RANGE_DATA, FETCH_DATE_RANGE_DATA_FAILURE, FETCH_DATE_RANGE_DATA_SUCCESS, LOAD_LAST_24_HRS_DATA, LOAD_LAST_24_HRS_DATA_FAILURE, LOAD_LAST_24_HRS_DATA_SUCCESS } from "../constants/landingPageConstants";

export const loadLast24HrsDataStart = () => ({ type: LOAD_LAST_24_HRS_DATA });
export const loadLast24HrsDataSuccess = (data: any) => ({ type: LOAD_LAST_24_HRS_DATA_SUCCESS, payload: data });
export const loadLast24HrsDataFailure = () => ({ type: LOAD_LAST_24_HRS_DATA_FAILURE });

export const fetchDateRangeDataStart = () => ({ type: FETCH_DATE_RANGE_DATA });
export const fetchDateRangeDataSuccess = (data: any) => ({ type: FETCH_DATE_RANGE_DATA_SUCCESS, payload: data });
export const fetchDateRangeDataFailure = () => ({ type: FETCH_DATE_RANGE_DATA_FAILURE });