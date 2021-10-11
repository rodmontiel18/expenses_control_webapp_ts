import { Expense } from "../../expense";
import { BaseResponse } from "../BaseResponse";

export interface EditExpenseSuccessRs extends BaseResponse {
    expense: Expense;
};

export interface GetAllExpensesRS extends BaseResponse {
    expenses: Expense[];
}
