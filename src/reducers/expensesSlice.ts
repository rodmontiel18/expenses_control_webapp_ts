import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../models/expense';
import { RootState } from '../store';

interface ExpenseState {
  expense?: Expense;
  expenses?: Expense[];
  expenseErrors?: string[];
  requestDone: boolean;
}

const initialState: ExpenseState = {
  expense: undefined,
  expenseErrors: undefined,
  expenses: undefined,
  requestDone: false,
};

const addExpenseRqRd: CaseReducer = (state: ExpenseState) => {
  state.expense = undefined;
  state.expenseErrors = undefined;
};

const addExpenseSuccessRd: CaseReducer = (state: ExpenseState) => {
  state.expenseErrors = undefined;
};

export const expenseSlice = createSlice({
  initialState,
  name: 'expense',
  reducers: {
    addExpenseRq: addExpenseRqRd,
    editExpenseRq: addExpenseRqRd,
    getExpenseByIdRq: addExpenseRqRd,
    addExpenseSuccess: addExpenseSuccessRd,
    delExpenseRq: addExpenseSuccessRd,
    editExpenseSuccess: addExpenseSuccessRd,
    resetExpenseErrors: addExpenseSuccessRd,
    delExpenseSuccess: (state: ExpenseState, action: PayloadAction<number>) => {
      state.expenseErrors = undefined;
      state.expenses = state.expenses?.filter((expense) => expense.id !== action.payload);
    },
    expensesError: (state: ExpenseState, action: PayloadAction<string[]>) => {
      state.expense = undefined;
      state.expenseErrors = action.payload;
      state.requestDone = true;
    },
    getAllExpensesRq: (state: ExpenseState) => {
      state.expense = undefined;
      state.expenseErrors = undefined;
      state.expenses = undefined;
      state.requestDone = false;
    },
    getAllExpensesSuccess: (state: ExpenseState, action: PayloadAction<Expense[]>) => {
      state.expenseErrors = undefined;
      state.expenses = action.payload;
      state.requestDone = true;
    },
    getExpenseByIdSuccess: (state: ExpenseState, action: PayloadAction<Expense>) => {
      state.expenseErrors = undefined;
      state.expense = action.payload;
    },
  },
});

export const {
  addExpenseRq,
  editExpenseRq,
  getExpenseByIdRq,
  addExpenseSuccess,
  delExpenseRq,
  editExpenseSuccess,
  resetExpenseErrors,
  delExpenseSuccess,
  expensesError,
  getAllExpensesRq,
  getAllExpensesSuccess,
  getExpenseByIdSuccess,
} = expenseSlice.actions;

export const expenseSelector = (state: RootState) => state.expense;

export default expenseSlice.reducer;
