import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';
import
  DateFormat
from 'dateformat';
// components
import {
  Button
} from '../../components/common/Button';

/**
  * Show the corresponding request details:
  * Date, Seating, Number of ppl, Address, Occasions, Budget and Exclusions
  */
export default class PlannerRequestDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      booking: {
        bookingId: '1234',
        createdBy: 'bookerUserId',
        planner: null,
        requestedTime: 1472515800581,
        occasion: 'tinder date',
        finalized: true,
        confirmed: false,
        contributions: {
          budget: 120,
          party: 2,
          exceptions: 'fully cooked beef'
        }
      }
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.day}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "dddd")}
              </Text>
              <Text style={styles.date}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "mmm dS, yyyy")}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "h:MM TT")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Accept"}
            color={Colors.Transparent}
            fontColor={Colors.Primary} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },

  topContainer: {
    marginTop: 15
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateContainer: {
    flexDirection: 'row',
  },

  timeContainer: {
    alignSelf: 'stretch',
  },

  day: {
    marginLeft: Sizes.OuterFrame,
    fontSize: Sizes.H1,
    color: Colors.Text,
  },

  date: {
    marginLeft: 5,
    marginBottom: 1,
    fontSize: Sizes.Text,
    color: Colors.Text,
    alignSelf: 'flex-end'
  },

  time: {
    marginRight: Sizes.OuterFrame,
    fontSize: Sizes.H1,
    color: Colors.Text,
    alignSelf: 'flex-end'
  },

  botContainer: {
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Text
  }
});
