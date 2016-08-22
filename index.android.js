import React, {
  Component
} from 'react';
import {
  AppRegistry
} from 'react-native';
import Database from './src/utils/Firebase';

// components
import Navigation from './src/nav';

/**
 * Android specific things should probably only go in this file, and
 * not in any of the files inside /src (which should be platform
 * agnostic).
 */
class Omakase extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}

AppRegistry.registerComponent('omakase', () => Omakase);
