import React, {
  Component
} from 'react';
import {
  AppRegistry, View, Text, StyleSheet
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

AppRegistry.registerComponent('omakase', () => Omakase);
