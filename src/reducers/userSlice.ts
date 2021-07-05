import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface User {
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

export interface UserState {
  profile?: User;
  successRq: boolean;
  updateProfileRqFlag: boolean;
  updatePasswordRqFlag: boolean;
  userErrors?: string[];
}

const initialState: UserState = {
  profile: undefined,
  successRq: false,
  updatePasswordRqFlag: false,
  updateProfileRqFlag: false,
  userErrors: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    getProfileRq: (state: UserState) => {
      state.profile = undefined;
      state.userErrors = undefined;
    },
    getProfileSuccess: (state: UserState, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.userErrors = undefined;
    },
    resetPasswordRq: (state: UserState) => {
      state.successRq = false;
      state.userErrors = undefined;
    },
    resetPasswordSuccess: (state: UserState) => {
      state.successRq = true;
      state.userErrors = undefined;
    },
    resetUserErrors: (state: UserState) => {
      state.userErrors = undefined;
    },
    updateProfileRq: (state: UserState) => {
      state.updateProfileRqFlag = false;
      state.userErrors = undefined;
    },
    updateProfileSuccess: (state: UserState) => {
      state.updateProfileRqFlag = true;
    },
    updatePqsswordRq: (state: UserState) => {
      state.updatePasswordRqFlag = false;
      state.userErrors = undefined;
    },
    updatePqsswordSuccess: (state: UserState) => {
      state.updatePasswordRqFlag = true;
      state.userErrors = undefined;
    },
    userError: (state: UserState, action: PayloadAction<string[]>) => {
      state.profile = undefined;
      state.updateProfileRqFlag = false;
      state.userErrors = action.payload;
    },
  },
});

export const {
  getProfileRq,
  getProfileSuccess,
  resetPasswordRq,
  resetPasswordSuccess,
  resetUserErrors,
  updateProfileRq,
  updateProfileSuccess,
  updatePqsswordRq,
  updatePqsswordSuccess,
  userError,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
