import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {chatReducer} from "./features/chat/slice/chat-slice";

const rootReducer = combineReducers({
    chat: chatReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({immutableCheck: true, serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch