import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import PropTypes from 'prop-types';

import Routes from './routes';
import LoadingSpinner from './components/Common/LoadingSpinner';

import './App.css';

interface AppProps {
  history: History;
}

const App = (props: AppProps) => {
  return (
    <ConnectedRouter history={props.history}>
      <div className="main-container">
        <Routes />
      </div>
      <LoadingSpinner />
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;
