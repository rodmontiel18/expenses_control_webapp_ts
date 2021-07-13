import { Action } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
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

  const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [mode, setMode] = useState('month');
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate);

  useEffect(() => {
    dispatch(getUserCategoriesByType(2, profile.token));
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
          setEndDate(datesFormData.values.endDate);
          setMode(datesFormData.mode);
          setStartDate(datesFormData.values.startDate);
          setStartMonth(datesFormData.values.startMonth);
          localStorage.removeItem('datesFormData');
        }
      } else callGetUserIncomes('month', undefined, undefined, new Date());
    }
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
      fromNumber = from.getTime();
      toNumber = to.getTime();
    } else if (startDate && endDate) {
      fromNumber = startDate.getTime();
      toNumber = endDate.getTime();
    }

    dispatch(getUserIncomes(profile.token, fromNumber, toNumber));
  };

  /* const goIncomeForm = (e, incomeId) => {
    e.preventDefault();
    const _tempData = {
      mode,
      values: {
        endDate,
        startDate,
        startMonth,
      },
    };
    localStorage.setItem('datesFormData', JSON.stringify(_tempData));

    if (incomeId) history.push(`/incomes/edit/${incomeId}`);
    else history.push('/incomes/add');
  }; */

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
    setEndDate(_endDate.getTime());
    setMode(_mode);
    setStartDate(_startDate.getTime());
    setStartMonth(_startMonth.getTime());
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
          {/*<DatesContainer searchAction={'searchIncome'} userToken={profile.token} />*/}
          <DatesContainer userToken={profile.token} />
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
