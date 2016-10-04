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
} from 'react-native-router-flux';
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
      booking: this.props.booking,
      location: this.props.location || {}
    };

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
      booking: nextProps.booking,
      location: nextProps.location || {}
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          scrollEnabled={false}
          region={{
            latitude: this.state.location.l && this.state.location.l[0] || 0,
            longitude: this.state.location.l && this.state.location.l[1] || 0,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.location.l && this.state.location.l[0] || 0,
              longitude: this.state.location.l && this.state.location.l[1] || 0,
            }}
            title={'Meet-up Location'}
            description={this.state.booking && this.state.booking.address}
            pinColor={Colors.Primary}
          />
        </MapView>
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
    alignSelf: 'stretch'
  },

  map: {
    alignSelf: 'stretch',
    height: 100
  }
});
