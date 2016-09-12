import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'
import Database from '../../utils/Firebase';

// components
import GroupAvatar from '../profile/GroupAvatar';

/**
 * Creates an array of duplicated UID's based on party sizes.
 * Used for GroupAvatar generation.
 *
 * @param {number} props.contributions.party
 */
function expandOnParty(contributions) {
  let expanded = [];
  for (let uid of Object.keys(contributions)) {
    for (let i = 0; i < contributions[uid].party; i++) {
      expanded.push(uid);
    }
  }
  return expanded;
}

/**
 * Request Card Component for booking requests
 */
export default class BookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: null,
      budget: 0
    };

    this.ref = Database.ref(
      `bookings/${this.props.bookingId}`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      if (data.exists()) {

        // total total contributions
        let booking = data.val();
        this.setState({
          booking: booking,
          budget: Object.keys(
            booking.contributions
          ).map(
            uid => booking.contributions[uid].budget
          ).reduce((total, contribution) => total + contribution, 0)
        });
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          Actions.plannerRequestDetail({booking:this.state.booking})}>
        <GroupAvatar
          limit={3}
          uids={
            this.state.booking && expandOnParty(
              this.state.booking.contributions
            )
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
              {
                this.state.booking && new Date(
                  this.state.booking.requestedTime
                ).toLocaleDateString()
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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

  detailsContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
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
  }
});
