import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState, useAppDispatch } from '../../store';
import { categorySelector } from '../../reducers/categorySlice';
import { expenseSelector } from '../../reducers/expensesSlice';
import { incomeSelector } from '../../reducers/incomeSlice';
import { getUserCategories } from '../../actions/categoryActions';
import { getAllExpenses } from '../../actions/expenseActions';
import { getUserIncomes } from '../../actions/incomeActions';

import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';
import DatesContainer from '../Common/DatesContainer/DatesContainer';
import CreateChart from '../Common/Chart';

interface DatesFormData {
  mode: string;
  values: {
    endDate: number;
    startDate: number;
    startMonth: number;
  };
}

const Dashboard: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const { categories, categoryErrors } = useSelector(categorySelector);
  const { expenses, requestDone: expensesRD } = useSelector(expenseSelector);
  const { incomes, requestDone: incomesRD } = useSelector(incomeSelector);
  const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate);

  useEffect(() => {
    dispatch(getUserCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // getting expenses and incomes
  useEffect(() => {
    if (categories && categories.length > 0) {
      let datesFormData: DatesFormData | undefined;
      const stringDates: string = localStorage.getItem('datesFormData') || '';

      if (stringDates) {
        datesFormData = JSON.parse(stringDates);
      }

      if (
        datesFormData &&
        datesFormData.mode &&
        datesFormData.values &&
        datesFormData.values.endDate &&
        datesFormData.values.startDate &&
        datesFormData.values.startMonth
      ) {
        callGetDataRq(
          datesFormData.mode,
          new Date(datesFormData.values.endDate),
          new Date(datesFormData.values.startDate),
          new Date(datesFormData.values.startMonth),
        );
        setEndDate(datesFormData.values.endDate);
        setStartDate(datesFormData.values.startDate);
        setStartMonth(datesFormData.values.startMonth);
        localStorage.removeItem('datesFormData');
      } else {
        callGetDataRq('month', new Date(endDate), new Date(startDate), new Date(startMonth));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const callGetDataRq = (mode: string, endDate: Date, startDate: Date, startMonth: Date) => {
    let from = null;
    let to = null;

    if (mode === 'month') {
      from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
      to = new Date(from);
      to.setMonth(to.getMonth() + 1);
      to.setDate(to.getDate() - 1);
      from = from.getTime();
      to = to.getTime();
    } else {
      from = startDate.getTime();
      to = endDate.getTime();
    }
    dispatch(getAllExpenses(from, to));
    dispatch(getUserIncomes(from, to));
  };

  if (categoryErrors)
    return (
      <div className="alert alert-danger" style={{ marginTop: 40 }}>
        {categoryErrors}
      </div>
    );

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  // expenses chart
  const createExpensesChart = (): JSX.Element => {
    if (categories && categories.length > 0 && expenses && expenses.length > 0) {
      const expenseCategories = categories.filter((c) => c.type === 1);
      const chartValues: number[] = [];
      const chartColors: string[] = [];
      const chartLabels: string[] = [];

      expenseCategories.forEach((c) => {
        const categoryExpenses = expenses.filter((e) => e.categoryId === c.id);
        if (categoryExpenses) {
          const total = categoryExpenses.reduce((total, expense) => total + expense.amount, 0);
          if (total > 0) {
            chartColors.push(c.color || '#fff');
            chartLabels.push(c.name);
            chartValues.push(total);
          }
        }
      });

      return (
        <CreateChart
          chartColors={chartColors}
          chartLabels={chartLabels}
          chartType="bar"
          chartValues={chartValues}
          title="Gastos"
        />
      );
    }
    return <></>;
  };

  // income chart
  const createIncomeChart = (): JSX.Element => {
    if (categories && categories.length > 0 && incomes && incomes.length > 0) {
      const incomeCategories = categories.filter((c) => c.type === 2);
      const chartValues: number[] = [];
      const chartColors: string[] = [];
      const chartLabels: string[] = [];

      incomeCategories.forEach((c) => {
        const categoryIncomes = incomes.filter((e) => e.categoryId === c.id);
        if (categoryIncomes) {
          const total = categoryIncomes.reduce((total, income) => total + income.amount, 0);
          if (total > 0) {
            chartColors.push(c.color || '#fff');
            chartLabels.push(c.name);
            chartValues.push(total);
          }
        }
      });

      return (
        <CreateChart
          chartColors={chartColors}
          chartLabels={chartLabels}
          chartType="bar"
          chartValues={chartValues}
          title="Ingresos"
        />
      );
    }
    return <></>;
  };

  // balance chart
  const createBalanceChart = (): JSX.Element => {
    if (
      categories &&
      categories.length > 0 &&
      expensesRD &&
      incomesRD &&
      ((expenses && expenses.length > 0) || (incomes && incomes.length > 0))
    ) {
      const chartValues = [];
      if (incomes && incomes.length > 0) chartValues.push(incomes.reduce((total, income) => total + income.amount, 0));
      else chartValues.push(0);

      if (expenses && expenses.length > 0)
        chartValues.push(expenses.reduce((total, expense) => total + expense.amount, 0));
      else chartValues.push(0);

      return (
        <CreateChart
          chartColors={['rgba(9, 159, 16, 1)', 'rgba(150, 7, 7 ,1)']}
          chartLabels={['Ingresos', 'Gastos']}
          chartType="pie"
          chartValues={chartValues}
          title=""
        />
      );
    }
    return <></>;
  };

  const getTotalBalance = (): number => {
    let totalExpenses = 0;
    let totalIncomes = 0;
    if (expenses && expenses.length > 0) {
      totalExpenses = expenses.reduce((acc: number, currentExpense) => (acc += currentExpense.amount), 0);
    }
    if (incomes && incomes.length > 0) {
      totalIncomes = incomes.reduce((acc: number, currentIncome) => (acc += currentIncome.amount), 0);
    }
    return totalIncomes - totalExpenses;
  };

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 10 }}>
          <h1 className="h3 font-weight-bold text-center">Statistics</h1>
        </div>
        <div className="pt-2">
          <div className="row">
            <div className="col-sm-12 col-12">
              <DatesContainer searchAction={callGetDataRq} />
            </div>
          </div>
          {(!expenses || expenses.length < 1) && (!incomes || incomes.length < 1) ? (
            <div className="alert alert-info">No hay informacion para mostrar</div>
          ) : (
            <>
              <div id="balance-chart" className="row">
                <div className="col-sm-12 col-12">
                  <div className="row" style={{ width: '100%' }}>
                    <div className="col-sm-12 col-12">
                      <p className="h2 text-center">Balance mensual</p>
                      <p className="h4 text-center">Total: {getTotalBalance()}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div style={{ marginLeft: '25%', width: '50%' }}>{createBalanceChart()}</div>
                  </div>
                </div>
              </div>
              <div id="comp-charts" className="row" style={{ marginTop: 50 }}>
                <div className="col-sm-12 col-12">
                  <div className="row" style={{ width: '100%' }}>
                    <div className="col-sm-12 col-12 comp-charts-title">
                      <p className="h2 text-center">Desgloce por categoria</p>
                    </div>
                  </div>
                  <div className="row" style={{ margin: 0, minHeight: '100%', width: '100%' }}>
                    <div id="expenses" className="col-sm-6 col-6">
                      {createExpensesChart()}
                    </div>
                    <div id="incomes" className="col-sm-6 col-6">
                      {createIncomeChart()}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
