import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import { delExpense } from '../../../actions/expenseActions';
import { Category } from '../../../models/category';
import { Expense as ExpenseModel } from '../../../models/expense';
import { RootState, useAppDispatch } from '../../../store';

interface ExpenseProps {
  categories: Category[];
  expense: ExpenseModel;
}

const Expense: FC<ExpenseProps> = ({ categories, expense }): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const category = categories.find((c) => c.id === expense.categoryId);

  if (!category || !category.id)
    return (
      <tr className="data-info">
        <td colSpan={5} className="alert alert-danger">
          Category linked to category not found
        </td>
      </tr>
    );

  const handleDelExpense = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this item?')) dispatch(delExpense(id));
  };

  const getExpenseDate = () =>
    new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(expense.expenseDate));

  return (
    <tr className="data-info">
      <td>
        <p>{getExpenseDate()}</p>
      </td>
      <td>
        <p>{expense.description}</p>
      </td>
      <td>
        <p>{category.name}</p>
      </td>
      <td>
        <p>{expense.amount}</p>
      </td>
      <td className="text-center">
        <button className="btn btn-sm btn-danger" onClick={() => handleDelExpense(expense.id)} type="button">
          Delete
        </button>
        <Link className="btn btn-sm btn-info" to={`/expenses/edit/${expense.id}`} style={{ marginLeft: 5 }}>
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default Expense;
