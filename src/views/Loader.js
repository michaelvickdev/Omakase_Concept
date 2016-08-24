import React, {
  Component
} from 'react';
import {
  View, ActivityIndicator, StyleSheet, StatusBar
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
      if (user) Actions.clientRoot(); else Actions.login();
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
