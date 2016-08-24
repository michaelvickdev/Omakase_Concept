import React, {
  Component
} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import {
  Colors
} from '../../../res/Constants';

/**
 * A divider that expands full width.
 */
export default class Divider extends Component {
  render() {
    return (
      <View
        style={[
          styles.divider,
          this.props.style,
          this.props.color && {backgroundColor: this.props.color},
        ]} />
    );
  }
}

styles = StyleSheet.create({
  divider: {
    alignSelf: 'stretch',
    backgroundColor: Colors.Text,
    height: 0.5
  }
});
