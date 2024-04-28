export interface LandingPageState {
    isLoading: boolean;
    error: string | null;
    earthquakeData: any | null;
    dateRangeSelected: boolean;
    currentRange: any;
}

export const landingPageInitialState: LandingPageState = {
    isLoading: true,
    error: null,
    earthquakeData: null,
    dateRangeSelected: false,
    currentRange: null
}