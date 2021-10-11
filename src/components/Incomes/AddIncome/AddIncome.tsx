import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import { getUserCategoriesByType } from '../../../actions/categoryActions';
import { incomeSelector } from '../../../reducers/incomeSlice';
import { categorySelector } from '../../../reducers/categorySlice';
import { RootState, useAppDispatch } from '../../../store';

import IncomeForm from '../IncomeForm/IncomeForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

const AddIncome: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();
  const { categories } = useSelector(categorySelector);
  const { incomeErrors } = useSelector(incomeSelector);

  useEffect(() => {
    dispatch(getUserCategoriesByType(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Add new income</h1>
        </div>
        <IncomeForm actionForm="add" categories={categories} history={history} incomeErrors={incomeErrors} />
      </div>
    </div>
  );
};

export default AddIncome;
