import { Switch, Route } from 'react-router-dom';

import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import LoginForm from '../components/Login/LoginForm/LoginForm';
import NotFound from '../components/Common/NotFound';
import NewUserForm from '../components/Login/NewUserForm/NewUserForm';

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
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
