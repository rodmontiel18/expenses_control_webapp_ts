import { FC, ReactElement, useEffect } from 'react';
import { RootState, useAppDispatch } from '../../../store';

import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { setSpinnerVisibility } from '../../../reducers/appSlice';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

const SuccessSignUp: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  useEffect(() => {
    dispatch(setSpinnerVisibility(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col m-4">
      <Alert variant="success">
        Successful registration, please check your email to activate your account.
        <Link to="/signin"> Sign in</Link>
      </Alert>
    </div>
  );
};

export default SuccessSignUp;
