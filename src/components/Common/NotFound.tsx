import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { RootState, useAppDispatch } from '../../store';
import { setSpinnerVisibility } from '../../reducers/appSlice';

const NotFound: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  useEffect(function () {
    dispatch(setSpinnerVisibility(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Page not found</h1>
    </div>
  );
};

export default NotFound;
