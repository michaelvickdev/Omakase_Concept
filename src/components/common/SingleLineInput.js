import React, {
  Component
} from 'react';
import {
  StyleSheet, TextInput
} from 'react-native';
import {
  Sizes
} from '../../../res/Constants';

// components
import InputField from './InputField';

/**
 * Displays a Input box for text entry.
 */
export default class SingleLineInput extends Component {

  /**
   * Creates a new Input box for text entry.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: ''
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
          <TextInput
            {...this.props}
            clearButtonMode='always'
            onChangeText={text => {
              text = (
                !!this.props.onChangeText ?
                this.props.onChangeText(text) || text:
                text
              );
              this.setState({value: text});
            }}
            style={styles.input} />
        )} />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: Sizes.Text,
    textAlign: 'right',
    flex: 1,
  }
});
