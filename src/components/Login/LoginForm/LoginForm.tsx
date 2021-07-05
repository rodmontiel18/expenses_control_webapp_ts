import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { History } from 'history';
import Cookies from 'js-cookie';

import { RootState, useAppDispatch } from '../../../store';
import { setSpinnerVisibility } from '../../../reducers/appSlice';
import { signSelector } from '../../../reducers/signSlice';
import { signIn } from '../../../actions/signActions';

import SuccessMsg from '../../Common/SuccessMessage';
import { SimpleError } from '../../Common/Errors';

type FormData = {
  email: string;
  password: string;
};

const LoginForm: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { signErrors, signUpMsg, userData } = useSelector(signSelector);

  useEffect(function () {
    dispatch(setSpinnerVisibility(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData && userData.token) {
      const expiration = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
      // const expiration: Date = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set('userData', JSON.stringify(userData), {
        expires: expiration,
        path: '',
      });
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const login = useCallback((formValues: FormData): void => {
    const { email, password } = formValues;
    dispatch(signIn(email, password));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderErrorMsgs = (): JSX.Element => {
    if (signErrors && signErrors.length > 0) {
      return (
        <SimpleError
          // callback={resetError}
          errors={signErrors}
          timeout={10000}
        />
      );
    }
    return <></>;
  };

  return (
    <div className="col m-4">
      <form autoComplete="off" className="login100-form validate-form" onSubmit={handleSubmit(login)}>
        <p className="h2 font-weight-bold text-center" style={{ marginBottom: 30 }}>
          Member Login
        </p>

        <SuccessMsg msg={signUpMsg} show={true} timeout={5000} />

        {renderErrorMsgs()}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope" />
            </span>
          </div>
          <input
            className={'form-control ' + (errors?.email ? ' input-error' : '')}
            type="email"
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
          </div>
          <input
            className={'form-control ' + (errors?.password ? ' input-error' : '')}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
            })}
          />
        </div>
        <div style={{ left: -12, position: 'relative', top: -10 }}>
          <Link className="btn btn-link" style={{ fontSize: 13 }} to="/reset-password">
            Did you forget your password?
          </Link>
        </div>
        <div className="text-center" style={{ marginBottom: 10, marginTop: 5 }}>
          <button className="btn btn-lg btn-success" type="submit">
            Login
          </button>
        </div>

        <div className="text-center">
          <Link className="btn btn-link" to="/signup">
            Create your Account
          </Link>
        </div>

        <hr />
        <div className="text-center" style={{ padding: 0, margin: '-28px 0 10px 0' }}>
          <span
            style={{
              backgroundColor: 'white',
              padding: '0 10px 0 10px',
              width: 'fit-content',
            }}
          >
            Or login with
          </span>
        </div>

        <div className="text-center">
          <a
            className="btn btn-lg btn-outline-dark"
            href="https://github.com/login/oauth/authorize?client_id=63b665c5a28378d7c372&scope=user:email"
          >
            Github
            <i className="align-middle fab fa-github fa-2x" style={{ paddingLeft: 10 }}></i>
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
