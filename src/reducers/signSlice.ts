import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ShortUser } from '../models/user';

interface SignState {
  signErrors?: string[];
  signUpMsg?: string;
  userData?: ShortUser;
}

const initialState: SignState = {
  signErrors: undefined,
  signUpMsg: undefined,
  userData: undefined,
};

const setUserDataFromAuthRd: CaseReducer<SignState, PayloadAction<ShortUser>> = (state, action): void => {
  const data: ShortUser = action.payload;
  state.userData = {
    ...state.userData,
    email: data.email,
    lastname: data.lastname,
    name: data.name,
    token: data.token,
  };
};

const resetErrorRd: CaseReducer<SignState, PayloadAction> = (state): void => {
  state.signErrors = undefined;
};

export const signSlice = createSlice({
  initialState,
  name: 'sign',
  reducers: {
    resetError: resetErrorRd,
    signUpRq: resetErrorRd,
    resetSuccesMsg: (state) => {
      state.signUpMsg = undefined;
    },
    setUserDataFromStorage: setUserDataFromAuthRd,
    setUserDataFromAuth: setUserDataFromAuthRd,
    signInSuccess: setUserDataFromAuthRd,
    signError: (state, action: PayloadAction<string[]>): void => {
      state.signErrors = action.payload;
      state.userData = undefined;
    },
    signInRq: (state) => {
      state.signErrors = undefined;
      state.userData = undefined;
    },
    signUpSuccess: (state, action: PayloadAction<string>): void => {
      state.signUpMsg = action.payload;
    },
  },
});

export const {
  resetError,
  signUpRq,
  resetSuccesMsg,
  setUserDataFromStorage,
  setUserDataFromAuth,
  signInSuccess,
  signError,
  signInRq,
  signUpSuccess,
} = signSlice.actions;

export const signSelector = (state: RootState) => state.sign;

export default signSlice.reducer;
