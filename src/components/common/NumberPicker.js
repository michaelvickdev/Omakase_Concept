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
 * @param {text} [prefix] - optional: Prefix for the number
 * @param {text} [suffix] - optional: Suffix for the number
 * @param {text} [suffix] - optional: Suffix for a singular number

 */
export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number || props.min || 0,
      prefix: props.prefix || "",
      suffix: props.suffix || "",
      suffixSingular: props.suffixSingular || props.suffix || "",
      min: props.min || null,
      max: props.max || null,
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
                  <View style={[
                      styles.circleContainer,
                      {
                      borderRadius: 90,
                      backgroundColor:
                      this.state.number===this.state.min
                      ?
                      Colors.Disabled
                      :
                      Colors.Primary
                    },
                    this.props.style
                    ]}>
                    <Text style={styles.buttonText}>
                      -
                    </Text>
                  </View>
                </TouchableHighlight>
                <Text style={styles.text}>
                  {this.state.prefix
                    + " " + this.state.number + " "
                    + (this.state.number == 1
                    ? this.state.suffixSingular : this.state.suffix)}
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
                  <View style={[
                      styles.circleContainer,
                      {
                      borderRadius: 90,
                      backgroundColor:
                      this.state.number===this.state.max
                      ?
                      Colors.Disabled
                      :
                      Colors.Primary
                    },
                    this.props.style
                    ]}>
                    <Text style={styles.buttonText}>
                      +
                    </Text>
                  </View>
                </TouchableHighlight>
            </View>
          </View>}/>

      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },

  circleContainer: {
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.text,
    color: Colors.Text,
    alignSelf: 'center',
    width: 80
  },

  button: {
    padding: Sizes.InnerFrame,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: Sizes.text,
    fontWeight: '500',
    color: Colors.White,
  }

});
