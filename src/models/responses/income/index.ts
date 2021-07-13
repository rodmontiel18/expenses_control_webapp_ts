import { Income } from "../../income";
import { BaseResponse } from "../BaseResponse";

export interface GetUserIncomesRs extends BaseResponse {
    incomes: Income[];
}
