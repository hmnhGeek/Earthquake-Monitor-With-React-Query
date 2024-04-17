import { FETCH_DATE_RANGE_DATA, FETCH_DATE_RANGE_DATA_FAILURE, FETCH_DATE_RANGE_DATA_SUCCESS, LOAD_LAST_24_HRS_DATA, LOAD_LAST_24_HRS_DATA_FAILURE, LOAD_LAST_24_HRS_DATA_SUCCESS, LandingPageActionTypes } from "../constants/landingPageConstants";
import { LandingPageState, landingPageInitialState } from "../initialStates/landingPageInitialState";

const landingPageReducer = (state: LandingPageState = landingPageInitialState, action: LandingPageActionTypes) => {
    switch(action.type) {
        case LOAD_LAST_24_HRS_DATA:
            return { ...state, isLoading: true };
        case LOAD_LAST_24_HRS_DATA_SUCCESS:
            return { ...state, isLoading: false, earthquakeData: action.payload, error: null };
        case LOAD_LAST_24_HRS_DATA_FAILURE:
            return { ...state, isLoading: false, earthquakeData: null, error: "Unable to fetch" };
        case FETCH_DATE_RANGE_DATA:
            return { ...state, isLoading: true };
        case FETCH_DATE_RANGE_DATA_SUCCESS:
            return { ...state, isLoading: false, earthquakeData: action.payload, error: null };
        case FETCH_DATE_RANGE_DATA_FAILURE:
            return { ...state, isLoading: false, earthquakeData: null, error: "Unable to fetch" };
        default:
            return state;
    }
}

export default landingPageReducer;