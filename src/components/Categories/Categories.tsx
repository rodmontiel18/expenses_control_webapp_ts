import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { useSelector } from 'react-redux';
import { History } from 'history';

import { RootState, useAppDispatch } from '../../store';
import { getUserCategories } from '../../actions/categoryActions';
import { categorySelector, resetCategoryErrors } from '../../reducers/categorySlice';
import { userSelector } from '../../reducers/userSlice';

import ListCategories from './ListCategories/ListCategories';
import { NoResultsTable, SimpleError } from '../Common/Errors';

import './Categories.css';

const Categories: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();

  const { profile } = useSelector(userSelector);
  const { categories, categoryErrors } = useSelector(categorySelector);

  useEffect(() => {
    dispatch(getUserCategories(profile.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goAddCategory = () => {
    history.push('/categories/add');
  };

  const renderCategoryErrors = () => {
    if (categoryErrors && categoryErrors.length > 0)
      return <SimpleError callbackFn={resetCategoryErrors} errors={categoryErrors} timeout={5000} />;
    return null;
  };

  const renderCategoryList = () => {
    if (!categories || categories.length < 1) return <NoResultsTable />;
    return <ListCategories categories={categories} userToken={profile.token} />;
  };

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Categories</h1>
        </div>
        <div className="pt-3">
          {renderCategoryErrors()}
          {renderCategoryList()}
          <div className="add-category-button">
            <button type="button" className="btn btn-success" onClick={goAddCategory}>
              Add category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
