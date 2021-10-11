import { Action } from '@reduxjs/toolkit';
import { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../../store';
import { setSpinnerVisibility } from '../../../reducers/appSlice';
import { requestResetPassword } from '../../../actions/userActions';

const ResetPassword: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [requestSended, setRequestSended] = useState(false);

  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  useEffect(function () {
    dispatch(setSpinnerVisibility(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const vEmail = e.target.value;
    setEmail(e.target.value);
    if (!validateEmail(vEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateEmail(email)) {
      setRequestSended(true);
      dispatch(requestResetPassword(email));
    }
  };

  const validateEmail = (val: string): boolean => {
    if (!val || !emailRegex.test(val)) return false;
    return true;
  };

  return (
    <div className="col mt-4">
      <p className="h2 font-weight-bold text-center">Reset password</p>
      {!requestSended ? (
        <form className="mt-3 ml-4 mr-4" onSubmit={handleResetPassword}>
          <span>Input the email you have used to register to the page</span>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className={'form-control' + (emailError ? ' input-error' : '')}
              placeholder="email@example.com"
              value={email}
            />
          </div>
          {emailError ? (
            <p className="error" style={{ color: 'red' }}>
              Invalid email format
            </p>
          ) : null}
          <div className="mt-2">
            <Link className="btn btn-secondary mr-2" to="/signin">
              Cancel
            </Link>
            <input className="btn btn-success" type="submit" value="Submit" />
          </div>
        </form>
      ) : (
        <span>
          We have sent and email with the instructions to reset your password. <Link to="/sign">Go back</Link>.
        </span>
      )}
    </div>
  );
};

export default ResetPassword;
