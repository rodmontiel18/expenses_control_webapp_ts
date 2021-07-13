import { FC, ReactElement } from 'react';
import Income from '../Income/Income';

import { Category } from '../../../models/category';
import { Income as IncomeModel } from '../../../models/income';

interface IncomeListProps {
  categories: Category[];
  incomes: IncomeModel[];
  userToken: string;
}

const IncomeList: FC<IncomeListProps> = ({ categories, incomes, userToken }): ReactElement => {
  const total = incomes && incomes.length > 0 ? incomes.reduce((total, gasto) => total + gasto.amount, 0) : 0;

  return (
    <>
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Fecha</th>
            <th>Descripci&oacute;n</th>
            <th>Categoria</th>
            <th>Monto</th>
            <th>Acci&oacute;n</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <Income categories={categories} income={income} key={income.id} userToken={userToken} />
          ))}
        </tbody>
      </table>
      <div style={{ fontSize: 18, textAlign: 'right', marginBottom: 10 }}>
        <span style={{ fontWeight: 'bolder' }}>Total:</span> {total}
      </div>
    </>
  );
};

export default IncomeList;
