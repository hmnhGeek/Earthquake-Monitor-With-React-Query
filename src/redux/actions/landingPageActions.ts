import api from "@/app/api/api";
import { Dispatch } from 'redux';
import { fetchDateRangeDataFailure, fetchDateRangeDataStart, fetchDateRangeDataSuccess, loadLast24HrsDataFailure, loadLast24HrsDataStart, loadLast24HrsDataSuccess } from "../actionCreators/landingPageActionCreators";

export const loadLast24HrsData = async (state: any, action: any) => {
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

export const fetchDateRangeData = (startDate: string, endDate: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchDateRangeDataStart());
            const response = await api.get(`/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}`);
            dispatch(fetchDateRangeDataSuccess(response.data));
        } catch(error: any) {
            dispatch(fetchDateRangeDataFailure());
        }
    }
}