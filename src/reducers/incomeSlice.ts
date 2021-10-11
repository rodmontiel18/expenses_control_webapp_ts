import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Income } from '../models/income';
import { RootState } from '../store';

interface IncomeState {
  income?: Income;
  incomeErrors?: string[];
  incomes?: Income[];
  requestDone: boolean;
}

const initialState: IncomeState = {
  income: undefined,
  incomeErrors: undefined,
  incomes: undefined,
  requestDone: false,
};

const addIncomeRqRd: CaseReducer<IncomeState> = (state: IncomeState) => {
  state.income = undefined;
  state.incomeErrors = undefined;
};

const addIncomeSuccessRd: CaseReducer<IncomeState> = (state: IncomeState) => {
  state.incomeErrors = undefined;
};

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncomeRq: addIncomeRqRd,
    editIncomeRq: addIncomeRqRd,
    getIncomeByIdRq: addIncomeRqRd,
    addIncomeSuccess: addIncomeSuccessRd,
    delIncomerq: addIncomeSuccessRd,
    editIncomeSuccess: addIncomeSuccessRd,
    resetIncomeError: addIncomeRqRd,
    delIncomeSuccess: (state: IncomeState, action: PayloadAction<number>) => {
      state.incomeErrors = undefined;
      state.incomes = state.incomes?.filter((income) => income.id != action.payload);
    },
    getIncomeByIdSuccess: (state: IncomeState, action: PayloadAction<Income>) => {
      state.income = action.payload;
      state.incomeErrors = undefined;
    },
    getUserIncomesRq: (state: IncomeState) => {
      state.income = undefined;
      state.incomeErrors = undefined;
      state.incomes = undefined;
      state.requestDone = false;
    },
    getUserIncomesSuccess: (state: IncomeState, action: PayloadAction<Income[]>) => {
      state.incomeErrors = undefined;
      state.incomes = action.payload;
      state.requestDone = true;
    },
    incomeError: (state: IncomeState, action: PayloadAction<string[]>) => {
      state.income = undefined;
      state.incomeErrors = action.payload;
      state.requestDone = true;
    },
  },
});

export const {
  addIncomeRq,
  editIncomeRq,
  getIncomeByIdRq,
  addIncomeSuccess,
  delIncomerq,
  editIncomeSuccess,
  resetIncomeError,
  delIncomeSuccess,
  getIncomeByIdSuccess,
  getUserIncomesRq,
  getUserIncomesSuccess,
  incomeError,
} = incomeSlice.actions;

export const incomeSelector = (state: RootState) => state.income;

export default incomeSlice.reducer;
