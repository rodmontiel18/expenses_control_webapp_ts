import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import checkLoginMiddleware from './reducers/middlewares/checkLoginMiddleware';
import rootReducer from './reducers';

export const history: History = createBrowserHistory();

export const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkLoginMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
