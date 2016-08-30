import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight
} from 'react-native';
import {
  Colors
} from '../../../res/Constants';
import DateFormat from 'dateformat';

import Button from './Button';


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
  }

  titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  componentDidMount() {
    // Compute display values
    if (this.props.booking) {
      let booking = this.props.booking;
      booking.perPerson = parseFloat(booking.contributions.budget) / parseInt(booking.contributions.party);
      booking.perPerson = booking.perPerson.toFixed(2);

      let details = `budget of $${booking.contributions.budget} ($${booking.perPerson}/person)`;
      booking.description = `You have requested a booking for ` +
        `${this.titleCase(booking.occasion)}, with ${booking.contributions.party} ` +
        `people. Including a ${details}.`;
      booking.requestedTime = DateFormat(new Date(booking.requestedTime),
        'mmmm dS, h:MMTT');
      this.setState({booking: booking});
    }
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardIntro}>
          <Text style={[styles.cardText, styles.cardTitleText]}>
          {
            this.state.booking.requestedTime
              ? "Booking on " + this.state.booking.requestedTime
              : 'Card Title'
          }
          </Text>
        </View>
        <View style={styles.cardDetails}>
          <Text style={[styles.cardText, styles.cardDetailsTextDesc]}>
          {
            this.state.booking.description ? this.state.booking.description : 'Card Description'
          }
          </Text>
        </View>
        <View style={styles.cardActions}>
          <Button label="DETAILS" fontColor="#3F51B5"/>
          <Button label="CANCEL" fontColor="#DB2D6D"/>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  cardIntro: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardDetails: {
    flex: 1,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 15
  },
  cardActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    height: 30,
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
  },

  cardText: {
    color: Colors.White,
    fontSize: 10
  },
  cardTitleText: {
    fontSize: 16
  },
  cardDetailsTextDesc: {
    color: 'black'
  }
});
