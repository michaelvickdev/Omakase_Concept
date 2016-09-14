import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, TouchableHighlight
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
 * @param {number} [min] - The minimum allowable number.
 * @param {number} [max] - The maximum allowable number.
 * @param {number} [interval] - The incremental for each click.
 */
export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number || this.props.min || 0,
      min: this.props.min || null,
      max: this.props.max || null
    };

    // bind methods
    this.val = this.val.bind(this);
  }

  val() {
    return this.state.number;
  }

  render() {
      return (
        <InputField
          {...this.props}
          field={
          <View style={styles.container}>
            <View style={styles.textContainer}>
                <TouchableHighlight
                  underlayColor={Colors.Transparent}
                  style={styles.button}
                  onPress={() => {
                    if (this.state.min === null
                       || this.state.number > this.state.min) {
                        this.setState({number: this.state.number -
                        (this.props.interval || 1)});
                    }
                  }}>
                  <Text style={styles.buttonText}>
                    -
                  </Text>
                </TouchableHighlight>
                <Text style={styles.text}>
                  {this.state.number}
                </Text>
                <TouchableHighlight
                  underlayColor={Colors.Transparent}
                  style={styles.button}
                  onPress={() => {
                    if (this.state.max === null
                       || this.state.number < this.state.max) {
                        this.setState({number: this.state.number +
                        (this.props.interval || 1)});
                     }
                  }}>
                  <Text style={styles.buttonText}>
                    +
                  </Text>
                </TouchableHighlight>
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
  },

  button: {
    paddingLeft: Sizes.OuterFrame,
    paddingRight: Sizes.OuterFrame
  },

  buttonText: {
    textAlign: 'center',
    fontSize: Sizes.text,
    fontWeight: '500',
    color: Colors.Primary,
  }

});
