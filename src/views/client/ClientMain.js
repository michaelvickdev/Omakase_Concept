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
import Photo from '../../components/common/Photo';
import SingleLineInput from '../../components/common/SingleLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import DatePicker from '../../components/common/DatePicker';
import BookingCard from '../../components/client/BookingCard';
import BookingCardHeader from '../../components/client/BookingCardHeader';
import AutoCompleteModal from '../../components/common/AutoCompleteModal';


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
      data: new ListView.DataSource(lvClosures)
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
        let rows = [];
        let blob = {};
        let sections = [];

        data.forEach(booking => {

          // put in blob
          if (booking.child('city').exists
            && booking.child('city').val()
            && booking.child('city').val().placeId){

            let placeId = booking.child('city').val().placeId;
            let bookingId = booking.key;
            if (sections.indexOf(placeId) < 0){
              console.log("new section,", placeId);
              sections.push(placeId);
              rows.push([]);
              blob[placeId] = booking.child('city').val();
            }
            console.log("sections.indexOf(placeId),", sections.indexOf(placeId));
            console.log("bookingId,", bookingId);

            rows[sections.indexOf(placeId)]
              .push(bookingId);
            blob[`${placeId}:${bookingId}`] = booking;
          }
        });


        // and finally, clone into DataSource
        this.setState({
    //      data: this.state.data.cloneWithRows(bookings)
          data: this.state.data.cloneWithRowsAndSections(blob, sections, rows)
        });
      }
    });
  }

  renderSectionHeader(city) {
    return (
  //    <View/>
      <BookingCardHeader city={city} />
    );
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
          renderSectionHeader={this.renderSectionHeader}
          scrollEnabled={true}
          removeClippedSubviews={true}/>
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
              label={"Plan a new experience"}
              color={Colors.Primary}
              fontColor={Colors.Text}
              onPress={() => {
                this._modal && this._modal.show()
              }} />
          </View>
          <Photo
            style={styles.upsell}
            photoId='upsell'>
            <View style={styles.upsellContainer}>
              <View>
                <Text style={styles.upsellTitle}>
                  Try the other side
                </Text>
                <Text style={styles.upsellText}>
                  Be a great host for your city and plan for someone's adventure
                </Text>
              </View>
            </View>
            <Button
              onPress={Actions.plannerMain}
              style={styles.upsellButton}
              size={14}
              label='Become a host'
              color={Colors.Primary}
              fontColor={Colors.Text} />
          </Photo>
        </ScrollView>
        <AutoCompleteModal
          ref={ref => this._modal = ref}
          onSelect={() => {
            Actions.clientCreate({
              city: {
                name: this._modal.val(),
                detail: this._modal.detail()
              }
            })
          }}
          placeholder="Which city are you heading to?"
          type="(cities)"
          alwaysClear
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center'
  },

  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // padding: Sizes.outerFrame,
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
    marginTop: Sizes.InnerFrame,
    padding: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Primary
  },

  upsell: {
    padding: Sizes.OuterFrame,
    marginTop: Sizes.OuterFrame,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    height: 200
  },

  upsellContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },

  upsellTitle: {
    backgroundColor: Colors.Transparent,
    color: Colors.Text,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Sizes.InnerFrame / 3
  },

  upsellText: {
    width: 200,
    backgroundColor: Colors.Transparent,
    color: Colors.Text
  },

  upsellButton: {
    alignSelf: 'stretch'
  }
});
