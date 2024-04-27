import api from "@/app/api/api";
import { Dispatch } from 'redux';
import { useQuery } from 'react-query';
import { fetchDateRangeDataFailure, fetchDateRangeDataStart, fetchDateRangeDataSuccess, loadLast24HrsDataFailure, loadLast24HrsDataStart, loadLast24HrsDataSuccess } from "../actionCreators/landingPageActionCreators";

const apiLast24HrsData = () => {
    // Today's date
    var today = new Date();
    var todayFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Yesterday's date
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yesterdayFormatted = yesterday.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    return api.get(`/fdsnws/event/1/query?format=geojson&starttime=${yesterdayFormatted}&endtime=${todayFormatted}`);
}

const {data: last24HrsData, refetch: refetchLast24HrsData} = useQuery('last24HrsData', apiLast24HrsData);

export const loadLast24HrsData = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(loadLast24HrsDataStart());
            refetchLast24HrsData();
            console.log("r", last24HrsData);
            // dispatch(loadLast24HrsDataSuccess(queryLast24HrsData?.data.data));
        } catch(error: any) {
            dispatch(loadLast24HrsDataFailure());
        }
    }
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