import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight, Image
} from 'react-native';
import {
  Colors, Sizes, Strings, Lists
} from '../../../res/Constants';
import {
  expandOnParty
} from '../planner/BookingCard';

import DateFormat from 'dateformat';
import Button from '../common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
    console.log("mount " + this.props.booking.address);


    if (this.props.booking) {
      let booking = this.props.booking;

      if (booking.requestedTime){
        booking.date = Lists.Days[new Date(booking.requestedTime).getDay()]
          + ", " + DateFormat(new Date(booking.requestedTime),
          'mmmm dS yyyy');
      }

      let [party, budget] = expandOnParty(booking);
      this.setState({
        booking: booking,
        budget: budget,
        party: party,
        size: party.length,
        status: 'Hang tight!! We\'re looking for a planner for you'
      });
    }
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardContent}>
          <View style={styles.cardBody}>
            <Text style={styles.cardText}>
              {this.state.booking.date}
            </Text>
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
        <View style={styles.cardFooter}>
          <Text style={styles.cardText}>
            {this.state.status}
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

  rowWrapper: {
    flex: 0.8,
    flexDirection: 'row',
  },

  cardBody: {
    margin: Sizes.InnerFrame,
    marginTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Transparent
  },

  cardFooter: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Primary,
    paddingTop: Sizes.InnerFrame/2,
    paddingLeft: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
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
