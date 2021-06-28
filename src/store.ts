import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
// import checkLoginMiddleware from './reducers/middlewares/checkLoginMiddleware';
import rootReducer from './reducers';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: rootReducer(history),
    middleware: [] as const,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
