import { Action } from '@reduxjs/toolkit';
import { ChangeEvent, Dispatch, FC, FormEvent, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Alert, Button, Card } from 'react-bootstrap';

import { RootState, useAppDispatch } from '../../store';

import { SimpleClosableError } from '../Common/Errors';

import { getProfile, updatePassword, updateProfile } from '../../actions/userActions';
import { userSelector, resetUserErrors } from '../../reducers/userSlice';

import DatePicker from 'react-datepicker';

import './my-account.css';
import { User } from '../../models/user';
import { UpdatePasswordRq } from '../../models/requests/user';

const MyAccount: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const { profile, successRq, updatePasswordRqFlag, updateProfileRqFlag, userErrors } = useSelector(userSelector);
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth();
  const day: number = today.getDate();
  const maxDate: Date = new Date(year - 18, month, day);
  const minDate: Date = new Date(year - 150, month, day);
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_$%^&*])(?=.{8,})');

  const [birthday, setBirthday] = useState<Date>(maxDate);
  const [genre, setGenre] = useState<string>('M');
  const [lastname, setLastname] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [opwd, setOpwd] = useState<string>('');
  const [npwd, setNpwd] = useState<string>('');
  const [vnpwd, setVnpwd] = useState<string>('');

  const [birthdayError, setBirthdayError] = useState<boolean>(false);
  const [lastnameError, setLastnameError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [npwdError, setNpwdError] = useState<boolean>(false);
  const [vnpwdError, setVnpwdError] = useState<boolean>(false);

  const [genericPrErrors, setGenericPrErrors] = useState<string[] | null>(null);
  const [genericPaErrors, setGenericPaErrors] = useState<string[] | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(successRq);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stateSetters: Map<string, Dispatch<SetStateAction<any>>> = new Map<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Dispatch<SetStateAction<any>>
  >([
    ['birthday', setBirthday],
    ['birthdayError', setBirthdayError],
    ['genre', setGenre],
    ['lastname', setLastname],
    ['lastnameError', setLastnameError],
    ['npwd', setNpwd],
    ['npwdError', setNpwdError],
    ['name', setName],
    ['nameError', setNameError],
    ['opwd', setOpwd],
    ['vnpwd', setVnpwd],
    ['vnpwdError', setVnpwdError],
  ]);

  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile.name) {
      setBirthday(new Date(profile.birthday));
      setGenre(profile.genre);
      setLastname(profile.lastname);
      setName(profile.name);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.name]);

  useEffect(() => {
    setShowSuccessMsg(updatePasswordRqFlag || updateProfileRqFlag);
    setNpwd('');
    setOpwd('');
    setVnpwd('');
  }, [updatePasswordRqFlag, updateProfileRqFlag]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type !== 'radio') e.preventDefault();
    const { name, value } = e.target;

    if (name === 'npwd') {
      handleChangePwd(e);
    } else {
      // eslint-disable-next-line
      const valSetter: Dispatch<any> | undefined = stateSetters.get(name);
      // eslint-disable-next-line
      const errorSetter: Dispatch<any> | undefined = stateSetters.get(name + 'Error');

      if (valSetter) {
        valSetter(value);
        if (name != 'opwd' && errorSetter) {
          if (name === 'vnpwd') {
            if (value !== npwd) errorSetter(true);
            else errorSetter(false);
          } else {
            if (!value) errorSetter(true);
            else errorSetter(false);
          }
        }
      }
    }
  };

  const handleChangePwd = (e: ChangeEvent<HTMLInputElement>): void => {
    const pwd = e.target.value;
    if (validatePassword(pwd)) {
      setNpwd(pwd);
      setNpwdError(false);
    } else {
      setNpwd(pwd);
      setNpwdError(true);
    }
  };

  const handleUpdateProfile = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!lastname && !name) {
      setGenericPrErrors(['All fields are required']);
    } else if (birthday && genre && lastname && name && !birthdayError && !lastnameError && !nameError) {
      const lProfile: User = {
        birthday: birthday.getTime().toString(),
        genre,
        lastname,
        name,
        email: '',
        id: 0,
        password: '',
      };
      dispatch(updateProfile(lProfile));
    }
  };

  const handleUpdatePassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!opwd && !npwd && !vnpwd) {
      setGenericPaErrors(['All fields are required']);
    } else if (npwd !== vnpwd) {
      setGenericPaErrors(['New passwords needs to be equals']);
    } else if (opwd === npwd) {
      setGenericPaErrors(['New password needs to be different than the old one']);
    } else if (opwd && npwd && vnpwd && !npwdError && !vnpwdError) {
      const updatePasswordRq: UpdatePasswordRq = {
        oldPassword: opwd,
        newPassword: npwd,
      };
      dispatch(updatePassword(updatePasswordRq));
    }
  };

  const validatePassword = (pwd: string): boolean => {
    if (!pwd || !strongRegex.test(pwd)) return false;
    return true;
  };

  const renderFormErrors = (errors: string[], closeFn: Dispatch<SetStateAction<string[] | null>>): JSX.Element => {
    return <SimpleClosableError errors={errors} onCloseFn={closeFn} />;
  };

  const renderSuccessMsg = function (msg: string): JSX.Element {
    return (
      <Alert dismissible onClose={() => setShowSuccessMsg(false)} variant="success">
        {msg}
      </Alert>
    );
  };

  const renderResponseErrors = function () {
    return <SimpleClosableError errors={userErrors} onCloseFn={resetUserErrors} />;
  };

  return (
    <Card className="card-container">
      <Card.Body>
        <form className="profile-container" onSubmit={handleUpdateProfile}>
          <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 5 }}>
            <span className="h3">Update profile</span>
          </div>
          {userErrors ? renderResponseErrors() : null}
          {genericPrErrors ? renderFormErrors(genericPrErrors, setGenericPrErrors) : null}
          {showSuccessMsg
            ? renderSuccessMsg(updateProfileRqFlag ? 'Profile updated successfully' : 'Password updated successfully')
            : null}
          <div className="form-row pt-3">
            <div className="form-group col">
              <label htmlFor="name">Name</label>
              <input
                className={'form-control form-control-sm' + (nameError ? ' input-error' : '')}
                id="name"
                name="name"
                onChange={handleChangeInput}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="lastname">Lastname</label>
              <input
                className={'form-control form-control-sm' + (lastnameError ? ' input-error' : '')}
                id="name"
                name="lastname"
                onChange={handleChangeInput}
                type="text"
                value={lastname}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="birthday">Birthday</label>
              <DatePicker
                className={'form-control form-control-sm' + (birthdayError ? ' input-error' : '')}
                dateFormat="dd/MM/yyyy"
                maxDate={maxDate}
                minDate={minDate}
                name="birthday"
                onChange={(date: Date) => setBirthday(date)}
                placeholderText="dd/mm/yyy"
                selected={birthday}
                showYearDropdown
              />
            </div>
            <div className="col form-group">
              <label htmlFor="genre">Genre</label>
              <div>
                <div className="form-check form-check-inline">
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
                </div>
                <div className="form-check form-check-inline">
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
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="submit" variant="success">
              Update profile
            </Button>
          </div>
        </form>
        <form className="password-container" onSubmit={handleUpdatePassword}>
          <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 5 }}>
            <span className="h3">Change password</span>
          </div>
          {genericPaErrors ? renderFormErrors(genericPaErrors, setGenericPaErrors) : null}
          <div className="form-row pt-3">
            <div className="form-group col-6">
              <label htmlFor="old-password">Old password</label>
              <input
                className="form-control form-control-sm"
                onChange={handleChangeInput}
                type="password"
                name="opwd"
                id="old-password"
                value={opwd}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="new-pwd">New password</label>
              <input
                type="password"
                name="npwd"
                id="new-pwd"
                className={'form-control form-control-sm' + (npwdError ? ' input-error' : '')}
                onChange={handleChangeInput}
                value={npwd}
              />
              {npwdError ? <span className="error-msg">Insecure password</span> : null}
            </div>
            <div className="col form-group">
              <label htmlFor="vnew-pwd">Confirm new password</label>
              <input
                type="password"
                name="vnpwd"
                id="vn-pwd"
                className={'form-control form-control-sm' + (vnpwdError ? ' input-error' : '')}
                onChange={handleChangeInput}
                value={vnpwd}
              />
              {vnpwdError ? <span className="error-msg">Passwords don&apos;t match</span> : null}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="submit" variant="success">
              Update password
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default MyAccount;
