import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes, { InferProps } from "prop-types";

import SuccessMsg from "../../Common/SuccessMessage";
import { SimpleError } from "../../Common/Errors";

function LoginForm({
  signErrors,
  signUpMsg,
  userData,
}: InferProps<typeof LoginForm.propTypes>) {
  const history = useHistory();

  useEffect(function () {
    // setSpinnerVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData && userData.token) {
      // const expiration = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
      console.log(new Date());
      const expiration = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set("userData", JSON.stringify(userData), {
        expires: expiration,
        path: "",
      });
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const setEmail = useState("")[1];
  const [emailError, setEmailError] = useState(false);
  const setPassword = useState("")[1];
  const [passwordError, setPasswordError] = useState(false);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    let emailError = false;

    if (!e.currentTarget.value || !e.currentTarget.validity.valid) {
      emailError = true;
    }

    setEmailError(emailError);
    setEmail(e.currentTarget.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    let passwordError = false;

    if (!value) passwordError = true;

    setPassword(value);
    setPasswordError(passwordError);
  };

  /*
  const login = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.email;

    let _emailError = false;
    let _passwordError = false;

    if (!email || !emailInput.validity.valid) {
      _emailError = true;
    }

    if (!password) {
      _passwordError = true;
    }

    if (_emailError || _passwordError) {
      setEmailError(_emailError);
      setPasswordError(passwordError);

      return false;
    }

    signInRq(email, password);
  }; */

  const renderErrorMsgs = () => {
    if (signErrors && signErrors.length > 0) {
      return (
        <SimpleError
          // callback={resetError}
          errors={signErrors}
          timeout={10000}
        />
      );
    }
    return null;
  };

  return (
    <div className="col m-4">
      <form
        autoComplete="off"
        className="login100-form validate-form"
        // onSubmit={login}
      >
        <p
          className="h2 font-weight-bold text-center"
          style={{ marginBottom: 30 }}
        >
          Member Login
        </p>

        <SuccessMsg
          // callback={resetSuccessMsg}
          msg={signUpMsg}
          show={true}
          timeout={5000}
        />

        {renderErrorMsgs()}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope" />
            </span>
          </div>
          <input
            className={"form-control " + (emailError ? " input-error" : "")}
            name="email"
            onChange={changeEmail}
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
          </div>
          <input
            className={"form-control " + (passwordError ? " input-error" : "")}
            name="password"
            onChange={changePassword}
            type="password"
            placeholder="Password"
          />
        </div>
        <div style={{ left: -12, position: "relative", top: -10 }}>
          <Link
            className="btn btn-link"
            style={{ fontSize: 13 }}
            to="/reset-password"
          >
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
        <div
          className="text-center"
          style={{ padding: 0, margin: "-28px 0 10px 0" }}
        >
          <span
            style={{
              backgroundColor: "white",
              padding: "0 10px 0 10px",
              width: "fit-content",
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
            <i
              className="align-middle fab fa-github fa-2x"
              style={{ paddingLeft: 10 }}
            ></i>
          </a>
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  signErrors: PropTypes.array,
  signUpMsg: PropTypes.string,
  userData: PropTypes.shape({
    token: PropTypes.string,
  }),
};

export default LoginForm;
