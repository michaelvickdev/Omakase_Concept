import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity, Alert
} from 'react-native';
import {
  Colors, Sizes, Styles
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'
import Database, {
  Firebase
} from '../../utils/Firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      location: null,
      budget: 0,
      party: [],
      size: 1,
      visible: false,
      stage: 0
    };

    this.ref = Database.ref(
      `bookings/${this.props.bookingId}`
    );
    this.locationRef = Database.ref(
      `locations/${this.props.bookingId}`
    );

    this.onPress = this.onPress.bind(this);
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

        // determine the current stage of booking
        // 0 - available
        // 1 - applied
        // 2 - selected
        // 3 - unavailable (selected other)
        if (booking) {
          if (
            booking.planner === Firebase.auth().currentUser.uid
          ) {
            this.setState({stage: 2});
          } else if (booking.planner) {
            this.setState({stage: 3});
          } else if (
            booking.interested
            && Object.keys(booking.interested).indexOf(
              Firebase.auth().currentUser.uid
            ) >= 0
          ) {
            this.setState({stage: 1});
          } else {
            this.setState({stage: 0});
          }
        }
      }
    });

    this.locationListener = this.locationRef.on('value', data => {
      console.log(data.val());
      data.exists() && this.setState({
        location: data.val()
      });
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
    this.locationRef.off('value', this.locationListener);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={this.onPress}>
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

                    // add extra person if not confirmed yet
                    this.state.size + (this.state.stage < 2 ? 1: 0)
                  )
                ).toFixed(0)}`}
              </Text>
              <Text style={[
                styles.details,
                styles.right
              ]}>
                per person
              </Text>
              <View style={styles.excitementContainer}>
                {
                  this.state.booking
                  && this.state.booking.excitement
                  && [...Array(this.state.booking.excitement)].map(i => (
                    <Icon
                      key={Math.random()}
                      name="directions-run" />
                  ))
                }
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.state.visible && (() => {
          switch(this.state.stage) {
            default: return (
              <BookingCardExpandedAvailable
                booking={this.state.booking}
                location={this.state.location}
                bookingId={this.props.bookingId}
                size={this.state.size} />
            );
          }
        })()}
      </View>
    );
  }

  onPress() {
    switch(this.state.stage) {
      case 1:
        Actions.plannerRequestDetail({bookingId: this.props.bookingId});
        break;
      case 2:
        Actions.plannerRequestDetail({bookingId: this.props.bookingId});
        break;
      case 3:
        break;
      default:
        this.setState({
          visible: !this.state.visible
        });
    }
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
    textAlign: 'right',
    paddingRight: 0,
    paddingLeft: 0
  },

  details: {
    fontSize: Sizes.SmallText
  },

  excitementContainer: {
    marginTop: Sizes.InnerFrame,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
