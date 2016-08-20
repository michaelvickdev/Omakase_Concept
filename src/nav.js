import React, {
  Component
} from 'react';
import {
  Router, Scene
} from 'react-native-router-flux';

// components
import Loader from './views/Loader';
import Login from './views/Login';


/**
 * Registers Views for the global Router, where `loader` is always
 * the initial View displayed.
 */
export default class Navigation extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene
            key="loader"
            initial={true}
            component={Login} />
        </Scene>
      </Router>
    );
  }
}
