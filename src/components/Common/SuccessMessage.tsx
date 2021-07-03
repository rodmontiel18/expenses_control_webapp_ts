import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';

function SuccessMsg({ callback, msg, show, timeout }: InferProps<typeof SuccessMsg.propTypes>) {
  const [open, setOpen] = useState(show);
  const vTimeout = useState(timeout || 5000)[0];

  const hideMsg = () => {
    if (open)
      setTimeout(() => {
        setOpen(false);
        if (callback) callback();
      }, vTimeout);
  };
  if (!msg) return null;

  return (
    <div className="collapse">
      <div>
        {hideMsg()}
        <div className="alert alert-success">
          <p>{msg}</p>
        </div>
      </div>
    </div>
  );
}

SuccessMsg.propTypes = {
  callback: PropTypes.func,
  msg: PropTypes.string,
  show: PropTypes.bool,
  timeout: PropTypes.number,
};

export default SuccessMsg;
