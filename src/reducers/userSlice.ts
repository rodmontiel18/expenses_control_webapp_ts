import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user';
import type { RootState } from '../store';

export interface UserState {
  profile: User;
  successRq: boolean;
  updateProfileRqFlag: boolean;
  updatePasswordRqFlag: boolean;
  userErrors?: string[];
}

const initialUser = {
  birthday: '',
  code: 0,
  email: '',
  genre: '',
  id: 0,
  lastname: '',
  name: '',
  password: '',
};

const initialState: UserState = {
  profile: { ...initialUser },
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
      state.profile = {
        ...state.profile,
        birthday: initialUser.birthday,
        email: initialUser.email,
        genre: initialUser.genre,
        id: initialUser.id,
        lastname: initialUser.lastname,
        name: initialUser.name,
        password: initialUser.password,
      };
      state.userErrors = undefined;
    },
    getProfileSuccess: (state: UserState, action: PayloadAction<User>) => {
      const newProfile: User = action.payload;
      state.profile = {
        ...state.profile,
        birthday: newProfile.birthday,
        email: newProfile.email,
        genre: newProfile.genre,
        lastname: newProfile.lastname,
        name: newProfile.name,
      };
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
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    updateProfileRq: (state: UserState) => {
      state.updateProfileRqFlag = false;
      state.userErrors = undefined;
    },
    updateProfileSuccess: (state: UserState) => {
      state.updateProfileRqFlag = true;
    },
    updatePasswordRq: (state: UserState) => {
      state.updatePasswordRqFlag = false;
      state.userErrors = undefined;
    },
    updatePasswordSuccess: (state: UserState) => {
      state.updatePasswordRqFlag = true;
      state.userErrors = undefined;
    },
    userError: (state: UserState, action: PayloadAction<string[]>) => {
      state.profile = { ...initialUser };
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
  setUser,
  updateProfileRq,
  updateProfileSuccess,
  updatePasswordRq,
  updatePasswordSuccess,
  userError,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
