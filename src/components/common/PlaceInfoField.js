import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import InputField from './InputField';

/**
 * Creates a line of Information wrapped in a InputField.
 *
 * @param {number} maxLength - The information.
 * @param {place} name - The name of the place.
 * @param {string} placeId - The googleplaceId.
 */
export default class PlaceInfoField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxLength: this.props.maxLength || 15,
    };
  }

  render() {
    return (
      <InputField
        {...this.props}
        field={
          <Text style={[
            styles.info,
            this.props.style
          ]}>
              {this.props.name &&
              this.props.name.length > this.state.maxLength ?
              this.props.name.substring(0, this.state.maxLength-3)
              + "..." : this.props.name }
          </Text>
        } />
    );
  }
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
    paddingRight: Sizes.OuterFrame,
    fontSize: Sizes.Text,
    color: Colors.Text
  }

});
