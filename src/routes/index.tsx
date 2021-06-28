import { Switch, Route } from "react-router-dom";

import Dashboard from "../components/Dashboard/Dashboard";
import Login from '../components/Login/Login';
import LoginForm from '../components/Login/LoginForm/LoginForm';
import NotFound from "../components/Common/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
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
