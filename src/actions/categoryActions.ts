import { Action } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { History } from 'history';
import { ThunkDispatch } from 'redux-thunk';

import { AppThunk, RootState } from '../store';
import axios from '../utilities/axiosConfig';
import { setSpinnerVisibility } from '../reducers/appSlice';
import {
  addCategoryRq,
  addCategorySuccess,
  categoryError,
  editCategoryRq,
  delCategoryRq,
  delCategorySuccess,
  editCategorySuccess,
  getUserCategoryByIdRq,
  getUserCategoryByIdSuccess,
  getUserCategoriesRq,
  getUserCategoriesSuccess,
  getUserCategoriesByTypeRq,
  getUserCategoriesByTypeSuccess,
} from '../reducers/categorySlice';
import { Category } from '../models/category';
import { BaseResponse } from '../models/responses/BaseResponse';
import { AddUserCategoryRs, GetUserCategoriesRs } from '../models/responses/category';
import { handleRequestError } from '../utilities/util';

const url = '/categories';

export const addCategory =
  (category: Category, history: History): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(addCategoryRq());
    try {
      const response: AxiosResponse<AddUserCategoryRs> = await axios.post<AddUserCategoryRs>(url, category);
      if (handleRequestError(response, dispatch, categoryError)) {
        dispatch(addCategorySuccess());
        history.push('/categories');
      }
    } catch (error) {
      dispatch(categoryError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const delCategory =
  (id: number): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(delCategoryRq());
    try {
      const response: AxiosResponse<BaseResponse> = await axios.delete<BaseResponse>(`${url}/user/${id}`);
      if (handleRequestError(response, dispatch, categoryError)) {
        dispatch(delCategorySuccess(id));
      }
    } catch (error) {
      dispatch(categoryError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const editCategory =
  (category: Category, history: History): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(editCategoryRq());
    try {
      const response: AxiosResponse<AddUserCategoryRs> = await axios.put<AddUserCategoryRs>(`${url}/user`, category);
      if (handleRequestError(response, dispatch, categoryError)) {
        dispatch(editCategorySuccess());
        history.push('/categories');
      }
    } catch (error) {
      dispatch(categoryError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const getUserCategories = (): AppThunk => async (dispatch: ThunkDispatch<RootState, null, Action>) => {
  try {
    dispatch(setSpinnerVisibility(true));
    dispatch(getUserCategoriesRq());
    const categories: AxiosResponse<GetUserCategoriesRs> = await axios.get<GetUserCategoriesRs>(`${url}/user`);
    dispatch(getUserCategoriesSuccess(categories.data.categories));
  } catch (error) {
    dispatch(categoryError(['An error has ocurred, try again later']));
  } finally {
    dispatch(setSpinnerVisibility(false));
  }
};

export const getUserCategoryById =
  (categoryId: string): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(getUserCategoryByIdRq());
    try {
      const response: AxiosResponse<AddUserCategoryRs> = await axios.get<AddUserCategoryRs>(
        `${url}/user/${categoryId}`,
      );
      if (handleRequestError(response, dispatch, categoryError)) {
        dispatch(getUserCategoryByIdSuccess(response.data.category));
      }
    } catch (error) {
      dispatch(categoryError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };

export const getUserCategoriesByType =
  (categoryType: number): AppThunk =>
  async (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch(setSpinnerVisibility(true));
    dispatch(getUserCategoriesByTypeRq());
    try {
      const response = await axios.get<GetUserCategoriesRs>(`${url}/user/type/${categoryType}`);
      if (handleRequestError(response, dispatch, categoryError)) {
        dispatch(getUserCategoriesByTypeSuccess(response.data.categories));
      }
    } catch (error) {
      dispatch(categoryError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
