import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { FC, ReactElement, useState } from 'react';

interface SuccessMsgProps {
  callbackFn?: ActionCreatorWithoutPayload;
  msg?: string;
  show: boolean;
  timeout?: number;
}

const SuccessMsg: FC<SuccessMsgProps> = ({ callbackFn, msg, show, timeout }): ReactElement => {
  const [open, setOpen] = useState(show);
  const vTimeout: number = useState(timeout || 5000)[0];

  const hideMsg = (): void => {
    if (open)
      setTimeout(() => {
        setOpen(false);
        if (callbackFn) callbackFn();
      }, vTimeout);
  };
  if (!msg) return <></>;

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
};

export default SuccessMsg;
