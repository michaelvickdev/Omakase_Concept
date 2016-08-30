import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, StatusBar, Platform
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import Button from '../../components/common/Button';
import SingleLineInput from '../../components/common/SingleLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import DatePicker from '../../components/common/DatePicker';
import BookingCard from '../../components/common/BookingCard';

/**
 * Main screen for general users (Client)
 * can toggle to Planners view for registered planners
 */
export default class ClientMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    };
  }

  componentDidMount() {
    Platform.OS === 'ios' && StatusBar.setBarStyle('light-content', true);
    StatusBar.setHidden(false, 'slide');
    // TODO: Retrieve actual bookings from server
    this.state.bookings = ['yep'];
  }

  renderBookings = () => {
    return (
      <View>
        <Text style={styles.text}>
          Your current bookings:
        </Text>
        <BookingCard />
        <BookingCard />
        <BookingCard booking={{
          ocassion: 'Lmao',
          requestedTime: 'October 13th, 1:30PM',
          description: 'Some stuff going on here.'
        }}/>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          { this.state.bookings
            ? this.renderBookings()
            : <Text style={styles.text}>
                You have no pending events
              </Text>
          }
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label={"New Event"}
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={Actions.clientCreate} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.outerFrame,
    backgroundColor: '#FAFAFA'
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: Sizes.text,
    color: Colors.Primary
  },

  buttonContainer: {
    paddingBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
