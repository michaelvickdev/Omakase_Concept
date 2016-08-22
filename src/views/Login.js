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
import {
  Button
} from '../components/common/Buttons';

/**
 * If fetching user is unsuccessful, allow logging with existing acct
 * or register for a new one
 */
export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      getStarted: false,
    };
  }

  render() {
    return (
      <View style={[{flex: 1}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>
            Omakase
          </Text>
          <Text style={[styles.text, {fontSize: 14,}]}>
            planning your ultimate experience
          </Text>


        </View>
        <View style={styles.bottomContainer}>
          {this.state.getStarted ?
  // replace with implementation of react-native-fbsdk
          <Button style={[{width:150, marginBottom: 100}]}
            label={"Sign in with Facebook"}
            color={Colors.Facebook}
            shouldBlur={true}
            onPress={Actions.tutorial}
          />
          :
          <Button style={[{width:150, marginBottom: 100}]}
            label={"Get Started"}
            color={Colors.Primary}
            onPress={() => this.setState({getStarted: true})}
          />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Background,
    paddingTop: 100
  },

  bottomContainer: {
    flex: 1,
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.Primary
  }
});
