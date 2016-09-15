import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Switch
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import InputField from './InputField';

/**
 * Displays a toggleable Switch.
 */
export default class SwitchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default || false
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
            <Switch
              {...this.props}
              onTintColor={this.props.color || Colors.Primary}
              onValueChange={value => this.setState({
                value: value
              })}
              value={this.state.value} />
          </View>
        )} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: Sizes.OuterFrame,
    marginTop: -10,
    marginBottom: -10,
  }
});
