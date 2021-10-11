import { BaseResponse } from '../BaseResponse';
import { Category } from '../../category';

export interface GetUserCategoriesRs extends BaseResponse {
  categories: Category[];
}

export interface AddUserCategoryRs extends BaseResponse {
  category: Category;
}
