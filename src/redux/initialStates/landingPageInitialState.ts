export interface LandingPageState {
    isLoading: boolean;
    error: string | null;
    earthquakeData: any | null;
}

export const landingPageInitialState: LandingPageState = {
    isLoading: true,
    error: null,
    earthquakeData: null,
}