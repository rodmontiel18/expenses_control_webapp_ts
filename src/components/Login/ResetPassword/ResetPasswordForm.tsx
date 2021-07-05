import { Action } from '@reduxjs/toolkit';
import { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Alert } from 'react-bootstrap';

import { RootState, useAppDispatch } from '../../../store';
import { setSpinnerVisibility } from '../../../reducers/appSlice';
import { userSelector } from '../../../reducers/userSlice';
import { resetPassword } from '../../../actions/userActions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  const { successRq, userErrors } = useSelector(userSelector);

  const [npwd, setNpwd] = useState('');
  const [npwdError, setNpwdError] = useState(false);
  const [cnpwd, setcnpwd] = useState('');
  const [cnpwdError, setCnpwdError] = useState(false);
  const [token, setToken] = useState('');
  const [tokenError, setTokenError] = useState(false);

  const queryFinder: URLSearchParams = useQuery();

  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_$%^&*])(?=.{8,})');

  useEffect(function () {
    dispatch(setSpinnerVisibility(false));

    const vToken = queryFinder.get('token');
    if (vToken) setToken(vToken);
    else setTokenError(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeNPwd = (e: ChangeEvent<HTMLInputElement>): void => {
    const vPwd = e.target.value;
    validNpwd(vPwd);
  };

  const handleChangeCNPwd = (e: ChangeEvent<HTMLInputElement>): void => {
    const vCnpwd = e.target.value;
    validCnpwd(vCnpwd);
  };

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validNpwd(npwd) && validCnpwd(cnpwd)) {
      dispatch(resetPassword(npwd, token));
    }
  };

  const validNpwd = (vPwd: string): boolean => {
    setNpwd(vPwd);
    if (!vPwd || !strongRegex.test(vPwd)) {
      setNpwdError(true);
      return false;
    } else {
      setNpwdError(false);
    }
    return true;
  };

  const validCnpwd = (vCnpwd: string): boolean => {
    setcnpwd(vCnpwd);
    if (vCnpwd !== npwd) {
      setCnpwdError(true);
      return false;
    } else {
      setCnpwdError(false);
    }
    return true;
  };

  const renderResetPasswordContent = (): JSX.Element => {
    return (
      <form className="ml-3 mr-3 mt-4" onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="npwd">New password</label>
          <input
            type="password"
            onChange={handleChangeNPwd}
            name="npwd"
            id="npwd"
            className={'form-control' + (npwdError ? ' input-error' : '')}
            value={npwd}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnpwd">Confirm new password</label>
          <input
            type="password"
            onChange={handleChangeCNPwd}
            name="cnpwd"
            id="cnpwd"
            className={'form-control' + (cnpwdError ? ' input-error' : '')}
            value={cnpwd}
          />
        </div>
        <div className="mt-3">
          <Link to="/signin" className="btn btn-secondary mr-2">
            Cancel
          </Link>
          <input type="submit" value="Reset password" className="btn btn-success" />
        </div>
      </form>
    );
  };

  const renderResponseError = (): JSX.Element => {
    if (!userErrors || userErrors.length <= 0) return <></>;

    return (
      <div className="mt-5">
        <Alert className="p4" variant="danger">
          {userErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Alert>
        <div className="text-center">
          <Link to="/signin" className="btn btn-secondary mt-3">
            Cancel
          </Link>
        </div>
      </div>
    );
  };

  const renderSuccessMsg = (): JSX.Element => {
    return (
      <div className="mt-5">
        <Alert className="p-4" variant="success">
          Your password has been updated successfully.
        </Alert>
        <div className="text-center">
          <Link to="/signin" className="btn btn-success mt-3">
            Login
          </Link>
        </div>
      </div>
    );
  };

  const renderTokenError = (): JSX.Element => {
    return (
      <div className="mt-5">
        <Alert className="p-4" variant="danger">
          An error has ocurred, please try again later
        </Alert>
        <div className="text-center">
          <Link to="/signin" className="btn btn-secondary mt-3">
            Cancel
          </Link>
        </div>
      </div>
    );
  };

  const renderComponent = (): JSX.Element => {
    if (tokenError) return renderTokenError();
    if (userErrors && userErrors.length > 0) return renderResponseError();
    if (!userErrors && successRq) return renderSuccessMsg();
    return renderResetPasswordContent();
  };

  return (
    <div className="col mt-4">
      <p className="h2 font-weight-bold text-center">Reset your password</p>
      {renderComponent()}
    </div>
  );
};

export default ResetPasswordForm;
