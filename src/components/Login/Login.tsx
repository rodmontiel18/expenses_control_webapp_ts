import React from "react";
import PropTypes from "prop-types";

import "./Login.css";

const Login: React.FC = ({ children }) => {
  return (
    <div id="login-container">
      <div id="login-box" className="row">
        <div className="login100-pic js-tilt col-0 col-sm-0 col-md-6 col-lg-6">
          <img src={`${process.env.PUBLIC_URL}/static/images/img-01.png`} alt="Login"></img>
        </div>

        <div className="col-12 col-sm-12 col-md-6 col-lg-6 login-data">
          <div
            className="row"
            style={{
              height: "84%",
              marginTop: "8%",
              minHeight: 536,
            }}
          >
            {" "}
            {children}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Login;
