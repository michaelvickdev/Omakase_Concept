import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Checkbox
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import InputField from './InputField'
import CheckBox from 'react-native-checkbox'

/**
  * CheckBoxField provides the checkbox for the item.
  * Able to check and uncheck the box when press
  * (checkedImage && uncheckedImage Path can be added to changed)
  * e.g. ./cb_enabled.png
  */
export default class CheckboxField extends Component {
  constructor(props) {
    super(props);
    this.state= {
      value: this.props.value || false
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
        field={(
          <View style={styles.container}>
            <CheckBox
              {...this.props}
              checkboxStyle={styles.checkbox}
              label={""}
              checked={this.state.value}
              onChange={() => this.setState({
                value: !this.state.value
              })} />
          </View>
        )} />
    );
  }
}

const styles = StyleSheet.create({

  checkbox: {
    width: 20,
    height: 20
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
