import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight, Image
} from 'react-native';
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
        status: 'Pending'
      });
    }
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardContent}>
            <Text style={[styles.cardText, styles.cardTitleText]}>
              {this.state.status}
            </Text>
            <Text style={[styles.cardText, styles.cardTitleText]}>
              {this.state.booking.date}
            </Text>
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
                  {this.state.booking.address}
                </Text>
              </View>
            </View>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 0.9,
    width: Sizes.width,
    backgroundColor: Colors.Foreground,
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    marginBottom: Sizes.ItemSpacer
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
