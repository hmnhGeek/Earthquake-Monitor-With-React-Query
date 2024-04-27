import { DetailsPageActionTypes, FETCH_EQ_DETAILS_BY_EVENT_ID, FETCH_EQ_DETAILS_BY_EVENT_ID_FAILURE, FETCH_EQ_DETAILS_BY_EVENT_ID_SUCCESS } from "../constants/detailsPageConstants";
import { DetailsPageState, detailsPageInitialState } from "../initialStates/detailsPageInitialState";

const detailsPageReducer = (state: DetailsPageState = detailsPageInitialState, action: DetailsPageActionTypes) => {
    switch(action.type) {
        case FETCH_EQ_DETAILS_BY_EVENT_ID:
            return { ...state, isLoading: true };
        case FETCH_EQ_DETAILS_BY_EVENT_ID_SUCCESS:
            return { ...state, isLoading: false, earthquakeDetailsData: action.payload, error: null };
        case FETCH_EQ_DETAILS_BY_EVENT_ID_FAILURE:
            return { ...state, isLoading: false, earthquakeDetailsData: null, error: "Unable to fetch" };
        default:
            return state;
    }
}

export default detailsPageReducer;