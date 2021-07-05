import { Action } from '@reduxjs/toolkit';
import { ChangeEvent, Dispatch, FC, FormEvent, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { History } from 'history';

import { RootState, useAppDispatch } from '../../../store';
import { setSpinnerVisibility } from '../../../reducers/appSlice';
import { resetError, signSelector } from '../../../reducers/signSlice';
import { User } from '../../../reducers/userSlice';
import { signUp } from '../../../actions/signActions';

import { SimpleError } from '../../Common/Errors';

const NewUserForm: FC = (): ReactElement => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth();
  const day: number = today.getDate();
  const maxDate: Date = new Date(year - 18, month, day);
  const minDate: Date = new Date(year - 150, month, day);

  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();

  const { signErrors, userData } = useSelector(signSelector);

  const [birthday, setBirthday] = useState(maxDate);
  const [birthdayError, setBirthdayError] = useState(false);
  const [cPwd, setCPwd] = useState('');
  const [cPwdError, setCPwdError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [genre, setGenre] = useState('M');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [lastname, setLastname] = useState('');
  const [lastnameError, setLastnameError] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState(false);

  // eslint-disable-next-line
  const stateSetters: Map<string, Dispatch<SetStateAction<any>>> = new Map<
    string,
    // eslint-disable-next-line
    Dispatch<SetStateAction<any>>
  >([
    ['birthday', setBirthday],
    ['birthdayError', setBirthdayError],
    ['cPwd', setCPwd],
    ['cPwdError', setCPwdError],
    ['email', setEmail],
    ['emailError', setEmailError],
    ['genre', setGenre],
    ['name', setName],
    ['nameError', setNameError],
    ['lastname', setLastname],
    ['lastnameError', setLastnameError],
    ['pwd', setPwd],
    ['pwdError', setPwdError],
  ]);

  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_$%^&*])(?=.{8,})');
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  useEffect(() => {
    dispatch(setSpinnerVisibility(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData) {
      const { birthday, email, name } = userData;
      if (birthday) setBirthday(new Date(birthday));
      if (email) setEmail(email);
      if (name) setName(name);
    }
  }, [userData]);

  const createUser = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    let lBirthdayError = false,
      lCPwdError = false,
      lEmailError = false,
      lNameError = false,
      lLastnameError = false,
      lPwdError = false;

    const lBirthday: Date = new Date(birthday);

    if (!lBirthday.getTime()) lBirthdayError = true;
    if (!validateCPassword(cPwd)) lCPwdError = true;
    if (!validateEmail(email)) lEmailError = true;
    if (!name) lNameError = true;
    if (!lastname) lLastnameError = true;
    if (!validatePassword(pwd)) lPwdError = true;

    setBirthdayError(lBirthdayError);
    setCPwdError(lCPwdError);
    setEmailError(lEmailError);
    setNameError(lNameError);
    setLastnameError(lLastnameError);
    setPwdError(lPwdError);

    if (!lBirthdayError && !lCPwdError && !lEmailError && !lNameError && !lLastnameError && !lPwdError) {
      const user: User = {
        code: 0,
        birthday: lBirthday.getTime().toString(),
        email: email,
        genre,
        id: 0,
        name,
        lastname,
        password: pwd,
        token: '',
      };

      dispatch(signUp(user, history));
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type !== 'radio') e.preventDefault();

    const { name, value } = e.target;

    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmail(value);
        setEmailError(true);
      } else {
        setEmail(value);
        setEmailError(false);
      }
    }

    if (name === 'pwd') {
      handleChangePwd(e);
    }

    if (name === 'cPwd') {
      handleChangeCPwd(e);
    }

    // eslint-disable-next-line
    const valSetter: Dispatch<any> | undefined = stateSetters.get(name);
    // eslint-disable-next-line
    const errorSetter: Dispatch<any> | undefined = stateSetters.get(name + 'Error');
    if (valSetter) valSetter(value);

    if (!value) {
      if (errorSetter) errorSetter(true);
    } else {
      if (errorSetter) errorSetter(false);
    }
  };

  const handleChangePwd = (e: ChangeEvent<HTMLInputElement>): void => {
    const pwd: string = e.target.value;
    if (validatePassword(pwd)) {
      setPwd(pwd);
      setPwdError(false);
    } else {
      setPwd(pwd);
      setPwdError(true);
    }
  };

  const handleChangeCPwd = (e: ChangeEvent<HTMLInputElement>): void => {
    const cPwd: string = e.target.value;
    if (validateCPassword(cPwd)) {
      setCPwd(cPwd);
      setCPwdError(false);
    } else {
      setCPwd(cPwd);
      setCPwdError(true);
    }
  };

  const handleDateChange = (date: Date): void => {
    setBirthday(date);
  };

  const renderErrors = (): JSX.Element => {
    if (signErrors && signErrors.length > 0)
      return <SimpleError errors={signErrors} callbackFn={resetError} timeout={5000} />;
    return <></>;
  };

  const validateEmail = (val: string): boolean => {
    if (!val || !emailRegex.test(val)) return false;
    return true;
  };

  const validatePassword = (pwd: string): boolean => {
    if (!pwd || !strongRegex.test(pwd)) return false;
    return true;
  };

  const validateCPassword = (cPwd: string): boolean => {
    if (!cPwd || cPwd !== pwd.toString()) return false;
    return true;
  };

  let showCPwdError = false;
  if (pwd.length > 0 && cPwdError) showCPwdError = true;

  return (
    <div className="col m-4">
      <form autoComplete="off" className="login100-form validate-form" onSubmit={createUser}>
        <p className="h2 font-weight-bold text-center" style={{ paddingBottom: 20 }}>
          Sign up
        </p>
        {renderErrors()}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user" />
            </span>
          </div>
          <input
            className={'form-control ' + (nameError ? ' input-error' : '')}
            name="name"
            onChange={handleChangeInput}
            placeholder="Name"
            type="text"
            value={name}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user" />
            </span>
          </div>
          <input
            className={'form-control ' + (lastnameError ? ' input-error' : '')}
            name="lastname"
            onChange={handleChangeInput}
            placeholder="Lastname"
            type="text"
          />
        </div>

        <div className="form-row">
          <div className="col-7 col-sm-7 col-md-7 form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-calendar" />
              </span>
            </div>
            <DatePicker
              className={'form-control' + (birthdayError ? ' input-error' : '')}
              dateFormat="dd/MM/yyyy"
              maxDate={maxDate}
              minDate={minDate}
              name="birthday"
              onChange={handleDateChange}
              selected={birthday}
              showYearDropdown
            />
          </div>

          <div className="col-5 col-sm-5 col-md-5 form-group form-check form-check-inline">
            <i className="fa fa-venus-mars" style={{ paddingLeft: 5, paddingRight: 10 }} />
            <input
              checked={genre === 'M'}
              className="form-check-input"
              name="genre"
              onChange={handleChangeInput}
              type="radio"
              value="M"
            />
            <label
              htmlFor="genre"
              className="radio-inline form-check-label"
              style={{ paddingRight: 10, paddingTop: 3 }}
            >
              M
            </label>
            <input
              checked={genre === 'F'}
              className="form-check-input"
              name="genre"
              onChange={handleChangeInput}
              type="radio"
              value="F"
            />
            <label htmlFor="genre" className="radio-inline form-check-label" style={{ paddingTop: 3 }}>
              F
            </label>
          </div>
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
          </div>
          <input
            className={'form-control ' + (emailError ? ' input-error' : '')}
            name="email"
            onChange={handleChangeInput}
            placeholder="Email"
            type="email"
            value={email}
          />
          <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
            <p className={!emailError ? ' hidden' : ''} style={{ color: 'red' }}>
              Invalid email
            </p>
          </div>
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
          </div>
          <input
            className={'form-control ' + (pwdError ? ' input-error' : '')}
            name="pwd"
            onChange={handleChangeInput}
            placeholder="Password"
            type="password"
          />
          <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
            <p className={!pwdError ? ' hidden' : ''} style={{ color: 'red' }}>
              Insecure password
            </p>
          </div>
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
          </div>
          <input
            className={'form-control ' + (showCPwdError ? ' input-error' : '')}
            name="cPwd"
            onChange={handleChangeInput}
            placeholder="Confirm password"
            type="password"
          />
          <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
            <p className={showCPwdError ? '' : 'hidden'} style={{ color: 'red' }}>
              Passwords do not match
            </p>
          </div>
        </div>

        <div style={{ paddingTop: 13, paddingLeft: 7 }} className="row mx-auto">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <Link className="btn btn-md btn-secondary" to="/signin">
              Return
            </Link>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <button className=" btn btn-md btn-success" type="submit">
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
