import React, {
  Component
} from 'react';
import {
  StatusBar, Platform, StyleSheet, Navigator
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
import SideMenu from './components/SideMenu';
import Profile from './views/Profile';

// clients components
import ClientMain from './views/client/ClientMain';
import ClientCreate from './views/client/ClientCreate';
import ClientPlannerChoice from './views/client/ClientPlannerChoice';
import ClientExclusion from './views/client/ClientExclusion';
import ClientBudget from './views/client/ClientBudget';
import ClientConfirm from './views/client/ClientConfirm';
import ClientPay from './views/client/ClientPay';

// planners components
import PlannerMain from './views/planner/PlannerMain';
import PlannerBalance from './views/planner/PlannerBalance';
import PlannerRequestDetail from './views/planner/PlannerRequestDetail';
import PlannerRequestPlan from './views/planner/PlannerRequestPlan';
import PlannerRating from './views/planner/PlannerRating';
import Activities from './views/planner/Activities';
import Categories from './views/planner/Categories';

/**
 * Registers Views for the global Router, where `loader` is always
 * the initial View displayed.
 */
export default class Navigation extends Component {
  componentDidMount() {
    Platform.OS === 'ios' && StatusBar.setBarStyle('light-content', true);
  }

  closeDrawer = () => {
    this._drawer.close();
  };

  openDrawer = () => {
    this._drawer.open();
  };

  render() {
    return (
      <Drawer
       ref={(ref) => this._drawer = ref}
       type="overlay"
       content={<SideMenu closeDrawer={this.closeDrawer} />}
       tapToClose={true}
       openDrawerOffset={0.3}
       panCloseMask={0.2}
       closedDrawerOffset={-3}
       tweenHandler={ratio => ({
         main: {
           opacity: (2 - ratio) / 2
         }
       })}>
        <Router getSceneStyle={(props, computed) => ({
          paddingTop: computed.hideNavBar
            ? 0
            : Navigator.NavigationBar.Styles.General.TotalNavHeight
        })}>
          <Scene key="root"
            hideNavBar={true}
            navigationBarStyle={styles.nav}
            titleStyle={styles.navText}
            leftButtonIconStyle = {styles.navButtons}
            rightButtonIconStyle = {styles.navButtons}
            drawerImage = {require("../res/img/menu.png")}>
          <Scene key="profile"
            component={Profile}
            hideNavBar={false} />
          <Scene key="loader"
            initial={true}
            component={Loader}
            type='replace' />
          <Scene key="login"
            component={Login}
            type='replace'/>
          <Scene key="tutorial"
            component={Tutorial}
            type='replace' />

          {/* Scenes for client */}
          <Scene key="clientMain"
            component={ClientMain}
            type='reset'
            hideNavBar={false} />
          <Scene key="clientCreate"
            title={Strings.CreateEventTitle}
            component={ClientCreate}
            hideNavBar={false} />
          <Scene key="clientPlannerChoice"
            title={Strings.CreateEventTitle}
            component={ClientPlannerChoice} />
          <Scene key="clientExclusion"
            title={Strings.CreateEventTitle}
            component={ClientExclusion}
            hidNavBar={false} />
          <Scene key="clientBudget"
            title={Strings.CreateEventTitle}
            component={ClientBudget}
            hidNavBar={false}/>
          <Scene key="clientConfirm"
            title='Confirmation'
            component={ClientConfirm}
            hidNavBar={false} />
          <Scene key="clientPay"
            title='Payment'
            component={ClientPay}
            hidNavBar={false} />

          {/* Scenes for planner */}
          <Scene key="plannerMain"
            component={PlannerMain}
            type='reset'
            hideNavBar={false} />
          <Scene key="plannerBalance"
            title={"Statistics"}
            component={PlannerBalance}
            hideNavBar={false} />
          <Scene key="plannerRequestDetail"
            component={PlannerRequestDetail}
            hideNavBar={false} />
          <Scene key="plannerRequestPlan"
            title={"Make Plan"}
            component={PlannerRequestPlan}
            hideNavBar={false} />
          <Scene key="plannerRating"
            title={"Ratings"}
            component={PlannerRating}
            hideNavBar={false} />
          <Scene key="activities"
            title={"Activities"}
            component={Activities}
            hideNavBar={false} />
          <Scene key="categories"
            title={"Categories"}
            component={Categories}
            hideNavBar={false} />
          </Scene>
        </Router>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: Colors.Primary
  },

  navText: {
    color: Colors.AlternateText
  },

  navButtons: {
    tintColor: Colors.AlternateText
  }
});
