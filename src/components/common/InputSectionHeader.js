import React, {
  Component
} from 'react';
import {
  View, StyleSheet, TextInput, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

/**
 * Displays a section header for SingleLineInput fields.
 *
 * @param {string} label - The label for this InputSectionHeader.
 * @param {string} [color] - The font color.
 */
export default class InputSectionHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[
          styles.label,
          this.props.color && {color: this.props.color}
        ]}>
          {this.props.label.toUpperCase()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 5
  },

  label: {
    backgroundColor: Colors.Transparent,
    color: Colors.MediumGrey,
    fontSize: Sizes.SmallText,
    paddingLeft: 10
  }
});
