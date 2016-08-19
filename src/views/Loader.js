import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors
} from '../../res/Constants';

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello, Omakase
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: Colors.Primary
  },

  text: {
    textAlign: 'right',
    fontSize: 89,
    color: Colors.AlternateText
  }
});
