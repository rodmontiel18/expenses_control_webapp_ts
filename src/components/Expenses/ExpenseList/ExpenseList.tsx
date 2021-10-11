import { FC, ReactElement } from 'react';

import { Category } from '../../../models/category';
import { Expense as ExpenseModel } from '../../../models/expense';

import Expense from '../Expense/Expense';

interface ExpenseListProps {
  categories: Category[];
  expenses: ExpenseModel[];
}

const ExpenseList: FC<ExpenseListProps> = ({ categories, expenses }): ReactElement => {
  const total = expenses && expenses.length > 0 ? expenses.reduce((total, gasto) => total + gasto.amount, 0) : 0;

  return (
    <>
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <Expense categories={categories} expense={expense} key={expense.id} />
          ))}
        </tbody>
      </table>
      <div style={{ fontSize: 18, textAlign: 'right', marginBottom: 10 }}>
        <span style={{ fontWeight: 'bolder' }}>Total:</span> {total}
      </div>
    </>
  );
};

export default ExpenseList;
