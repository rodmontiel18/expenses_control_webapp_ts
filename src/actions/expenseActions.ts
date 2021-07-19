import { Action } from '@reduxjs/toolkit';
import { History } from 'history';
import { ThunkDispatch } from 'redux-thunk';
import axios from '../utilities/axiosConfig';

import { Expense } from '../models/expense';
import { AppThunk, RootState } from '../store';
import { handleRequestError } from '../utilities/util';
import { setSpinnerVisibility } from '../reducers/appSlice';
import {
  addExpenseRq,
  addExpenseSuccess,
  delExpenseRq,
  delExpenseSuccess,
  editExpenseRq,
  editExpenseSuccess,
  expensesError,
  getAllExpensesRq,
  getAllExpensesSuccess,
  getExpenseByIdRq,
  getExpenseByIdSuccess,
} from '../reducers/expensesSlice';
import { BaseResponse } from '../models/responses/BaseResponse';
import { EditExpenseSuccessRs, GetAllExpensesRS } from '../models/responses/expense';

const url = '/expenses';

export const addExpense =
  (expense: Expense, history: History, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(addExpenseRq());
    try {
      const response = await axios.post(url, expense, options);
      if (handleRequestError(response, dispatch, expensesError)) {
        dispatch(addExpenseSuccess());
        history.push('/expenses');
      }
    } catch (error) {
      dispatch(expensesError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const delExpense =
  (id: number, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(delExpenseRq());
    try {
      const response = await axios.delete<BaseResponse>(`${url}/user/${id}`, options);
      if (handleRequestError(response, dispatch, expensesError)) {
        dispatch(delExpenseSuccess(id));
      }
    } catch (error) {
      dispatch(expensesError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const editExpense =
  (expense: Expense, history: History, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(editExpenseRq());
    try {
      const response = await axios.put<EditExpenseSuccessRs>(`${url}/user`, expense, options);
      if (handleRequestError(response, dispatch, expensesError)) {
        dispatch(editExpenseSuccess());
        history.push('/expenses');
      }
    } catch (error) {
      dispatch(expensesError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const getAllExpenses =
  (from: number, to: number, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(getAllExpensesRq());
    try {
      const response = await axios.get<GetAllExpensesRS>(`${url}/user/range/${from}/${to}`, options);
      if (handleRequestError(response, dispatch, expensesError)) {
        dispatch(getAllExpensesSuccess(response.data.expenses));
      }
    } catch (error) {
      dispatch(expensesError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const getExpenseById =
  (expenseId: string, userToken: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(getExpenseByIdRq());
    try {
      const response = await axios.get<EditExpenseSuccessRs>(`${url}/user/${expenseId}`, options);
      if (handleRequestError(response, dispatch, expensesError)) {
        dispatch(getExpenseByIdSuccess(response.data.expense));
      }
    } catch (error) {
      dispatch(expensesError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
