import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Alert, ScrollView, Image, Picker
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes, Styles, Strings
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';
import GeoFire from 'geofire';
import MapView from 'react-native-maps';

// components
import Button from '../../components/common/Button';
import DatePicker from '../../components/common/DatePicker';
import SingleLineInput from '../../components/common/SingleLineInput';
import MultiLineInput from '../../components/common/MultiLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import NumberPicker from '../../components/common/NumberPicker';
import SwitchInput from '../../components/common/SwitchInput';
import PickerField from '../../components/common/PickerField';
import SliderInput from '../../components/common/SliderInput';
import AutoCompleteInput from '../../components/common/AutoCompleteInput';

/**
 * First screen of creating an event
 * client to enter basic info:
 * date, # of people, time, area, budget, occasion
 */
export default class ClientCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      random: Math.random() ,
    };
    // bind methods
    this.submit = this.submit.bind(this);
  }

  submit() {
    let reqtime =(new Date(
      this._date.val().getUTCFullYear(),
      this._date.val().getUTCMonth(),
      this._date.val().getUTCDate()
    )).valueOf();

    if (this._address.val() && this._terms.val()){
      Alert.alert(
        'Please confirm this Booking',
        `You are authorizing $${this._price.val()} USD `
        + `on your credit card for your experience in `
        + `${this._city.val()} on ${this._date.val().toDateString()} `
        + `for a party of ${this._party.val()}. Your pick up location is `
        + `${this._address.val()}`,
        [
          {
            text: 'I need to make changes'
          },
          {
            text: 'Confirm Booking',
            onPress: () => {
              let msg = {
                createdBy: Firebase.auth().currentUser.uid,
                requestedTime: (new Date(
                  this._date.val().getUTCFullYear(),
                  this._date.val().getUTCMonth(),
                  this._date.val().getUTCDate()
                )).valueOf(),
                excitement: this._excitement.val(),
                space: this._space.val(),
            //    city: {
            //      name: this._city.val(),
          //        placeId: this._city.detail().place_id
          //      },
                address: this._address.val(),
                contributions: {
                  [Firebase.auth().currentUser.uid]: {
                    budget: this._price.val() * this._party.val(),
                    party: this._party.val(),
                  }
                }
              }
              console.log(JSON.stringify(msg));
              let bookingRef = Database.ref('bookings').push({
                createdBy: Firebase.auth().currentUser.uid,
                requestedTime: (new Date(
                  this._date.val().getUTCFullYear(),
                  this._date.val().getUTCMonth(),
                  this._date.val().getUTCDate()
                )).valueOf(),
                excitement: this._excitement.val(),
                space: this._space.val(),
                city: {
                  name: this._city.val(),
                  placeId: this._city.detail().place_id
                },
                address: this._address.val(),
                contributions: {
                  [Firebase.auth().currentUser.uid]: {
                    budget: this._price.val() * this._party.val(),
                    party: this._party.val(),
                  }
                }
              }, error => {
                if (!error){
                  let geoFire = new GeoFire(Database.ref('locations'));
                  geoFire.set(bookingRef.key, [
                      this._address.detail().geometry.location.lat,
                      this._address.detail().geometry.location.lng
                    ]).then(() => {
                    console.log("Provided keys have been added to GeoFire");
                  }, error => {
                    console.log("Error: " + error);
                  });

                  Actions.clientPlannerChoice();
                } else {
                  console.log("Request submission fail: ", error);
                }
              });
            }
          }
        ]
      );
    } else if (!this._terms.val()){
      Alert.alert(
        'Terms and Conditions',
        `Please review and accept the terms and conditions to `
        + `continue with your booking. `
      );
    } else {
      Alert.alert(
        'Oops!',
        `You did not select a pick up address where you would like `
        + `to meet your planner. Please enter the pick up address `
        + `to proceed with your booking.`
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.input}>
            <View style={styles.body}>
              <Text style={Styles.Header}>
                Book a New Experience
              </Text>
              <Text style={Styles.BodyText}>
                Let us know where you are heading and the dates and
                we'll pair you up with a local planner to figure
                out the rest.
              </Text>
            </View>
            <InputSectionHeader
              label="Itinerary" />
            {/*sample code to get city picture*/}
            {this._city && this._city.detail()
              && this._city.detail().photos ?
            <Image style={styles.primaryPhoto}
              source={{uri:
                Strings.googlePlaceURL + 'photo?maxwidth=800&photoreference=' +
                this._city.detail().photos[
                  Math.floor(this.state.random
                  *(this._city.detail().photos.length))
                ].photo_reference +
                '&key=' + Strings.googleApiKey}}/>
            :
            <View/>}
            <AutoCompleteInput
              isTop
              ref={ref => this._city = ref}
              label="Destination"
              type="(cities)"
              maxLength={30}
              onSelect={() => this.forceUpdate()}
              placeholder="Search City"/>
            <AutoCompleteInput
              ref={ref => this._address = ref}
              label="Pickup Address"
              defaultText="Enter"
              type="address"
              maxLength={25}
              onSelect={() => this.forceUpdate()}
              failCondition={!this._city || !this._city.detail()}
              conditionMsg={'Select your destination'}
              location={this._city && this._city.detail() ?
                this._city.detail().geometry.location.lat + ','
                + this._city.detail().geometry.location.lng : ''}
              placeholder="Enter the pickup address"/>

            {this._address && this._address.detail() && (
            <MapView
              style={styles.map}
              scrollEnabled={false}
              region={{
                latitude: this._address.detail().geometry.location.lat,
                longitude: this._address.detail().geometry.location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}>
              <MapView.Marker
                coordinate={{
                  latitude: this._address.detail().geometry.location.lat,
                  longitude: this._address.detail().geometry.location.lng,
                }}
                title={this._address.detail().name}
                pinColor={Colors.Primary}
              />
            </MapView>
            )}
            <DatePicker
              isBottom
              ref={ref => this._date = ref}
              label="Date" />

            <InputSectionHeader
              label="Party Details" />
            <NumberPicker
              isTop
              number={2}
              min={1}
              ref={ref => this._party = ref}
              label="# of People" />
            <NumberPicker
              number={100}
              min={50}
              interval={10}
              label="Budget"
              ref={ref => this._price = ref}
              subtitle="For the party (in USD$)" />
            <PickerField
              label="Language"
              ref={ref => this._language = ref}
              subtitle="Tell us what you are comfortable with"
              defaultVal="English">
              <Picker.Item label="English" value="English" />
              <Picker.Item label="French" value="French" />
              <Picker.Item label="Italian" value="Italian" />
              <Picker.Item label="Cantonese" value="Cantonese" />
              <Picker.Item label="Latin" value="Latin" />
            </PickerField>
            <NumberPicker
              number={2}
              min={1}
              ref={ref => this._space = ref}
              label="# of Guides"
              subtitle="How many guides are you expecting" />
            <SliderInput
              ref={ref => this._excitement = ref}
              values={['Peacful','Leisurely','Moderate'
                ,'Adventurous','Thrilled']}
              label="Excitement" />
            <MultiLineInput
              isBottom
              ref={ref => this._comments = ref}
              label="Additional Comments"
              subtitle="Anything else you would like to tell us?" />
            <InputSectionHeader
              label="Terms & Conditions" />
            <SwitchInput
              isTop
              isBottom
              ref={ref => this._terms = ref}
              label="I Accept"
              subtitle="http://omakase.com/tos" />
          </View>
          <View style={styles.buttons}>
            <Button
              label=" " />
            <Button
              color={Colors.Primary}
              fontColor={Colors.AlternateText}
              onPress={this.submit}
              label="Book & View Planners" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.Secondary
  },

  input: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  body: {
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
  },

  buttons: {
    padding: Sizes.InnerFrame,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },

  primaryPhoto: {
    width: Sizes.width,
    height: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Sizes.width,
    height: 200
  }
});
