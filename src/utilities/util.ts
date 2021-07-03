import { Action, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';

export const handleRequestError = (
  // eslint-disable-next-line
  objToCheck: any,
  // eslint-disable-next-line
  dispatch: ThunkDispatch<RootState, unknown, Action<any>>,
  callbackFn: ActionCreatorWithPayload<string[], string>,
) => {
  // catch way logic

  if (objToCheck.hasOwnProperty('response')) {
    // objToCheck it's an error

    if (!objToCheck.response) {
      if (!objToCheck.status) {
        dispatch(callbackFn(["We couldn't connect to the server"]));
        return false;
      }
    }

    dispatch(callbackFn(['Something wrong happened']));
    return false;
  }
  // objToCheck its a response object
  if (!objToCheck.hasOwnProperty('data')) {
    dispatch(callbackFn(['Something wrong happened']));
    return false;
  } else {
    if (!objToCheck.data.success && objToCheck.data.error) {
      dispatch(callbackFn([objToCheck.data.error]));
      return false;
    }
  }

  return true;
};
