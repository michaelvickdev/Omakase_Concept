import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Colors
} from '../../res/Constants';
import
  Button
from '../components/common/Button';

/**
 * Handles logging in and redirection to an appropriate View
 * either on app launch or after a login/registration was processed.
 */
export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello, Omakase
        </Text>
        <Button style={[{width:100}]} label={"Login"} color={Colors.Green} shouldBlur={true}/>
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
    fontSize: 20,
    color: Colors.AlternateText
  }
});
