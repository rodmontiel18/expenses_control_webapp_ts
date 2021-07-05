/* eslint-disable react-hooks/exhaustive-deps */
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export const NoResultsTable: FC = (): ReactElement => {
  return (
    <div className="no-results-table">
      <p>No results found</p>
    </div>
  );
};

interface SimpleErrorProps {
  callbackFn?: ActionCreatorWithoutPayload;
  errors: string[];
  timeout: number;
}

export const SimpleError: FC<SimpleErrorProps> = ({ callbackFn, errors, timeout }): ReactElement => {
  // const [open, setOpen] = useState(show);

  useEffect(() => {
    setTimeout(() => {
      if (callbackFn) callbackFn();
    }, timeout || 5000);
  }, []);

  if (!errors || errors.length < 1) return <></>;

  return (
    <div className="collapse" style={{ display: errors && errors.length > 0 ? 'block' : 'none' }}>
      <div>
        <div className="alert alert-danger">
          {errors.map((error: string, index: number) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SimpleClosableErrorProps {
  onCloseFn?: ActionCreatorWithoutPayload;
  errors: string[];
}

export const SimpleClosableError: FC<SimpleClosableErrorProps> = ({ onCloseFn, errors }): ReactElement => {
  if (!errors || errors.length < 1) return <></>;

  const handleOnClose = (): void => {
    if (onCloseFn) onCloseFn();
  };

  return (
    <Alert dismissible onClose={handleOnClose} variant="danger">
      {errors.map((error: string, index: number) => (
        <p key={index}>{error}</p>
      ))}
    </Alert>
  );
};
