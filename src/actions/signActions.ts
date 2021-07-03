import { AppThunk } from '../store';
import base64 from 'base-64';

import axios from '../utilities/axiosConfig';
import { setSpinnerVisibility } from '../reducers/appSlice';
import { signInRq, signError, signInSuccess, SignUser } from '../reducers/signSlice';
import { handleRequestError } from '../utilities/util';

export const signIn =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    const options = {
      headers: {
        Authorization: 'Basic ' + base64.encode(email + ':' + password),
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      dispatch(setSpinnerVisibility(true));
      dispatch(signInRq());
      const response = await axios.get<SignUser>('/signin', options);
      if (handleRequestError(response, dispatch, signError)) {
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      handleRequestError(error, dispatch, signError);
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
