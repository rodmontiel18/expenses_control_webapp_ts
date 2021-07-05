import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import appReducer from './appSlice';
import categoryReducer from './categorySlice';
import signReducer from './signSlice';
import userReducer from './userSlice';

const rootReducer = (history: History) => ({
  app: appReducer,
  category: categoryReducer,
  sign: signReducer,
  router: connectRouter(history),
  user: userReducer,
});

export default rootReducer;
