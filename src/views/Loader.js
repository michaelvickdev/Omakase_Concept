import React, {
  Component
} from 'react';
import {
  View, ActivityIndicator, StyleSheet, StatusBar
} from 'react-native';
import
  Storage
from 'react-native-simple-store';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors
} from '../../res/Constants';
import * as firebase from 'firebase';

/**
 * Handles logging in and redirection to an appropriate View
 * either on app launch or after a login/registration was processed.
 */
export default class Loader extends Component {
  componentDidMount() {
    StatusBar.setHidden(true, 'slide');

    // handle currently logged in user
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.goToApp(); else Actions.login();
    });
  }

  goToApp(){
    Storage.get('notNew').then(notNew => {
      if (!notNew){
        Actions.tutorial()
      } else {
        Actions.clientMain()
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size={'large'}
          color={Colors.AlternateText}
          animating={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary
  }
});
