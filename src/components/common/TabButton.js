import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TabButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon
          color={
            this.props.color
            || Colors.Text
          }
          size={20}
          name={this.props.icon} />
        <Text style={[
          styles.label,
          this.props.color && {
            color: this.props.color
          }
        ]}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: Sizes.OuterFrame,
    paddingRight: Sizes.OuterFrame,
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame,
    alignItems: 'center',
    justifyContent: 'center'
  },

  label: {
    fontSize: Sizes.SmallText,
    color: Colors.Text
  }
});
