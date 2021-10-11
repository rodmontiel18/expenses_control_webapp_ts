import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import { getUserCategoriesByType } from '../../../actions/categoryActions';

import { categorySelector } from '../../../reducers/categorySlice';
import { expenseSelector } from '../../../reducers/expensesSlice';

import { RootState, useAppDispatch } from '../../../store';

import ExpenseForm from '../ExpenseForm/ExpenseForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

import './AddExpense.css';

const AddExpense: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();
  const { categories } = useSelector(categorySelector);
  const { expenseErrors } = useSelector(expenseSelector);

  useEffect(() => {
    dispatch(getUserCategoriesByType(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Add new expense</h1>
        </div>
        <ExpenseForm actionForm="add" categories={categories} expenseErrors={expenseErrors || []} history={history} />
      </div>
    </div>
  );
};

export default AddExpense;
