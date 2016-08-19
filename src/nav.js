import React, {
  Component
} from 'react-native';
import {
  Router, Scene
} from 'react-native-router-flux';

// components
import Loader from './views/Loader';

export default class Navigation extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene
            key="loader"
            type="replace"
            initial={true}
            component={Loader} />
        </Scene>
      </Router>
    );
  }
}
