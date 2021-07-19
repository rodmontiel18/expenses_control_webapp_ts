import { Income } from '../../income';
import { BaseResponse } from '../BaseResponse';

export interface GetUserIncomesRs extends BaseResponse {
  incomes: Income[];
}

export interface AddIncomeRs extends BaseResponse {
  income: Income;
}
