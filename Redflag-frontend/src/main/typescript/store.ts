import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({immutableCheck: true, serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch