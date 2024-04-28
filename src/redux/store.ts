import { configureStore } from '@reduxjs/toolkit';
import landingPageReducer from './features/landingPageSlice';
import detailsPageReducer from './reducers/detailsPageReducer';

const store = configureStore({
    reducer: {
      landingPage: landingPageReducer,
      detailsPage: detailsPageReducer,
    },
});

export default store;