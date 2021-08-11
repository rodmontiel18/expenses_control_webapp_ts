import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import axios from '../utilities/axiosConfig';
import { AppThunk, RootState } from '../store';
import { handleRequestError } from '../utilities/util';
import { setSpinnerVisibility } from '../reducers/appSlice';
import {
  addIncomeRq,
  addIncomeSuccess,
  delIncomerq,
  delIncomeSuccess,
  editIncomeRq,
  editIncomeSuccess,
  getIncomeByIdRq,
  getIncomeByIdSuccess,
  getUserIncomesRq,
  getUserIncomesSuccess,
  incomeError,
} from '../reducers/incomeSlice';
import { BaseResponse } from '../models/responses/BaseResponse';
import { AddIncomeRs, GetUserIncomesRs } from '../models/responses/income';
import { Income } from '../models/income';
import { History } from 'history';
import { AxiosRequestConfig } from 'axios';

const url = '/incomes';

export const addIncome =
  (income: Income, history: History, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(addIncomeRq());
    try {
      const response = await axios.post<AddIncomeRs>(url, income, options);
      if (handleRequestError(response, dispatch, incomeError)) {
        dispatch(addIncomeSuccess());
        history.push('/incomes');
      }
    } catch (error) {
      dispatch(incomeError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

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

export const editIncome =
  (income: Income, history: History, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(editIncomeRq());
    try {
      const response = await axios.put<AddIncomeRs>(`${url}/user`, income, options);
      if (handleRequestError(response, dispatch, incomeError)) {
        dispatch(editIncomeSuccess());
        history.push('/incomes');
      }
    } catch (error) {
      dispatch(incomeError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const getIncomeById =
  (id: number, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(getIncomeByIdRq());
    try {
      const response = await axios.get<AddIncomeRs>(`${url}/user/${id}`, options);
      if (handleRequestError(response, dispatch, incomeError)) {
        dispatch(getIncomeByIdSuccess(response.data.income));
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
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
      params: {
        from,
        to,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(getUserIncomesRq());
    try {
      const response = await axios.get<GetUserIncomesRs>(`${url}/user/range`, options);
      if (handleRequestError(response, dispatch, incomeError)) {
        dispatch(getUserIncomesSuccess(response.data.incomes));
      }
    } catch (error) {
      dispatch(incomeError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
