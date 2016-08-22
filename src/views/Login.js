import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors
} from '../../res/Constants';

// components
import FacebookButton from '../components/account/FacebookButton';

/**
 * If fetching user is unsuccessful, allow logging with existing acct
 * or register for a new one
 */
export default class Login extends Component {
  componentDidMount() {

    // override default logged in route
    firebase.auth().onAuthStateChanged(user => {
      if (user) Actions.tutorial(); else Actions.login();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.text, styles.title]}>
            Omakase
          </Text>
          <Text style={styles.text}>
            planning your ultimate experience
          </Text>
        </View>
        <FacebookButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    backgroundColor: Colors.Background,
    paddingBottom: 100
  },

  text: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.Primary
  },

  title: {
    fontSize: 20
  }
});
