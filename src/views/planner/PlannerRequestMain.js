import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, ListView
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import BookingDayList from '../../components/planner/BookingDayList';

/**
 * Shows all kinds of request for planners including
 * Accepted, Unfinished and Finished
 */
export default class PlannerRequestMain extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <BookingDayList start={0} end={999999999999999999999}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  }
});
