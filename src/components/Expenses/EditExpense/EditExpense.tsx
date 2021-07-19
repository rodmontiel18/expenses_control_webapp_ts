import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { match, useHistory, useRouteMatch } from 'react-router-dom';
import { History } from 'history';

import { getUserCategoriesByType } from '../../../actions/categoryActions';
import { getExpenseById } from '../../../actions/expenseActions';
import { categorySelector } from '../../../reducers/categorySlice';
import { expenseSelector } from '../../../reducers/expensesSlice';
import { userSelector } from '../../../reducers/userSlice';
import { RootState, useAppDispatch } from '../../../store';

import ExpenseForm from '../ExpenseForm/ExpenseForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

import '../AddExpense/AddExpense.css';

interface MatchProps {
  id?: string;
}

const EditExpense: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();
  const match: match<MatchProps> | null = useRouteMatch<MatchProps>('/expenses/edit/:id');
  const { categories } = useSelector(categorySelector);
  const { profile } = useSelector(userSelector);
  const { expense, expenseErrors } = useSelector(expenseSelector);

  useEffect(() => {
    dispatch(getUserCategoriesByType(1, profile.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = match?.params.id;
    if (categories && categories.length > 0 && id && !expense) {
      dispatch(getExpenseById(id, profile.token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  if (!expense || !expense.id)
    return <div className="alert alert-danger">The expense you want to modify does not exist</div>;

  return (
    <div className="add-expense-container card">
      <p className="card-title h2 mb-4">Edit an expense</p>
      <ExpenseForm
        actionForm="edit"
        categories={categories}
        expense={expense}
        expenseErrors={expenseErrors || []}
        history={history}
        userToken={profile.token}
      />
    </div>
  );
};

export default EditExpense;
