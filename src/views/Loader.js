import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';

export default class Navigation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello, Omakase.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC'
  }
});
