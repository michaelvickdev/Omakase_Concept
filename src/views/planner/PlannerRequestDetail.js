import React, {
  Component
} from 'react';
import {
  View, ScrollView, Text, StyleSheet
} from 'react-native';
import {
  Colors, Sizes, Strings
} from '../../../res/Constants';
import
  DateFormat
from 'dateformat';

// components
import
  Icon
from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/common/Button';

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
        <ScrollView contentContainerStyle={styles.topContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.day}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "dddd")}
              </Text>
              <Text style={styles.date}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "mmm dS, yyyy")}
              </Text>
            </View>
            <Text style={styles.time}>
              {DateFormat(
                new Date(this.state.booking.requestedTime), "h:MM TT")}
            </Text>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='group'/>
            <Text style={styles.text}>
              {this.state.booking.contributions.party + ' people'}
            </Text>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='attach-money'/>
            <Text style={styles.text}>
              {this.state.booking.contributions.budget.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='local-play'/>
            <Text style={styles.text}>
              {this.state.booking.occasion ?
                this.state.booking.occasion :
                Strings.NoOccasion}
            </Text>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='block'/>
            <Text style={styles.text}>
              {this.state.booking.contributions.exceptions ?
                this.state.booking.contributions.exceptions :
                Strings.NoException}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
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
    marginLeft: Sizes.OuterFrame,
    marginRight: Sizes.OuterFrame,
  },

  topContainer: {
    marginTop: Sizes.InnerFrame,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowContainer: {
    flexDirection: 'row',
  },

  day: {
    fontSize: Sizes.H1,
    color: Colors.Primary,
  },

  date: {
    marginLeft: 5,
    marginBottom: 1,
    fontSize: Sizes.Text,
    color: Colors.Primary,
    alignSelf: 'flex-end'
  },

  time: {
    fontSize: Sizes.H1,
    color: Colors.Primary,
    alignSelf: 'flex-end'
  },

  bottomContainer: {
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  text: {
    fontSize: Sizes.H2,
    color: Colors.Text
  },

  icon: {
    color: Colors.Text,
    fontSize: Sizes.H1,
    alignSelf: 'flex-start',
    marginRight: Sizes.InnerFrame
  }
});
