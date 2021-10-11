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
import Categories from '../components/Categories/Categories';
import AddCategory from '../components/Categories/AddCategory/AddCategory';
import EditCategory from '../components/Categories/EditCategory/EditCategory';
import Incomes from '../components/Incomes/Incomes';
import AddIncome from '../components/Incomes/AddIncome/AddIncome';
import EditIncome from '../components/Incomes/EditIncome/EditIncome';
import Expenses from '../components/Expenses/Expenses';
import AddExpense from '../components/Expenses/AddExpense/AddExpense';
import EditExpense from '../components/Expenses/EditExpense/EditExpense';
import MyAccount from '../components/MyAccount/MyAccount';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/categories/add" component={AddCategory} />
      <Route exact path="/categories/edit/:id" component={EditCategory} />
      <Route exact path="/expenses" component={Expenses} />
      <Route exact path="/expenses/add" component={AddExpense} />
      <Route exact path="/expenses/edit/:id" component={EditExpense} />
      <Route exact path="/incomes" component={Incomes} />
      <Route exact path="/incomes/add" component={AddIncome} />
      <Route exact path="/incomes/edit/:id" component={EditIncome} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/my-account" component={MyAccount} />
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
