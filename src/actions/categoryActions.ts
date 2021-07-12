import { AppThunk } from '../store';
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
} from '../reducers/categorySlice';
import { Category } from '../models/category';
import { BaseResponse } from '../models/responses/BaseResponse';
import { AddUserCategoryRs, GetUserCategoriesRs } from '../models/responses/category';
import { handleRequestError } from '../utilities/util';
import { History } from 'history';
import { AxiosResponse } from 'axios';

const url = '/categories';

export const addCategory =
  (category: Category, history: History, userToken: string): AppThunk =>
  async (dispatch) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(addCategoryRq());
    try {
      const response: AxiosResponse<AddUserCategoryRs> = await axios.post<AddUserCategoryRs>(url, category, options);
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
  (id: number, userToken: string): AppThunk =>
  async (dispatch) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(delCategoryRq());
    try {
      const response: AxiosResponse<BaseResponse> = await axios.delete<BaseResponse>(`${url}/user/${id}`, options);
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
  (category: Category, history: History, userToken: string): AppThunk =>
  async (dispatch) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(editCategoryRq());
    try {
      const response: AxiosResponse<AddUserCategoryRs> = await axios.put<AddUserCategoryRs>(
        `${url}/user`,
        category,
        options,
      );
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

export const getUserCategoryById =
  (categoryId: string, userToken: string): AppThunk =>
  async (dispatch) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    dispatch(setSpinnerVisibility(true));
    dispatch(getUserCategoryByIdRq());
    try {
      const response: AxiosResponse<AddUserCategoryRs> = await axios.get<AddUserCategoryRs>(
        `${url}/user/${categoryId}`,
        options,
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

export const getUserCategories =
  (userToken: string): AppThunk =>
  async (dispatch) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    };
    try {
      dispatch(setSpinnerVisibility(true));
      dispatch(getUserCategoriesRq());
      const categories: AxiosResponse<GetUserCategoriesRs> = await axios.get<GetUserCategoriesRs>(
        `${url}/user`,
        options,
      );
      dispatch(getUserCategoriesSuccess(categories.data.categories));
    } catch (error) {
      dispatch(categoryError(['An error has ocurred, try again later']));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
