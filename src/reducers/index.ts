import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import appReducer from './appSlice';
import categoryReducer from './categorySlice';
import incomeReducer from './incomeSlice';
import signReducer from './signSlice';
import userReducer from './userSlice';

const rootReducer = (history: History) => ({
  app: appReducer,
  category: categoryReducer,
  income: incomeReducer,
  sign: signReducer,
  router: connectRouter(history),
  user: userReducer,
});

export default rootReducer;
