import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity, Alert
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import GroupAvatar from '../profile/GroupAvatar';
import BookingCardExpandedAvailable from './BookingCardExpandedAvailable';

/**
 * Creates an array of duplicated UID's based on party sizes.
 * Used for GroupAvatar generation.
 *
 * @param {number} props.booking.contributions.party
 */
export function expandOnParty(booking) {
  let expanded = [];
  let budget = 0;

  for (let uid of Object.keys(booking.contributions)) {
    if (
      booking.contributions[uid].confirmed

      // TODO: remove hack to allow the owner as auto-confirmed
      // to support legacy data without confirmed
      || booking.createdBy === uid
    ) {
      budget += booking.contributions[uid].budget;
      for (let i = 0; i < booking.contributions[uid].party; i++) {
        expanded.push(uid);
      }
    }
  }

  return [expanded, budget];
}

/**
 * Request Card Component for booking requests
 */
export default class BookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: null,
      budget: 0,
      party: [],
      size: 1,
      visible: false
    };

    this.ref = Database.ref(
      `bookings/${this.props.bookingId}`
    );
    this.join = this.join.bind(this);
  }

  join() {
    Alert.alert(
      'Confirm your Request to Attend',
      'You are committing to plan and attend this booking '
      + 'if you are selected by the sponsor.',
      [
        {
          text: 'Cancel'
        }, {
          text: 'Confirm',
          onPress: () => {

            // first the planner is technically a contributor
            this.ref.child(
              `contributions/${Firebase.auth().currentUser.uid}`
            ).set({
              budget: 0,
              party: 1
            });

            // now, tell sponsor that planner is interested
            this.ref.child(
              `interested/${Firebase.auth().currentUser.uid}`
            ).set(true);
          }
        }
      ]
    )
    this.ref.child('contributions')
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      if (data.exists()) {

        // total total contributions
        let booking = data.val();
        let [party, budget] = expandOnParty(booking);
        this.setState({
          booking: booking,
          budget: budget,
          party: party,
          size: party.length
        });
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  render() {

    // expanded view is different based on the current stage
    // only render if we have a booking loaded
    let expanded = null;
    if (this.state.booking) {

      // the viewer is the designed planner
      if (
        this.state.booking.planner === Firebase.auth().currentUser.uid
      ) {
        expanded = null;

      // the viewer is interested, but not yet accepted
      } else if (
        this.state.booking.interested
        && Object.keys(this.state.booking.interested).indexOf(
          Firebase.auth().currentUser.uid
        ) >= 0
      ) {
        expanded = null;

      // available to be interested in
      } else {
        expanded = (
          <BookingCardExpandedAvailable
            bookingId={this.props.bookingId}
            booking={this.state.booking}
            size={this.state.size} />
        );
      }
    }

    return (
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.setState({
            visible: !this.state.visible
          })}>
          <GroupAvatar
            limit={6}
            uids={
              this.state.party
            } />
          <View>
            <View style={styles.detailsContainer}>
              <Text style={[
                styles.budget,
                styles.right
              ]}>
                {`$${this.state.budget.toFixed(2)}`}
              </Text>
              <Text style={[
                styles.details,
                styles.right
              ]}>
                {`$${
                  (this.state.budget / (this.state.size + 1)).toFixed(2)
                }/person`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {this.state.visible && expanded}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Sizes.OuterFrame,
    marginBottom: Sizes.ItemSpacer
  },

  right: {
    textAlign: 'right'
  },

  details: {
    fontSize: Sizes.SmallText
  },

  budget: {
    fontSize: Sizes.H2,
    color: Colors.Text
  },
});
