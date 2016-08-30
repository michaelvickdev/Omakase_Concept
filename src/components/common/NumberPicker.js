import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import InputField from './InputField';

/**
 * Platform agnostic NumberPicker wrapped inside InputField.
 *
 * @param {number} the number for this NumberPicker.
 * @param {number} [minDate] - The minimum allowable number.
 * @param {number} [maxDate] - The maximum allowable number.
 */
export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number || 0,
      min: this.props.min || null,
      max: this.props.max || null
    };
  }
  render() {
      return (
        <InputField
          {...this.props}
          field={
          <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    if (this.state.min === null
                       || this.state.number > this.state.min) {
                      this.setState({number: this.state.number - 1});
                    }
                  }
                }>
                   -
                </Text>
                <Text style={styles.text}>
                  {this.state.number}
                </Text>
                <Text
                  style={styles.button}
                  onPress={() => {
                    if (this.state.max === null
                       || this.state.number < this.state.max) {
                     this.setState({number: this.state.number + 1});
                   }
                 }
               }>
                   +
                </Text>
            </View>
          </View>}/>

      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.text,
    color: Colors.EmphasizedText,
    paddingRight: Sizes.OuterFrame
  },

  button: {
    textAlign: 'center',
    fontSize: Sizes.text,
    color: Colors.Primary,
    paddingRight: Sizes.OuterFrame
  }

});
