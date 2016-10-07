import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, StatusBar, Platform, ScrollView, ListView
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import Button from '../../components/common/Button';
import SingleLineInput from '../../components/common/SingleLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import DatePicker from '../../components/common/DatePicker';
import BookingCard from '../../components/client/BookingCard';

// a collection of closures to build a new ListView
let lvClosures = {
  getSectionData: (data, section) => data[section],
  getRowData: (data, section, row) => data[`${section}:${row}`],
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (r1, r2) => r1 !== r2
}

/**
 * Main screen for general users (Client)
 * can toggle to Planners view for registered planners
 */
export default class ClientMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      data: new ListView.DataSource(lvClosures)
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
    this.init();
  }

  componentWillUnmount() {
    this.db && this.db.off('value', this.listener);
  }

  init() {

    // perform reset if previously initialized
    this.listener && this.componentWillUnmount();

    // setup new filters
    this.db = Database
      .ref('bookings')
      .orderByChild('createdBy')
      .equalTo(Firebase.auth().currentUser.uid);

    // and listener
    this.listener = this.db.on('value', data => {
      if (data.exists()) {
        let rows = [[], [], []];
        let blob = {
          0: 'Matched',
          1: 'Pending',
          2: 'Open'
        };

        data.forEach(booking => {
          console.log("booking: ", booking.child('city').exists
            && booking.child('city').val());
          // headers are by statuses: 0 - selected, 1 - interested, 2 - general
          let section = 2;
          if (
            booking.child('planner').exists()
          ) {
            section = 0;
          } else if (
            booking.child('interested').hasChildren()
          ) {
            section = 1;
          }

          // put in blob
          rows[section].push(booking.key);
          blob[`${section}:${booking.key}`] = booking.key;
        });

        // and finally, clone into DataSource
        this.setState({
          data: this.state.data.cloneWithRowsAndSections(blob, [0, 1, 2], rows)
        });
      }
    });
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
