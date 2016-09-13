import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, StatusBar, Platform, ScrollView
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
    this.setState({bookings: [{
      bookingId: '1234',
      createdBy: 'bookerUserId',
      planner: null,
      requestedTime: 1472515800581,
      occasion: 'tinder date',
      finalized: true,
      confirmed: false,
      contributions: {
        budget: 120.135,
        party: 3,
        exceptions: 'fully cooked beef, no cheese, no red stuff'
      }
    }]});
  }

  renderBookings = () => {
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>
            Your Bookings:
          </Text>
        </View>
        <BookingCard />
        {this.state.bookings.map(data => {
          return (<BookingCard key={data.bookingId} booking={data}/>)
        })}
      </View>
    );
  }

  render() {
    return (<ScrollView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          { this.state.bookings
            ? this.renderBookings()
            : <Text style={styles.text}>
                You have no pending events
              </Text>
          }
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label={"New Event"}
          color={Colors.Primary}
          fontColor={Colors.AlternateText}
          onPress={Actions.clientCreate} />
      </View>
    </ScrollView>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: Sizes.outerFrame,
    backgroundColor: '#FAFAFA'
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  titleContainer: {
    alignItems: 'center',
    padding: Sizes.InnerFrame
  },

  text: {
    fontSize: Sizes.text,
    color: Colors.Primary
  },

  buttonContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
