import React, {
  Component
} from 'react';
import {
  StyleSheet, TouchableOpacity
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux';

// components
import CircleCheck from './CircleCheck';

export default class CloseFullscreenButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={Actions.pop}>
        <CircleCheck
          icon='close'
          color={Colors.Transparent}
          checkColor={Colors.Text}
          size={70} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: Sizes.InnerFrame,
    right: 0,
    position: 'absolute'
  }
});
