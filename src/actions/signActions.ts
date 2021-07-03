import base64 from "base-64";
import { History } from "history";

import { AppThunk } from "../store";
import type { RootState } from "../store";
import axios from "../utilities/axiosConfig";

import { setSpinnerVisibility } from "../reducers/appSlice";
import {
  signInRq,
  signError,
  signInSuccess,
  SignUser,
  setUserDataFromAuth,
} from "../reducers/signSlice";
import { handleRequestError } from "../utilities/util";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

export const signIn =
  (email: string, password: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, unknown, Action<any>>) => {
    const options = {
      headers: {
        Authorization: "Basic " + base64.encode(email + ":" + password),
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      dispatch(setSpinnerVisibility(true));
      dispatch(signInRq());
      const response = await axios.get<SignUser>("/signin", options);
      if (handleRequestError(response, dispatch, signError)) {
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      handleRequestError(error, dispatch, signError);
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const githubSign =
  (code: string, history: History): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, unknown, Action<any>>) => {
    dispatch(setSpinnerVisibility(true));
    try {
      const response = await axios.get<SignUser>(
        `/signin/oauth/github/${code}`
      );
      if (handleRequestError(response, dispatch, signError)) {
        dispatch(signInSuccess(response.data));
        if (response.data.code !== 119) {
          history.push("/signin");
        }
      } else {
        history.push("/signin");
      }
    } catch (error) {
      handleRequestError(error, dispatch, signError);
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const signUp =
  (user: SignUser, history: History): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, unknown, Action<any>>) => {
    dispatch(setSpinnerVisibility(true));
    try {
      const response = await axios.post("/signup", user);
      if (handleRequestError(response, dispatch, signError)) {
        history.push("/success-signin");
      }
    } catch (error) {
      handleRequestError(error, dispatch, signError);
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
