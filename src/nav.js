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
  Colors, Strings
} from '../res/Constants';

// components
import Loader from './views/Loader';
import Login from './views/Login';
import Tutorial from './views/Tutorial';
import ClientMain from './views/client/ClientMain';
import ClientCreate from './views/client/ClientCreate';
import ClientExclusion from './views/client/ClientExclusion';
import ClientBudget from './views/client/ClientBudget';

/**
 * Registers Views for the global Router, where `loader` is always
 * the initial View displayed.
 */
export default class Navigation extends Component {
  componentDidLoad() {
    StatusBar.setBarStyle('light-content', true);
  }

  render() {
    return (
      <Router>
        <Scene key="root"
          hideNavBar={true}
          navigationBarStyle={{backgroundColor: Colors.Primary}}
          titleStyle={{color: Colors.AlternateText}}
          leftButtonIconStyle = {{tintColor: Colors.AlternateText}}
          rightButtonIconStyle = {{tintColor: Colors.AlternateText}}>
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
          <Scene
            key="clientCreate"
            title={Strings.CreateEventTitle}
            component={ClientCreate}
            hideNavBar={false} />
          <Scene
            key="clientExclusion"
            title={Strings.CreateEventTitle}
            component={ClientExclusion}
            hidNavBar={false} />
          <Scene
            key="clientBudget"
            component={ClientBudget}
            hidNavBar={false}/>
        </Scene>
      </Router>
    );
  }
}
