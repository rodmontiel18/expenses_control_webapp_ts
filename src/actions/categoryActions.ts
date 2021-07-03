import { AppThunk } from '../store';
import { setSpinnerVisibility } from '../reducers/appSlice';
import { Category, categoriesError, getUserCategoriesRq, getUserCategoriesSuccess } from '../reducers/categorySlice';
import axios from '../utilities/axiosConfig';

const url = '/categories';

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
      const categories = await axios.get<Category[]>(`${url}/user`, options);
      dispatch(getUserCategoriesSuccess(categories.data));
    } catch (error) {
      console.log(error);
      dispatch(categoriesError(error));
    } finally {
      dispatch(setSpinnerVisibility(false));
    }
  };
