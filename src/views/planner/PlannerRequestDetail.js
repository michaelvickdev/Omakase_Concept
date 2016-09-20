import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';
import DateFormat from 'dateformat';

// components

export default class PlannerRequestDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.bookingId}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
