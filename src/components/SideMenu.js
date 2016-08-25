import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';import {
  Colors, Sizes
} from '../../res/Constants';

// components
import {
  Button
} from './common/Button';
import FacebookButton from './account/FacebookButton';

/**
 * Drawer Menu View
 */

export default class SideMenu extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.state = {
      mode: 'client',
      //to be replaced with UserStore.user.isplanner or something alike
      isPlanner: true
    };
  }

  switchMode(mode){
    let {closeDrawer} = this.props
    closeDrawer();
    if(mode === 'planner'){
      Actions.plannerMain();
    } else {
      Actions.clientMain();
    }
    this.setState({
      mode: mode
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      {this.state.mode === 'planner' ?
        this.renderPlannerMenu()
      :
        this.renderClientMenu()
      }
      </ScrollView>
    )
  }

  renderClientMenu() {
    let {closeDrawer} = this.props
    return (
      <View>
        <Text style={styles.controlText}>Client</Text>
        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        {this.state.isPlanner?
        <TouchableOpacity style={styles.button} onPress={() => this.switchMode('planner')}>
          <Text>Planner Mode</Text>
        </TouchableOpacity>
        :
        <View/>
        }
        <TouchableOpacity onPress={closeDrawer}>
          <FacebookButton/>
        </TouchableOpacity>
      </View>
    )
  }

  renderPlannerMenu() {
    let {closeDrawer} = this.props
    return (
      <View>
        <Text style={styles.controlText}>Planner</Text>
        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.switchMode('client')}>
          <Text>Client Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeDrawer}>
          <FacebookButton onLogoutFinished={() => this.switchMode('client')}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.SideMenuBackground,
  },

  controlText: {
    color: 'white',
  },

  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})
