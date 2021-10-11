import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllExpenses } from '../../actions/expenseActions';
import { getUserCategoriesByType } from '../../actions/categoryActions';
import { categorySelector } from '../../reducers/categorySlice';
import { expenseSelector, resetExpenseErrors } from '../../reducers/expensesSlice';

import DatesContainer from '../Common/DatesContainer/DatesContainer';
import ExpenseList from './ExpenseList/ExpenseList';
import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';
import { NoResultsTable, SimpleError } from '../Common/Errors';

import './Expenses.css';
import { ThunkDispatch } from 'redux-thunk';
import { RootState, useAppDispatch } from '../../store';

const Expenses: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const { categories } = useSelector(categorySelector);
  const { expenses, expenseErrors } = useSelector(expenseSelector);

  useEffect(() => {
    dispatch(getUserCategoriesByType(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const datesFromDataStr = localStorage.getItem('datesFormData');
      if (datesFromDataStr) {
        const datesFormData = JSON.parse(datesFromDataStr);
        if (
          datesFormData &&
          datesFormData.mode &&
          datesFormData.values &&
          datesFormData.values.endDate &&
          datesFormData.values.startDate &&
          datesFormData.values.startMonth
        ) {
          callGetExpensesRq(
            datesFormData.mode,
            new Date(datesFormData.values.endDate),
            new Date(datesFormData.values.startDate),
            new Date(datesFormData.values.startMonth),
          );
          localStorage.removeItem('datesFormData');
        }
      } else callGetExpensesRq('month', undefined, undefined, new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const callGetExpensesRq = (
    type: string,
    endDate: Date | undefined,
    startDate: Date | undefined,
    startMonth: Date | undefined,
  ): void => {
    let from: Date, to: Date;
    let fromNumber = 0,
      toNumber = 0;

    if (type === 'month' && startMonth) {
      from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
      to = new Date(from);
      to.setMonth(to.getMonth() + 1);
      to.setDate(to.getDate() - 1);
      fromNumber = from.setHours(0, 0, 0, 0);
      toNumber = to.setHours(23, 59, 59, 0);
    } else if (startDate && endDate) {
      fromNumber = startDate.setHours(0, 0, 0, 0);
      toNumber = endDate.setHours(23, 59, 59, 0);
    }
    dispatch(getAllExpenses(fromNumber, toNumber));
  };

  const renderExpenseErrors = (): JSX.Element => {
    if (!expenses || expenses.length < 1)
      return <SimpleError callbackFn={resetExpenseErrors} errors={expenseErrors || []} timeout={5000} />;
    return <></>;
  };

  const renderExpenseList = (): JSX.Element => {
    if (!expenses || expenses.length < 1) return <NoResultsTable />;

    return <ExpenseList categories={categories} expenses={expenses} />;
  };

  const searchExpenses = (_mode: string, _endDate: Date, _startDate: Date, _startMonth: Date): void => {
    callGetExpensesRq(_mode, _endDate, _startDate, _startMonth);
  };

  return (
    <div className="card card-container expenses-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Expense List</h1>
        </div>
        <div className="pt-3">
          {renderExpenseErrors()}
          <DatesContainer searchAction={searchExpenses} />
          {renderExpenseList()}
          <Link style={{ marginLeft: 5 }} to="/expenses/add" className="btn btn-success add-button">
            Add expense
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
