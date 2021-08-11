import { Action } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useSelector } from 'react-redux';

import { getUserIncomes } from '../../actions/incomeActions';
import { getUserCategoriesByType } from '../../actions/categoryActions';
import { categorySelector } from '../../reducers/categorySlice';
import { incomeSelector, resetIncomeError } from '../../reducers/incomeSlice';
import { userSelector } from '../../reducers/userSlice';
import { RootState, useAppDispatch } from '../../store';

import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';
import { NoResultsTable, SimpleError } from '../Common/Errors';
import IncomeList from './IncomeList/IncomeList';
import DatesContainer from '../Common/DatesContainer/DatesContainer';
import { Link } from 'react-router-dom';

const Incomes = () => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const { profile } = useSelector(userSelector);
  const { categories } = useSelector(categorySelector);
  const { incomeErrors, incomes } = useSelector(incomeSelector);

  useEffect(() => {
    dispatch(getUserCategoriesByType(2, profile.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const datesFromStr = localStorage.getItem('datesFormData');
      if (datesFromStr) {
        const datesFormData = JSON.parse(datesFromStr);
        if (
          datesFormData &&
          datesFormData.mode &&
          datesFormData.values &&
          datesFormData.values.endDate &&
          datesFormData.values.startDate &&
          datesFormData.values.startMonth
        ) {
          callGetUserIncomes(
            datesFormData.mode,
            new Date(datesFormData.values.endDate),
            new Date(datesFormData.values.startDate),
            new Date(datesFormData.values.startMonth),
          );
          localStorage.removeItem('datesFormData');
        }
      } else callGetUserIncomes('month', undefined, undefined, new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const callGetUserIncomes = (
    type: string,
    endDate: Date | undefined,
    startDate: Date | undefined,
    startMonth: Date | undefined,
  ) => {
    let from: Date, to: Date;
    let fromNumber = 0,
      toNumber = 0;
    if (type === 'month' && startMonth) {
      from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
      to = new Date(from.getTime());
      to.setMonth(to.getMonth() + 1);
      to.setTime(to.getTime() - 1);
      fromNumber = from.setHours(0, 0, 0, 0);
      toNumber = to.setHours(23, 59, 59, 0);
    } else if (startDate && endDate) {
      fromNumber = startDate.setHours(0, 0, 0, 0);
      toNumber = endDate.setHours(23, 59, 59, 0);
    }

    dispatch(getUserIncomes(profile.token, fromNumber, toNumber));
  };

  const renderErrors = () => {
    if (incomeErrors && incomeErrors.length > 0)
      return <SimpleError callbackFn={resetIncomeError} errors={incomeErrors} timeout={5000} />;
    return null;
  };

  const renderIncomeList = () => {
    if (!incomes || incomes.length < 1) return <NoResultsTable />;
    return <IncomeList categories={categories} incomes={incomes} userToken={profile.token} />;
  };

  const searchIncome = (_mode: string, _endDate: Date, _startDate: Date, _startMonth: Date) => {
    callGetUserIncomes(_mode, _endDate, _startDate, _startMonth);
  };

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Income List</h1>
        </div>
        <div className="pt-3">
          {renderErrors()}
          <DatesContainer searchAction={searchIncome} />
          {renderIncomeList()}
          <div className="add-category-button">
            <Link style={{ marginLeft: 5 }} to="/incomes/add" className="btn btn-sm btn-info">
              Agregar ingreso
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incomes;
