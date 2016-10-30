import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity, Image
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes, Strings, Lists, Styles
} from '../../../res/Constants';
import {
  expandOnParty
} from '../planner/BookingCard';

import GroupAvatar from '../profile/GroupAvatar';
import DateFormat from 'dateformat';
import Button from '../common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Excitement from '../common/Excitement';
import OutlineText from '../common/OutlineText';


/**
 * Booking Card Component for bookings
 */
export default class BookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.booking,
      bookingId: this.props.bookingId,
      random: Math.random()
    };
  }

  componentDidMount() {
    // Compute display values

    if (this.props.booking) {
      let booking = this.props.booking;

      if (booking.requestedTime){
        booking.date = Lists.Days[new Date(booking.requestedTime).getDay()]
          + ", " + DateFormat(new Date(booking.requestedTime),
          'mmmm dS yyyy');
      }

      let status = "Submitted";
      if (booking.itinerary && booking.itinerary.length > 0) {
        status = "Planned"
      } else if (booking.planner) {
        status = "Matched";
      } else if (booking.interested && booking.interested.length > 0){
        status = "Pending"
      }

      let [party, budget] = expandOnParty(booking);
      this.setState({
        booking: booking,
        budget: budget,
        party: party,
        size: party.length,
        status: status
      });
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => {
          Actions.clientDetail({
            bookingId: this.state.bookingId
          })}}>
        <View style={styles.cardContent}>
          <View style={styles.cardBody}>
            <Text style={[styles.cardText, styles.cardTitleText, styles.date]}>
              {this.state.booking.date}
            </Text>
            <OutlineText
              style={styles.status}
              text={this.state.status} />
          </View>
          <View style={styles.cardBody}>
            <GroupAvatar
              limit={6}
              uids={
                this.state.party
              } />
            <View>
              <View style={styles.detailsContainer}>
                <Text style={[
                  Styles.Header,
                  styles.right
                ]}>
                  {`$${(
                    this.state.budget / (
                      this.state.size
                    )
                  ).toFixed(0)}`}
                </Text>
                <Text style={[
                  styles.details,
                  styles.right
                ]}>
                  per person
                </Text>
                <Excitement
                  level={
                    this.state.booking
                    && this.state.booking.excitement
                    || 0
                  }
                  style={styles.excitement} />
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Icon style={styles.icon}
              name='gps-fixed'
              size={Sizes.Text}
              color={Colors.Text} />
            <View style={styles.column}>
              <Text style={styles.cardText}>
                {this.state.booking.address && this.state.booking.address.name
                ? this.state.booking.address.name : this.state.booking.address}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.Foreground,
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    marginBottom: Sizes.ItemSpacer,
  },

  cardContent: {
    marginLeft: Sizes.InnerFrame,
    marginRight: Sizes.InnerFrame,
    marginBottom: Sizes.InnerFrame
  },

  rowWrapper: {
    flex: 0.8,
    flexDirection: 'row',
  },

  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
  },

  column: {
    flex: 0.8,
    flexDirection: 'column',
  },

  cardFooter: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Primary,
    paddingTop: Sizes.InnerFrame/2,
    paddingLeft: Sizes.InnerFrame,
  },

  cardText: {
    marginTop: Sizes.InnerFrame/2,
    color: Colors.Text,
    fontSize: Sizes.SmallText,
  },

  cardTitleText: {
    fontSize: Sizes.H2,
    fontWeight: '500'
  },

  date: {
    marginTop: 5
  },

  status: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5
  },

  icon: {
    marginTop: 8,
    marginRight: 3
  },

  right: {
    textAlign: 'right',
    paddingRight: 0,
    paddingLeft: 0
  },

  details: {
    fontSize: Sizes.SmallText,
    color: Colors.Text
  },

  excitement: {
    marginTop: Sizes.InnerFrame,
    justifyContent: 'flex-end'
  }

});
