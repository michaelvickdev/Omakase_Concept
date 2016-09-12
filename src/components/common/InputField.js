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
        <View style={[
          styles.innerContainer,
          this.props.color && {backgroundColor: this.props.color}
        ]}>
          {
            this.props.icon
            && <Icon
              style={[
                styles.label,
                styles.icon
              ]}
              name={this.props.icon} />
          }
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              {this.props.label || this.props.placeholder}
            </Text>
            {this.props.subtitle && (
              <Text style={[
                styles.subtitle,
                this.props.subtitleColor && {
                  color: this.props.subtitleColor
                }
              ]}>
                {this.props.subtitle}
              </Text>
            )}
          </View>
          {this.props.field}
        </View>
        <Divider
          style={[
            !this.props.isBottom
            ? styles.middle
            : styles.bottom,
            this.props.noMargin && {marginBottom: 0}
          ]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch'
  },

  innerContainer: {
    backgroundColor: Colors.Background,
    paddingLeft: Sizes.OuterFrame,
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  labelContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },

  label: {
    color: Colors.Text,
    fontSize: Sizes.Text,
    fontWeight: '500'
  },

  subtitle: {
    color: Colors.Disabled,
    fontSize: Sizes.SmallText,
    fontStyle: 'italic'
  },

  icon: {
    marginTop: 1,
    marginRight: 5
  },

  middle: {
    marginLeft: Sizes.OuterFrame
  },

  bottom: {
    marginBottom: Sizes.OuterFrame
  }
});
