import { Action } from '@reduxjs/toolkit';
import { FC, ReactElement, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useHistory, useLocation } from 'react-router-dom';
import { History } from 'history';

import { RootState, useAppDispatch } from '../../../store';
import { setSpinnerVisibility } from '../../../reducers/appSlice';
import { githubSign } from '../../../actions/signActions';

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

const GithubLogin: FC = (): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();
  const history: History = useHistory();
  const queryFinder: URLSearchParams = useQuery();

  useEffect(() => {
    const code: string = queryFinder.get('code') || '';
    if (!code) dispatch(setSpinnerVisibility(false));
    else dispatch(githubSign(code, history));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logining...</div>;
};

export default GithubLogin;
