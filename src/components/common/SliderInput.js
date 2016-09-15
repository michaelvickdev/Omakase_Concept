import React, {
  Component
} from 'react';
import {
  StyleSheet, Slider
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import InputField from './InputField';

/**
 * Displays a Slider box for selection over a range.
 * @param {values} - An array of possible values on the slider sequentially
 *  the returned value will be the position of the item staring with '1'
 */
export default class SliderInput extends Component {

  /**
   * Creates a new Slider.
   */
  constructor(props) {
    super(props);
    props.values
    this.state = {
      max: props.values && props.values.length || 5 ,
      value: Math.ceil(props.values && props.values.length/2 || 3)
    };

    // bind methods
    this.val = this.val.bind(this);
  }

  val() {
    return this.state.value;
  }

  render() {
    return (
      <InputField
        {...this.props}
        subtitle={this.props.values[this.state.value-1] || this.state.value}
        field={(
          <Slider
            {...this.props}
            step={1}
            value={this.state.value}
            minimumValue={1}
            maximumValue={this.state.max}
            minimumTrackTintColor={Colors.Primary}
            style={styles.input}
            onValueChange={(value) => this.setState({value: value})} />
        )} />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 20,
    marginRight: 15,
    marginTop: -10,
    marginBottom: -10
  }
});
