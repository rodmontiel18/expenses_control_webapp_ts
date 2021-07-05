import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import axios from '../utilities/axiosConfig';
import { AppThunk, RootState } from '../store';

import { handleRequestError } from '../utilities/util';

import { setSpinnerVisibility } from '../reducers/appSlice';
import { resetPasswordRq, userError } from '../reducers/userSlice';

// const url = '/user';

export const requestResetPassword =
  (email: string): AppThunk =>
  async () => {
    axios.get('/request-reset-password/' + email);
  };

export const resetPassword =
  (password: string, token: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(resetPasswordRq());
    try {
      const response = axios.put('/reset-password', {
        password,
        token,
      });
      if (handleRequestError(response, dispatch, userError)) {
      }
    } catch (error) {
      handleRequestError(error, dispatch, userError);
    } finally {
      dispatch(setSpinnerVisibility(false));
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };
