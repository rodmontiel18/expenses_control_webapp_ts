import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { setSpinnerVisibility } from '../../../reducers/appSlice';

function SuccessSignUp() {
  const dispatch = useDispatch();
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
}

export default connect(null, { setSpinnerVisibility })(SuccessSignUp);
