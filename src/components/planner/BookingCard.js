import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity, MapView,
  Alert
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
import InputField from '../common/InputField';
import InformationField from '../common/InformationField';
import Button from '../common/Button';

/**
 * Creates an array of duplicated UID's based on party sizes.
 * Used for GroupAvatar generation.
 *
 * @param {number} props.booking.contributions.party
 */
function expandOnParty(booking) {
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
        {this.state.visible && (
          <View style={styles.expandedContainer}>
            <MapView
              region={{
                latitude: 43.653226,
                longitude: -79.383184,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
              annotations={[
                {
                  latitude: 43.653226,
                  longitude: -79.383184,
                  title: 'Meet-up Location',
                  subtitle: '100 Queen St W',
                  tintColor: Colors.Primary,
                  animateDrop: true
                }
              ]}
              style={styles.map} />
            <InformationField
              label="Party Size"
              color={Colors.Transparent}
              info={`${this.state.size} (Ages 19-29)`} />

            <InformationField
              label="Looking for"
              color={Colors.Transparent}
              info={
                this.state.booking && this.state.booking.space > 1
                ? `${this.state.booking.space} people`
                : '1 person'
              } />
            <InformationField
              icon="record-voice-over"
              color={Colors.Transparent}
              info="English, Italian, and Cantonese" />
            <InformationField
              isBottom
              noMargin
              color={Colors.Transparent}
              icon="directions-run"
              info="Leisurely" />
            <Button
              squareBorders
              style={{
                paddingTop: Sizes.InnerFrame,
                paddingBottom: Sizes.InnerFrame
              }}
              color={Colors.Green}
              fontColor={Colors.AlternateText}
              icon="move-to-inbox"
              onPress={this.join}
              label="Request to Join" />
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
  },

  map: {
    width: Sizes.width,
    height: 200
  }
});
