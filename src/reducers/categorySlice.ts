import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Category } from '../models/category';

interface CategoryState {
  categories?: Category[];
  category?: Category;
  categoryErrors?: string[];
}

const initialState: CategoryState = {
  categories: undefined,
  category: undefined,
  categoryErrors: undefined,
};

const resetCategoryErrorsRd: CaseReducer<CategoryState> = (state: CategoryState) => {
  state.categoryErrors = undefined;
};

const getUserCategoryByIdRqRd: CaseReducer<CategoryState> = (state: CategoryState) => {
  state.category = undefined;
  state.categoryErrors = undefined;
};

const getUserCategoriesByTypeRqRd: CaseReducer<CategoryState> = (state: CategoryState) => {
  state.categories = undefined;
  state.category = undefined;
  state.categoryErrors = undefined;
};

const getUserCategoriesByTypeSuccessRd: CaseReducer<CategoryState, PayloadAction<Category[]>> = (
  state: CategoryState,
  action: PayloadAction<Category[]>,
) => {
  state.categories = action.payload;
  state.categoryErrors = undefined;
};

export const categorySlice = createSlice({
  initialState,
  name: 'category',
  reducers: {
    addCategoryRq: resetCategoryErrorsRd,
    delCategoryRq: resetCategoryErrorsRd,
    editCategoryRq: resetCategoryErrorsRd,
    resetCategoryErrors: resetCategoryErrorsRd,
    addCategorySuccess: getUserCategoryByIdRqRd,
    editCategorySuccess: getUserCategoryByIdRqRd,
    getUserCategoryByIdRq: getUserCategoryByIdRqRd,
    categoryError: (state: CategoryState, action: PayloadAction<string[]>) => {
      state.category = undefined;
      state.categoryErrors = action.payload;
    },
    delCategorySuccess: (state: CategoryState, action: PayloadAction<number>) => {
      state.categories = state.categories?.filter((category: Category) => category.id !== action.payload);
      state.categoryErrors = undefined;
    },
    getUserCategoryByIdSuccess: (state: CategoryState, action: PayloadAction<Category>) => {
      state.category = action.payload;
      state.categoryErrors = undefined;
    },
    getUserCategoriesRq: getUserCategoriesByTypeRqRd,
    getUserCategoriesByTypeRq: getUserCategoriesByTypeRqRd,
    getUserCategoriesSuccess: getUserCategoriesByTypeSuccessRd,
    getUserCategoriesByTypeSuccess: getUserCategoriesByTypeSuccessRd,
    resetCategories: (state: CategoryState) => {
      state.categories = undefined;
    },
  },
});

export const {
  addCategoryRq,
  delCategoryRq,
  editCategoryRq,
  resetCategoryErrors,
  addCategorySuccess,
  editCategorySuccess,
  getUserCategoryByIdRq,
  categoryError,
  delCategorySuccess,
  getUserCategoryByIdSuccess,
  getUserCategoriesRq,
  getUserCategoriesByTypeRq,
  getUserCategoriesSuccess,
  getUserCategoriesByTypeSuccess,
  resetCategories,
} = categorySlice.actions;

export const categorySelector = (state: RootState) => state.category;

export default categorySlice.reducer;
