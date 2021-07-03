import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface SignUser {
  code: number;
  birthday: string;
  email: string;
  genre: string;
  id: number;
  lastname: string;
  name: string;
  password: string;
  token: string;
}

interface SignState {
  signErrors?: string[];
  signUpMsg?: string;
  userData?: SignUser;
}

const initialState: SignState = {
  signErrors: undefined,
  signUpMsg: undefined,
  userData: undefined,
};

const setUserDataFromAuthRd: CaseReducer<SignState, PayloadAction<SignUser>> = (
  state,
  action
) => {
  state.userData = action.payload;
};

const resetErrorRd: CaseReducer<SignState, PayloadAction> = (state) => {
  state.signErrors = undefined;
};

export const signSlice = createSlice({
  initialState,
  name: "sign",
  reducers: {
    resetError: resetErrorRd,
    signUpRq: resetErrorRd,
    resetSuccesMsg: (state) => {
      state.signUpMsg = undefined;
    },
    setUserDataFromStorage: setUserDataFromAuthRd,
    setUserDataFromAuth: setUserDataFromAuthRd,
    signInSuccess: setUserDataFromAuthRd,
    signError: (state, action: PayloadAction<string[]>) => {
      state.signErrors = action.payload;
      state.userData = undefined;
    },
    signInRq: (state) => {
      state.signErrors = undefined;
      state.userData = undefined;
    },
    signUpSuccess: (state, action: PayloadAction<string>) => {
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
