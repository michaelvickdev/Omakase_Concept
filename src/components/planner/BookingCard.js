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
import InputField from '../common/InputField';
import Button from '../common/Button';

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
      budget: 0,
      party: 0,
      visible: false
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
          ).reduce((total, contribution) => total + contribution, 0),
          party: Object.keys(
            booking.contributions
          ).map(
            uid => booking.contributions[uid].party

          // party size starts at one due to planner included
          ).reduce((total, party) => total + party, 1)
        });
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  render() {
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
                {`$${
                  (this.state.budget / this.state.party).toFixed(2)
                }/person`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {this.state.visible && (
          <View style={styles.expandedContainer}>
            <InputField
              isTop
              icon="place"
              label="Meet-up Location"
              color={Colors.Transparent}
              field={
                <Text>Test</Text>
              } />
            <InputField
              color={Colors.Transparent}
              icon="directions-run"
              label="Excitement Level"
              field={
                <Text>Test</Text>
              } />
            <InputField
              isBottom
              noMargin
              icon="stars"
              label="Level Required"
              color={Colors.Transparent}
              field={
                <Text>Test</Text>
              } />
            <Button
              squareBorders
              style={{
                paddingTop: Sizes.InnerFrame,
                paddingBottom: Sizes.InnerFrame
              }}
              color={Colors.Green}
              fontColor={Colors.AlternateText}
              icon="airplanemode-active"
              label="test" />
          </View>
        )}
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
  },

  expandedContainer: {
  }
});
