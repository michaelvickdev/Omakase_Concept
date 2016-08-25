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
import SideItem from './SideItem';

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
      <ScrollView contentContainerStyle={styles.container}>
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
        <SideItem icon="clear"
          label="Close Drawer"
          onPress={closeDrawer}/>
        <SideItem icon="motorcycle"
          label="Test Field1"
          onPress={() => this.test()}/>
        <SideItem icon="star"
          label="Test Field2"
          onPress={() => this.test()}/>
        {this.state.isPlanner?
        <SideItem icon="swap-horiz"
          label="Planner Mode"
          onPress={() => this.switchMode('planner')}/>
        :
        <View/>
        }


        <TouchableOpacity style={styles.facebookButton} onPress={closeDrawer}>
          <FacebookButton/>
        </TouchableOpacity>
      </View>
    )
  }

  test(){
    alert("YOLO")
  }

  renderPlannerMenu() {
    let {closeDrawer} = this.props
    return (
      <View>
        <Text style={styles.controlText}>Planner</Text>
        <SideItem icon="clear"
          label="Close Drawer"
          onPress={closeDrawer}/>
        <SideItem icon="swap-horiz"
          label="Client Mode"
          onPress={() => this.switchMode('client')}/>
        <TouchableOpacity style={styles.facebookButton} onPress={closeDrawer}>
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
    alignItems: 'flex-start'
  },

  controlText: {
    color: 'white',
    fontSize: Sizes.H1,
    marginTop: 10,
    marginBottom: 20
  },

  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },

  facebookButton: {
    marginTop: 30,
  }
})
