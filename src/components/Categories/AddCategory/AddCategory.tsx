import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { History } from 'history';

import { setSpinnerVisibility } from '../../../reducers/appSlice';
import { categorySelector } from '../../../reducers/categorySlice';
import { RootState, useAppDispatch } from '../../../store';

import CategoryForm from '../CategoryForm/CategoryForm';
import '../Categories.css';

const AddCategory: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();

  const { categoryErrors } = useSelector(categorySelector);

  useEffect(function () {
    dispatch(setSpinnerVisibility(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card edit-category-container card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Add new category</h1>
        </div>
        <CategoryForm actionForm="add" categoryErrors={categoryErrors} history={history} />
      </div>
    </div>
  );
};

export default AddCategory;
