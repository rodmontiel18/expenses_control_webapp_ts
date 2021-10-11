/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, ReactElement, SetStateAction, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export const NoResultsTable: FC = (): ReactElement => {
  return (
    <div className="no-results-table">
      <p>No results found</p>
    </div>
  );
};

interface SimpleErrorProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  callbackFn?: Function;
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
  onCloseFn?: Dispatch<SetStateAction<string[] | null>>;
  errors: string[] | undefined;
}

export const SimpleClosableError: FC<SimpleClosableErrorProps> = ({ onCloseFn, errors }): ReactElement => {
  if (!errors || errors.length < 1) return <></>;

  const handleOnClose = (): void => {
    if (onCloseFn) onCloseFn(null);
  };

  return (
    <Alert dismissible onClose={handleOnClose} variant="danger">
      {errors.map((error: string, index: number) => (
        <p key={index}>{error}</p>
      ))}
    </Alert>
  );
};
