import base64 from 'base-64';
import { History } from 'history';

import { AppThunk, RootState } from '../store';
import axios from '../utilities/axiosConfig';

import { setSpinnerVisibility } from '../reducers/appSlice';
import { signInRq, signInSuccess, signError, signUpSuccess, setUserDataFromAuth } from '../reducers/signSlice';
import { handleRequestError } from '../utilities/util';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { LoginRs, SignupRs } from '../models/responses/user';
import { AxiosResponse } from 'axios';

export const githubSign =
  (code: string, history: History): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    dispatch(setSpinnerVisibility(true));
    try {
      const response: AxiosResponse<LoginRs> = await axios.get<LoginRs>(`/signin/oauth/github/${code}`);
      if (handleRequestError(response, dispatch, signError)) {
        dispatch(setUserDataFromAuth(response.data));
        if (response.data.code !== 119) {
          history.push('/signin');
        }
      } else {
        history.push('/signin');
      }
    } catch (error) {
      dispatch(signError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const signIn =
  (email: string, password: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    const options = {
      headers: {
        Authorization: 'Basic ' + base64.encode(email + ':' + password),
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      dispatch(setSpinnerVisibility(true));
      dispatch(signInRq());
      const response: AxiosResponse<LoginRs> = await axios.get<LoginRs>('/signin', options);
      if (handleRequestError(response, dispatch, signError)) {
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      dispatch(signError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const signUp =
  (user: User, history: History): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    dispatch(setSpinnerVisibility(true));
    try {
      const response: AxiosResponse<SignupRs> = await axios.post<SignupRs>('/signup', user);
      if (handleRequestError(response, dispatch, signError)) {
        dispatch(signUpSuccess(response.data.signupMessage));
        history.push('/success-signin');
      }
    } catch (error) {
      dispatch(signError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
