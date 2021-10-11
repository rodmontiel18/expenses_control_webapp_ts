import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from '../../reducers/appSlice';

const LoadingSpinner: FC = (): ReactElement => {
  const topPosition: number = window.innerHeight / 2 - 40;
  const { spinnerVisibility } = useSelector(appSelector);

  return (
    <div
      style={{
        background: '#A7CFE8',
        display: spinnerVisibility ? 'block' : 'none',
        float: 'left',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: ' 100%',
      }}
    >
      <div className="d-flex justify-content-center" style={{ marginTop: topPosition }}>
        <div className="spinner-border text-primary" role="status" style={{ width: 80, height: 80 }}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
