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
} from 'react-native-router-flux';
import {
  Colors, Sizes
} from '../../res/Constants';
import
  Divider
from './common/Divider';


// components
import Button from './common/Button';
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
    let {closeDrawer} = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.mode === 'planner' ?
          this.renderPlannerMenu()
        :
          this.renderClientMenu()
        }
        <TouchableOpacity style={styles.facebookButton} onPress={closeDrawer}>
          <FacebookButton/>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  renderClientMenu() {
    let {closeDrawer} = this.props
    return (
      <View style={styles.subcontainer}>
        <SideItem icon="clear"
          label="Close Drawer"
          onPress={closeDrawer}/>
        <SideItem icon="description"
          label="Orders"
          onPress={() => this.test()}/>
        <SideItem icon="credit-card"
          label="Payment"
          onPress={() => this.test()}/>
        <SideItem icon="face"
          label="Profile"
          onPress={() => this.test()}/>
        <SideItem icon="help-outline"
          label="Help"
          onPress={() => this.test()}/>
        {this.state.isPlanner?
        <View>
          <Divider style={styles.divider}/>
          <SideItem icon="swap-horiz"
            label="Planner Mode"
            onPress={() => this.switchMode('planner')}/>
        </View>
        :
        <View/>
        }
      </View>
    )
  }

  test(){
    alert("YOLO")
  }

  testBalance() {
    let {closeDrawer} = this.props
    closeDrawer();
    Actions.plannerBalance();
  }
  testRequestMain() {
    let {closeDrawer} = this.props
    closeDrawer();
    Actions.plannerRequestMain();
  }
  testRating() {
    let {closeDrawer} = this.props
    closeDrawer();
    Actions.plannerRating();
  }

  renderPlannerMenu() {
    let {closeDrawer} = this.props
    return (
      <View style={styles.subcontainer}>
        <SideItem icon="clear"
          label="Close Drawer"
          onPress={closeDrawer}/>
        <SideItem icon="view-list"
          label="Requests"
          onPress={() => this.testRequestMain()}/>
        <SideItem icon="assessment"
          label="Statistics"
          onPress={() => this.testBalance()}/>
        <SideItem icon="star"
          label="Ratings"
          onPress={() => this.testRating()}/>
        <SideItem icon="face"
          label="Profile"
          onPress={() => this.test()}/>
        <SideItem icon="help-outline"
          label="Help"
          onPress={() => this.test()}/>
        <Divider style={styles.divider}/>
        <SideItem icon="swap-horiz"
          label="Client Mode"
          onPress={() => this.switchMode('client')}/>
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

  subcontainer: {
    marginTop: 30
  },

  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },

  divider: {
    marginTop: 15,
    marginBottom: 15,
  },

  facebookButton: {
    marginTop: 30,
  }
})
