import React, {
  Component
} from 'react';
import {
  View, StyleSheet, TextInput, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from './Divider';

/**
 * Generic full span line for InputFields. Usually used in larger
 * enclosing Components to achieve a standardized look and feel.
 *
 * @param {Component} field - The field in JSX to appear inside this
 *  InputField.
 */
export default class InputField extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.isTop && (<Divider />)}
        <View style={styles.innerContainer}>
          {
            this.props.icon
            && <Icon
              style={[
                styles.label,
                styles.icon
              ]}
              name={this.props.icon} />
          }
          <Text
            style={styles.label}>
            {this.props.label || this.props.placeholder}
          </Text>
          {this.props.field}
        </View>
        <Divider
          style={
            !this.props.isBottom && {marginLeft: Sizes.InnerFrame}
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },

  innerContainer: {
    paddingLeft: Sizes.InnerFrame,
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  label: {
    color: Colors.Text,
    fontSize: Sizes.Text,
    fontWeight: '500',
    alignSelf: 'flex-start'
  },

  icon: {
    marginTop: 1,
    marginRight: 5
  }
});
