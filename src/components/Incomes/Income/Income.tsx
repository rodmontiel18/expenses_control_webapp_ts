import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import { RootState, useAppDispatch } from '../../../store';
import { delIncome } from '../../../actions/incomeActions';
import { Category } from '../../../models/category';
import { Income as IncomeModel } from '../../../models/income';

interface IncomeProps {
  categories: Category[];
  income: IncomeModel;
}

const Income: FC<IncomeProps> = ({ categories, income }): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const category = categories.find((c) => c.id === income.categoryId);

  if (!category || !category.id)
    return (
      <tr className="data-info">
        <td colSpan={5} className="alert alert-danger">
          No se encuentra la categoria asociada al ingreso
        </td>
      </tr>
    );

  const handleDelIncome = (id: number) => {
    if (window.confirm('Estas seguro de que deseas eliminar este ingreso?')) dispatch(delIncome(id));
  };

  const getIncomeDate = () =>
    new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(income.incomeDate));

  return (
    <tr className="data-info">
      <td>
        <p>{getIncomeDate()}</p>
      </td>
      <td>
        <p>{income.description}</p>
      </td>
      <td>
        <p>{category.name}</p>
      </td>
      <td>
        <p>{income.amount}</p>
      </td>
      <td className="text-center">
        <button className="btn btn-danger btn-sm" onClick={() => handleDelIncome(income.id)} type="button">
          Eliminar
        </button>
        <Link style={{ marginLeft: 5 }} to={`/incomes/edit/${income.id}`} className="btn btn-sm btn-info">
          Editar
        </Link>
      </td>
    </tr>
  );
};

export default Income;
