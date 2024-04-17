export interface DetailsPageState {
    isLoading: boolean;
    error: string | null;
    earthquakeDetailsData: any | null;
}

export const detailsPageInitialState: DetailsPageState = {
    isLoading: true,
    error: null,
    earthquakeDetailsData: null,
}