import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { match, useHistory, useRouteMatch } from 'react-router-dom';
import { History } from 'history';

import { getUserCategoriesByType } from '../../../actions/categoryActions';
import { getIncomeById } from '../../../actions/incomeActions';
import { categorySelector } from '../../../reducers/categorySlice';
import { incomeSelector } from '../../../reducers/incomeSlice';
import { RootState, useAppDispatch } from '../../../store';

import IncomeForm from '../IncomeForm/IncomeForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

interface MatchProps {
  id?: string;
}

const EditIncome: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const match: match<MatchProps> | null = useRouteMatch<MatchProps>('/incomes/edit/:id');
  const history: History = useHistory();

  const { categories } = useSelector(categorySelector);
  const { income, incomeErrors } = useSelector(incomeSelector);

  useEffect(() => {
    dispatch(getUserCategoriesByType(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const incomeId = match?.params.id;
    const numberIncomeId = parseInt(incomeId || '0');
    if (categories && categories.length > 0 && incomeId && !income) dispatch(getIncomeById(numberIncomeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  if (!income || !income.id)
    return <div className="alert alert-danger">The income you want to modify does not exist</div>;

  return (
    <div className="card card-container">
      <div className="card-body">
        <div className="card-title h2 mb-4">Edit an income</div>
        <IncomeForm
          actionForm="edit"
          categories={categories}
          history={history}
          income={income}
          incomeErrors={incomeErrors}
        />
      </div>
    </div>
  );
};

export default EditIncome;
