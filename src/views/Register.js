import React, {
  Component
} from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';
import {
  Colors
} from '../../res/Constants';
import {
  Actions
} from 'react-native-router-flux';

// components
import {
  Button, ArrowButton
} from '../components/common/Buttons';

/**
 * Registering a new account with email, username and password
 */
export default class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      formStage: 0,
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* email field */}
        <View style={[{flex: 0, flexDirection: "row"}]}>
          <View style={styles.textInputWrapper}>
            <TextInput style={[styles.textInput, {alignSelf: 'center'}]}
              onChangeText={(email) => this.setState({email})}
              placeholder="Enter your Email"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
          </View>
          <ArrowButton hide={this.state.formStage > 0}
            onPress={() => this.setState({formStage: 1})}
          />
        </View>

        {/* password field */}
        <View style={[{flex: 0, flexDirection: "row"}]}>
          <View style={styles.textInputWrapper}>
            <TextInput style={[styles.textInput, {alignSelf: 'center'}]}
              onChangeText={(password) => this.setState({password})}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType="next"
            />
          </View>
          <ArrowButton hide={this.state.formStage > 1}/>
        </View>
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

  textInputWrapper: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 5,
  },

  textInput: {
    width: 200,
    height: 30,
  },

  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.Primary
  }
});
