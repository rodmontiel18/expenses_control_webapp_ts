/* eslint-disable react-hooks/exhaustive-deps */
import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { match, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { History } from 'history';

import { getUserCategoryById } from '../../../actions/categoryActions';
import { categorySelector } from '../../../reducers/categorySlice';
import { userSelector } from '../../../reducers/userSlice';
import { RootState, useAppDispatch } from '../../../store';

// import { SimpleError } from '../../Common/Errors';
import CategoryForm from '../CategoryForm/CategoryForm';

import '../Categories.css';

interface MatchProps {
  id?: string;
}

const EditCategory: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const match: match<MatchProps> | null = useRouteMatch<MatchProps>('/categories/edit/:id');
  const history: History = useHistory();
  const { profile } = useSelector(userSelector);
  const { category, categoryErrors } = useSelector(categorySelector);

  useEffect(() => {
    const categoryId = match?.params.id;
    if (categoryId && !category) {
      dispatch(getUserCategoryById(categoryId, profile.token));
    }
  }, []);

  if (!category || !category.id) return <div className="alert alert-danger">Category not found</div>;

  /*const renderCategoryErrors = (): JSX.Element => {
    if (categoryErrors && categoryErrors.length > 0)
      return <SimpleError callbackFn={resetCategoryErrors} errors={categoryErrors} timeout={5000} />;

    return <></>;
  };*/

  return (
    <div className="card add-category-container card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Edit category</h1>
        </div>
        {/*renderCategoryErrors()*/}
        <CategoryForm
          actionForm="edit"
          category={category}
          categoryErrors={categoryErrors}
          history={history}
          userToken={profile.token}
        />
      </div>
    </div>
  );
};

export default EditCategory;
