import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Category {
  color: string;
  description: string;
  id: number;
  name: string;
  userId: number;
}

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

const resetCategoryErrorsRd: CaseReducer<CategoryState, PayloadAction> = (state) => {
  state.categoryErrors = undefined;
};

const getCategoryByIdRqRd: CaseReducer<CategoryState, PayloadAction> = (state) => {
  state.category = undefined;
  state.categoryErrors = undefined;
};

const getUserCategoriesByTypeRqRd: CaseReducer<CategoryState, PayloadAction> = (state) => {
  state.categories = undefined;
  state.category = undefined;
  state.categoryErrors = undefined;
};

const getUserCategoriesByTypeSuccessRd: CaseReducer<CategoryState, PayloadAction<Category[]>> = (state, action) => {
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
    addCategorySuccess: getCategoryByIdRqRd,
    editCategorySuccess: getCategoryByIdRqRd,
    getCategoryByIdRq: getCategoryByIdRqRd,
    categoriesError: (state, action: PayloadAction<string[]>) => {
      state.category = undefined;
      state.categoryErrors = action.payload;
    },
    delCategorySuccess: (state, action: PayloadAction<number>) => {
      state.categories = state.categories?.filter((category: Category) => category.id !== action.payload);
      state.categoryErrors = undefined;
    },
    getCategoryByIdSuccess: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
      state.categoryErrors = undefined;
    },
    getUserCategoriesRq: getUserCategoriesByTypeRqRd,
    getUserCategoriesByTypeRq: getUserCategoriesByTypeRqRd,
    getUserCategoriesSuccess: getUserCategoriesByTypeSuccessRd,
    getUserCategoriesByTypeSuccess: getUserCategoriesByTypeSuccessRd,
    resetCategories: (state) => {
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
  getCategoryByIdRq,
  categoriesError,
  delCategorySuccess,
  getCategoryByIdSuccess,
  getUserCategoriesRq,
  getUserCategoriesByTypeRq,
  getUserCategoriesSuccess,
  getUserCategoriesByTypeSuccess,
  resetCategories,
} = categorySlice.actions;

export const categorySelector = (state: RootState) => state.category;

export default categorySlice.reducer;
