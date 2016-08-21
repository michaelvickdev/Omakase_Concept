import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Colors
} from '../../res/Constants';
import {
  Actions
} from 'react-native-router-flux';

// components
import {
  Button
} from '../components/common/Buttons';

/**
 * If fetching user is unsuccessful, allow logging with existing acct
 * or register for a new one
 */
export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Omakase
        </Text>
        <Text style={[styles.text, {fontSize: 14,}]}>
          planning your ultimate experience
        </Text>
        <Button style={[{width:100, marginTop:10}]}
          label={"Login"} color={Colors.Green} shouldBlur={true}/>
        <Button style={[{width:100, marginTop:10}]}
          label={"Sign Up"} color={Colors.Primary} onPress={Actions.register}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Background
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.Primary
  }
});
