import Cookies from 'js-cookie';
import { history } from '../../store';

import { setUser } from '../userSlice';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const checkLoginMiddleware = (store) => (next) => (action) => {
  const storedStrUserData = Cookies.get('userData');
  const storedUserData = storedStrUserData ? JSON.parse(storedStrUserData) : null;
  let flag = false;

  if (storedUserData && storedUserData.token) {
    const { profile } = store.getState().user;

    if (!profile || !profile.token) {
      flag = true;
      next(action);
      store.dispatch(setUser(storedUserData));
    }
  }

  const userData = store.getState().user && store.getState().user.profile;

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
