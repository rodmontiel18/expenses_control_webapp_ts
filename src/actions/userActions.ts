import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import axios from '../utilities/axiosConfig';
import { AppThunk, RootState } from '../store';

import { handleRequestError } from '../utilities/util';

import { setSpinnerVisibility } from '../reducers/appSlice';
import { resetPasswordRq, resetPasswordSuccess, userError } from '../reducers/userSlice';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '../models/responses/BaseResponse';

// const url = '/user';

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
