import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categorySelector } from '../../reducers/categorySlice';
import { getUserCategories } from '../../actions/categoryActions';

import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, categoryErrors } = useSelector(categorySelector);
  /* const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate); */

  useEffect(() => {
    dispatch(
      getUserCategories(
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJybWNyb2RyaWdvMUBnbWFpbC5jb20iLCJleHAiOjE2MjUwMzQ2NjYsImlhdCI6MTYyNTAxMzA2Nn0.PUIJgW5JibcMVEbbK7J-A4H8eauWjcrEfIdz-8-tnKn0fGXxyO4uvkFf3f7cvJQg8mUSsJ_Bx6rm7r02wP72mQ',
      ),
    );
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
          <div className="alert alert-info">No hay informacion para mostrar</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
