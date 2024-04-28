import { configureStore } from '@reduxjs/toolkit';
import thunk, {ThunkMiddleware, ThunkAction} from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import landingPageReducer from './features/landingPageSlice';
import detailsPageReducer from './reducers/detailsPageReducer';

const store = configureStore({
    reducer: {
      landingPage: landingPageReducer,
      detailsPage: detailsPageReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as ThunkMiddleware),
});

export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;