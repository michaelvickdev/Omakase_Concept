import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight, Image
} from 'react-native';
import {
  Colors, Sizes, Strings
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
      booking: this.props.booking,
      random: Math.random()
    };
  }

  componentDidMount() {
    // Compute display values
    if (this.props.booking) {
      let booking = this.props.booking;

      if (booking.city.placeId){
        fetch(Strings.googlePlaceURL + 'details/json?placeid='
          + booking.city.placeId + '&key='
          + Strings.googleApiKey)
        .then(response => response.json())
        .then((json) => {
          let photoReference = json.result.photos[Math.floor(this.state.random
            *(json.result.photos.length))].photo_reference;
          this.setState({
            photoReference: photoReference
          });
        });
      }

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
        {this.state.photoReference ?
        <Image style={styles.primaryPhoto}
          source={{uri:
            Strings.googlePlaceURL + 'photo?maxwidth=800&photoreference=' +
            this.state.photoReference +
            '&key=' + Strings.googleApiKey}}/>
        : <View/> }
        <View style={styles.cardContent}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    backgroundColor: Colors.Background,
    shadowColor: Colors.Shadow,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    marginTop: 10,
  },

  cardContent: {
    backgroundColor: Colors.Overlay,
  },

  primaryPhoto: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Sizes.width,
    height: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  cardIntro: {
    margin: Sizes.InnerFrame,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Transparent
  },

  cardText: {
    marginTop: Sizes.InnerFrame/2,
    color: Colors.Secondary,
    fontSize: Sizes.H2,
    fontWeight: '500'
  },
  cardTitleText: {
    fontSize: Sizes.H1,
    fontWeight: '600'
  },


});
