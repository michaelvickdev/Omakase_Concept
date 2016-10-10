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
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    Platform.OS === 'ios' && StatusBar.setBarStyle('light-content', true);
    StatusBar.setHidden(false, 'slide');
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
        let bookings = [];

        data.forEach(booking => {
          booking.child('city').exists
            && booking.child('city').val()
            && booking.child('city').val().name
            && bookings.push(booking)
          // headers are by statuses: 0 - selected, 1 - interested, 2 - general
        });

        // and finally, clone into DataSource
        this.setState({
          data: this.state.data.cloneWithRows(bookings)
        });
      }
    });
  }


  renderRow(booking) {
    return (
      <BookingCard booking={booking.val()} />
    );
  }

  renderBookings = () => {
    return (
      <View>
        <ListView
          enableEmptySections={true}
          initialListSize={0}
          scrollRenderAheadDistance={10}
          dataSource={this.state.data}
          renderRow={this.renderRow}
          scrollEnabled={true}
          removeClippedSubviews={true} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.container}>
            { this.state.data
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.Secondary
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: Sizes.outerFrame,
    backgroundColor: Colors.Secondary
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
    margin: Sizes.InnerFrame,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Secondary
  },
});
