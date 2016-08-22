import React, {
  Component
} from 'react';
import {
  StatusBar
} from 'react-native';
import {
  Router, Scene
} from 'react-native-router-flux';
import {
  Colors
} from '../res/Constants';

// components
import Loader from './views/Loader';
import Login from './views/Login';
import Tutorial from './views/Tutorial';
import ClientMain from './views/client/ClientMain';

/**
 * Registers Views for the global Router, where `loader` is always
 * the initial View displayed.
 */
export default class Navigation extends Component {
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Router>
        <Scene key="root"
          hideNavBar={true}
          navigationBarStyle={{backgroundColor: Colors.Primary}}
          titleStyle={{color: Colors.AlternateText}}>
          <Scene
            key="loader"
            initial={true}
            component={Loader}
            type='replace' />
          <Scene
            key="login"
            component={Login}
            type='replace'/>
          <Scene
            key="tutorial"
            component={Tutorial}
            type='replace' />
          <Scene
            key="clientMain"
            component={ClientMain}
            type='replace'
            hideNavBar={false} />
        </Scene>
      </Router>
    );
  }
}
