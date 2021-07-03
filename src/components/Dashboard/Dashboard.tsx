import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categorySelector } from "../../reducers/categorySlice";
import { signSelector } from "../../reducers/signSlice";
import { getUserCategories } from "../../actions/categoryActions";

import NoCategoriesMsg from "../Categories/NoCategoriesMsg/NoCategoriesMsg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, categoryErrors } = useSelector(categorySelector);
  const { userData } = useSelector(signSelector);
  /* const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate); */

  useEffect(() => {
    if (userData?.token) {
      dispatch(getUserCategories(userData.token));
    }
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
        <div style={{ borderBottom: "solid 1px lightgray", paddingBottom: 10 }}>
          <h1 className="h3 font-weight-bold text-center">Statistics</h1>
        </div>
        <div className="pt-2">
          <div className="row">
            <div className="col-sm-12 col-12"></div>
          </div>
          <div className="alert alert-info">
            No hay informacion para mostrar
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
