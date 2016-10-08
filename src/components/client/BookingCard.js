import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';
import {
  expandOnParty
} from '../planner/BookingCard';

import DateFormat from 'dateformat';
import Button from '../common/Button';

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 * Booking Card Component for bookings
 */
export default class BookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.booking ? this.props.booking : {
        // Defaults for testing
        ocassion: 'Party Time',
        confirmed: true,
        // TODO: handle number -> date conversion
        requestedTime: 'October 21st, 7:30PM',
        // TODO: this should be computed
        description: 'You have requested a booking for Party Time, with 4 people at 7:30PM on October 21st.'
      }
    };
    console.log('booking', this.props.booking);
  }

  componentDidMount() {
    // Compute display values
    if (this.props.booking) {
      let booking = this.props.booking;

      if (booking.requestedTime){
        booking.date = days[new Date(booking.requestedTime).getDay()]
          + ", " + DateFormat(new Date(booking.requestedTime),
          'mmmm dS, yyyy');
      }

      let [party, budget] = expandOnParty(booking);
      this.setState({
        booking: booking,
        budget: budget,
        party: party,
        size: party.length,
        status: 'Pending'
      });
    }
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardIntro}>
          <Text style={[styles.cardText, styles.cardTitleText]}>
            {this.state.status}
          </Text>
          <Text style={[styles.cardText, styles.cardTitleText]}>
            {
              this.state.booking.city && this.state.booking.city.name
                ? this.state.booking.city.name
                : 'Trip'
            }
          </Text>
          <Text style={styles.cardText}>
            {this.state.booking.date}
          </Text>
        </View>
        <View style={styles.cardIntro}>
          <Text style={styles.cardText}>
            {
              this.state.booking.address
              && 'Pickup:\n' + this.state.booking.address
            }
          </Text>
          <Text style={styles.cardText}>
            {
              "Budget:\n$" + this.state.budget
              + " for party of " + this.state.size
            }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#ffffff',
    // borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    marginTop: 10,
  },
  cardIntro: {
    margin: Sizes.InnerFrame,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    // justifyContent: 'center',
    height: 30,
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
  },
  cardActionsButtons: {
    flexDirection: 'row'
  },
  cardStatus: {
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: 10,
    // padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderColor: Colors.Transparent,
    borderWidth: 1,
  },

  cardText: {
    marginTop: Sizes.InnerFrame/2,
    color: Colors.Primary,
    fontSize: Sizes.H2
  },
  cardTitleText: {
    fontSize: Sizes.H1
  },
  cardDetailsTextDesc: {
    color: 'black'
  },
  cardStatusText: {
    color: Colors.White
  }
});
