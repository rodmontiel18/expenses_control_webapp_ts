import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import axios from '../utilities/axiosConfig';
import { AppThunk, RootState } from '../store';

import { handleRequestError } from '../utilities/util';

import { setSpinnerVisibility } from '../reducers/appSlice';
import {
  getProfileRq,
  getProfileSuccess,
  resetPasswordRq,
  resetPasswordSuccess,
  updatePasswordRq,
  updatePasswordSuccess,
  updateProfileRq,
  updateProfileSuccess,
  userError,
} from '../reducers/userSlice';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '../models/responses/BaseResponse';
import { GetProfileRs } from '../models/responses/user';
import { UpdatePasswordRq } from '../models/requests/user';
import { User } from '../models/user';

const url = '/user';

export const getProfile = (): AppThunk => async (dispatch: ThunkDispatch<RootState, null, Action>) => {
  dispatch(setSpinnerVisibility(true));
  dispatch(getProfileRq());
  try {
    const response: AxiosResponse<GetProfileRs> = await axios.get<GetProfileRs>(`${url}/get-profile`);
    if (handleRequestError(response, dispatch, userError)) {
      dispatch(getProfileSuccess(response.data.user));
    }
  } catch (error) {
    dispatch(userError(['An error has ocurred, try again later']));
  } finally {
    dispatch(setSpinnerVisibility(false));
  }
};

export const requestResetPassword =
  (email: string): AppThunk =>
  async () => {
    await axios.get('/request-reset-password/' + email);
  };

export const resetPassword =
  (password: string, token: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(resetPasswordRq());
    try {
      const response: AxiosResponse<BaseResponse> = await axios.put<BaseResponse>('/reset-password', {
        password,
        token,
      });
      if (handleRequestError(response, dispatch, userError)) {
        dispatch(resetPasswordSuccess());
      }
    } catch (error) {
      dispatch(userError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

export const updatePassword =
  (data: UpdatePasswordRq): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(updatePasswordRq());
    try {
      const response: AxiosResponse<BaseResponse> = await axios.put<BaseResponse>(`${url}/update-password`, data);
      if (handleRequestError(response, dispatch, userError)) {
        dispatch(updatePasswordSuccess());
      }
    } catch (error) {
      dispatch(userError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

export const updateProfile =
  (profile: User): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(updateProfileRq());

    try {
      const response: AxiosResponse<BaseResponse> = await axios.put<BaseResponse>(`${url}/update-profile`, profile);
      if (handleRequestError(response, dispatch, userError)) {
        dispatch(updateProfileSuccess());
      }
    } catch (error) {
      dispatch(userError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };
