import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import { RootState, useAppDispatch } from '../../../store';
import { delCategory } from '../../../actions/categoryActions';
import { Category as CategoryModel } from '../../../models/category';

interface CategoryProps {
  category: CategoryModel;
  userToken: string;
}

const Category: FC<CategoryProps> = ({ category, userToken }): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  const handleDelCategory = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this item?') && delCategory != null)
      dispatch(delCategory(id, userToken));
  };

  return (
    <tr className="data-info">
      <td>
        <p>{category.name}</p>
      </td>
      <td>
        <p>{category.description}</p>
      </td>
      <td>
        <p>{category.type === 1 ? 'Expense' : 'Income'}</p>
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleDelCategory(category.id);
          }}
        >
          Delete
        </button>
        <Link style={{ marginLeft: 5 }} to={`/categories/edit/${category.id}`} className="btn btn-sm btn-info">
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default Category;
