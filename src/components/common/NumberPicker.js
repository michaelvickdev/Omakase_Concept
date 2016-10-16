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
      leftNoun: this.props.leftNoun || "",
      rightNoun: this.props.rightNoun  || "",
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
                  {this.state.leftNoun
                    + " " + this.state.number + " "
                    + this.state.rightNoun}
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
    flex: 1
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
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.text,
    color: Colors.Text,
  },

  button: {
    paddingLeft: Sizes.OuterFrame,
    paddingRight: Sizes.OuterFrame
  },

  buttonText: {
    textAlign: 'center',
    fontSize: Sizes.text,
    fontWeight: '500',
    color: Colors.White,
  }

});
