import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState, useAppDispatch } from '../../store';
import { categorySelector } from '../../reducers/categorySlice';
import { userSelector } from '../../reducers/userSlice';
import { getUserCategories } from '../../actions/categoryActions';

import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';

const Dashboard: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const { categories, categoryErrors } = useSelector(categorySelector);
  const { profile } = useSelector(userSelector);
  /* const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate); */

  useEffect(() => {
    dispatch(getUserCategories(profile.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (categoryErrors)
    return (
      <div className="alert alert-danger" style={{ marginTop: 40 }}>
        {categoryErrors}
      </div>
    );

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 10 }}>
          <h1 className="h3 font-weight-bold text-center">Statistics</h1>
        </div>
        <div className="pt-2">
          <div className="row">
            <div className="col-sm-12 col-12"></div>
          </div>
          <div className="alert alert-info">There is no information to show</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
