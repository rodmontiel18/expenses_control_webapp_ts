import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseResponse } from '../models/responses/BaseResponse';
import { GetUserIncomesRs } from '../models/responses/income';
import { setSpinnerVisibility } from '../reducers/appSlice';
import {
  delIncomerq,
  delIncomeSuccess,
  getUserIncomesRq,
  getUserIncomesSuccess,
  incomeError,
} from '../reducers/incomeSlice';
import { AppThunk, RootState } from '../store';
import { handleRequestError } from '../utilities/util';

const url = '/incomes';

export const delIncome =
  (id: number, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(delIncomerq());
    try {
      const response = await axios.delete<BaseResponse>(`${url}/user/${id}`, options);
      if (handleRequestError(response, dispatch, incomeError)) {
        dispatch(delIncomeSuccess(id));
      }
    } catch (error) {
      dispatch(incomeError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const getUserIncomes =
  (userToken: string, from: number, to: number): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(getUserIncomesRq());
    try {
      const response = await axios.get<GetUserIncomesRs>(`${url}/user/range/${from}/${to}`, options);
      if (handleRequestError(response, dispatch, incomeError)) {
        dispatch(getUserIncomesSuccess(response.data.incomes));
      }
    } catch (error) {
      dispatch(incomeError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
