import Cookies from 'js-cookie';
import { history } from '../../store';

import { setUserDataFromStorage } from '../signSlice';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const checkLoginMiddleware = (store) => (next) => (action) => {
  const storedStrUserData = Cookies.get('userData');
  const storedUserData = storedStrUserData ? JSON.parse(storedStrUserData) : null;
  let flag = false;

  if (storedUserData && storedUserData.token) {
    const { userData } = store.getState().sign;

    if (!userData || !userData.token) {
      flag = true;
      next(action);
      store.dispatch(setUserDataFromStorage(storedUserData));
    }
  }

  const userData = store.getState().sign && store.getState().sign.userData;

  const { location } = store.getState().router;
  if (!flag) next(action);

  if (!userData || !userData.token) {
    if (
      [
        '/github-login',
        '/signin',
        '/signup',
        '/success-signin',
        '/confirm-account',
        '/reset-password',
        '/reset-password-form',
      ].indexOf(location.pathname) < 0
    )
      history.push('/signin');
  }
};

export default checkLoginMiddleware;
