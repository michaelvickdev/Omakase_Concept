import React, {
  Component
} from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, StatusBar
} from 'react-native';
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
      if (user) Actions.clientMain(); else Actions.login();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={Actions.login}>
          <Text style={styles.text}>
            Omakase
          </Text>
        </TouchableOpacity>
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
  },

  text: {
    textAlign: 'right',
    fontSize: 30,
    color: Colors.AlternateText
  }
});
