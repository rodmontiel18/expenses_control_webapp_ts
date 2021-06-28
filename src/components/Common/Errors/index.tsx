/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import PropTypes, { InferProps } from "prop-types";

export const NoResultsTable = () => {
  return (
    <div className="no-results-table">
      <p>No se encontraron resultados</p>
    </div>
  );
};

export function SimpleError({
  callback,
  errors,
  timeout,
}: InferProps<typeof SimpleError.propTypes>) {
  // const [open, setOpen] = useState(show);

  useEffect(() => {
    setTimeout(() => {
      if (callback) callback();
    }, timeout || 5000);
  }, []);

  if (!errors || errors.length < 1) return null;

  return (
    <div
      className="collapse"
      style={{ display: errors && errors.length > 0 ? "block" : "none" }}
    >
      <div>
        <div className="alert alert-danger">
          {errors.map((error: string, index: number) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

SimpleError.propTypes = {
  callback: PropTypes.func,
  errors: PropTypes.array,
  timeout: PropTypes.number,
};

export function SimpleClosableError({
  onCloseFn,
  errors,
}: InferProps<typeof SimpleClosableError.propTypes>) {
  if (!errors || errors.length < 1) return null;

  const handleOnClose = () => {
    if (onCloseFn) onCloseFn();
  };

  return (
    <Alert dismissible onClose={handleOnClose} variant="danger">
      {errors.map((error: string, index: number) => (
        <p key={index}>{error}</p>
      ))}
    </Alert>
  );
}

SimpleClosableError.propTypes = {
  onCloseFn: PropTypes.func,
  errors: PropTypes.array,
};
