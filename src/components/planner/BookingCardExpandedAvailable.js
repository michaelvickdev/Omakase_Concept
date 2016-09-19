import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Alert
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
import MapView from 'react-native-maps';

// components
import InformationField from '../common/InformationField';
import Button from '../common/Button';

/**
 * Request Card Component for booking requests
 */
export default class BookingCardExpandedAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.booking
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
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      booking: nextProps.booking
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          scrollEnabled={false}
          region={{
            latitude: 43.653226,
            longitude: -79.383184,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}>
          <MapView.Marker
            coordinate={{
              latitude: 43.653226,
              longitude: -79.383184,
            }}
            title={'Meet-up Location'}
            description={'100 Queen St W'}
            pinColor={Colors.Primary}
          />
        </MapView>
        <InformationField
          label="Party Size"
          color={Colors.Transparent}
          info={`${this.props.size} (Ages 19-29)`} />

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },

  map: {
    width: Sizes.width,
    height: 200
  }
});
