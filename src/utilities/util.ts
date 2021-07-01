import { Action } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import type { RootState } from "../store";

export const handleRequestError = (
  objToCheck: any,
  dispatch: ThunkDispatch<RootState, unknown, Action<any>>,
  callbackFn: Function
) => {
  // catch way logic

  if (objToCheck.hasOwnProperty("response")) {
    // objToCheck it's an error

    if (!objToCheck.response) {
      if (!objToCheck.status) {
        dispatch(callbackFn(["We couldn't connect to the server"]));
        return false;
      }
    }

    dispatch(callbackFn(["Something wrong happened"]));
    return false;
  }
  // objToCheck its a response object
  if (!objToCheck.hasOwnProperty("data")) {
    dispatch(callbackFn(["Something wrong happened"]));
    return false;
  } else {
    if (!objToCheck.data.success && objToCheck.data.error) {
      dispatch(callbackFn([objToCheck.data.error]));
      return false;
    }
  }

  return true;
};
