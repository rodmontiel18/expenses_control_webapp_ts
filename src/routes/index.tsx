import { Switch, Route } from 'react-router-dom';

import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import LoginForm from '../components/Login/LoginForm/LoginForm';
import NotFound from '../components/Common/NotFound';
import NewUserForm from '../components/Login/NewUserForm/NewUserForm';
import SuccessSignUp from '../components/Login/SuccessSignup/SuccessSignUp';
import GithubLogin from '../components/Login/GithubLogin/GithubLogin';
import ResetPassword from '../components/Login/ResetPassword/ResetPassword';
import ResetPasswordForm from '../components/Login/ResetPassword/ResetPasswordForm';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/signup">
        <Login>
          <NewUserForm />
        </Login>
      </Route>
      <Route exact path="/signin">
        <Login>
          <LoginForm />
        </Login>
      </Route>
      <Route exact path="/success-signin" component={SuccessSignUp} />
      <Route exact path="/github-login" component={GithubLogin} />
      <Route exact path="/reset-password">
        <Login>
          <ResetPassword />
        </Login>
      </Route>
      <Route exact path="/reset-password-form">
        <Login>
          <ResetPasswordForm />
        </Login>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
