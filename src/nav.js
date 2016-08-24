import React, {
  Component
} from 'react';
import {
  StatusBar, Platform
} from 'react-native';
import {
  Router, Scene
} from 'react-native-router-flux';
import
  Drawer
from 'react-native-drawer'
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
import ClientConfirm from './views/client/ClientConfirm';
import ClientPay from './views/client/ClientPay';
import PlannerMain from './views/planner/PlannerMain';

import SideMenu from './components/SideMenu';


/**
 * Registers Views for the global Router, where `loader` is always
 * the initial View displayed.
 */
export default class Navigation extends Component {
  componentDidLoad() {
    Platform.OS === 'ios' && StatusBar.setBarStyle('light-content', true);
  }

  closeDrawer = () => {
    this._drawer.close()
  };

  openDrawer = () => {
    this._drawer.open()
  };

  render() {
    return (
      <Drawer
       ref={(ref) => this._drawer = ref}
       type="overlay"
       content={<SideMenu closeDrawer={this.closeDrawer} />}
       styles={{
         main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}
       }}
       tapToClose={true}
       openDrawerOffset={0.2}
       panCloseMask={0.2}
       closedDrawerOffset={-3}
       tweenHandler={(ratio) => ({
         main: { opacity:(2-ratio)/2 }
       })}
       >
        <Router>
          <Scene key="root"
            hideNavBar={true}
            navigationBarStyle={{backgroundColor: Colors.Primary}}
            titleStyle={{color: Colors.AlternateText}}
            leftButtonIconStyle = {{tintColor: Colors.AlternateText}}
            rightButtonIconStyle = {{tintColor: Colors.AlternateText}}
            drawerImage = {require("../res/img/menu.png")}>
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

      {/* Scenes for client */}
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
              title={Strings.CreateEventTitle}
              component={ClientBudget}
              hidNavBar={false}/>
            <Scene
              key="clientConfirm"
              title='Confirmation'
              component={ClientConfirm}
              hidNavBar={false} />
            <Scene
              key="clientPay"
              title='Payment'
              component={ClientPay}
              hidNavBar={false} />
      {/* Scenes for planner */}
            <Scene
              key="plannerMain"
              component={PlannerMain}
              type='replace'
              hideNavBar={false} />
          </Scene>
        </Router>
      </Drawer>
    );
  }
}
