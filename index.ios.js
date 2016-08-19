import React, {
  Component, AppRegistry, StyleSheet, Text, View
} from 'react-native';

// components
import Navigation from './src/nav';

class Omakase extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}

AppRegistry.registerComponent('Omakase', () => Omakase);
