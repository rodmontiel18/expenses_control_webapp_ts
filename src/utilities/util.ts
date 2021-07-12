import { Action, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { BaseResponse } from '../models/responses/BaseResponse';
import type { RootState } from '../store';

export const handleRequestError = (
  axiosResponse: AxiosResponse<BaseResponse>,
  dispatch: ThunkDispatch<RootState, unknown, Action>,
  callbackFn: ActionCreatorWithPayload<string[], string>,
) => {
  if (axiosResponse.status != 200 || !axiosResponse.hasOwnProperty('data')) {
    dispatch(callbackFn(['An error has ocurred, try again later']));
    return false;
  } else if (!axiosResponse.data.success) {
    dispatch(callbackFn([axiosResponse.data.error]));
    return false;
  }

  return true;
};
