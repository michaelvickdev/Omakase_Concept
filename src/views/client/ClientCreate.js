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

// components
import Button from '../../components/common/Button';
import DatePicker from '../../components/common/DatePicker';
import SingleLineInput from '../../components/common/SingleLineInput';
import MultiLineInput from '../../components/common/MultiLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import NumberPicker from '../../components/common/NumberPicker';
import SwitchInput from '../../components/common/SwitchInput';
import PickerField from '../../components/common/PickerField';
import AutoCompleteInput from '../../components/common/AutoCompleteInput';

/**
 * First screen of creating an event
 * client to enter basic info:
 * date, # of people, time, area, budget, occasion
 */
export default class ClientCreate extends Component {
  constructor(props){
    super(props);

    // bind methods
    this.submit = this.submit.bind(this);
  }



  submit() {
    let timeString = (this._time.val().getHours() % 12 || 12)+ ':'
      + this._time.val().getMinutes()
      + (this._time.val().getHours() > 11 ? ' PM' : ' AM');
    Alert.alert(
      'Please confirm this Booking',
      `You are authorizing $${this._price.val()} USD `
      + `on your credit card for your trip to `
      + `${this._city.val()} on ${this._date.val().toDateString()}`
      + `, beginning at ${timeString} for a `
      + `party of ${this._party.val()}. Your pick up location is `
      + `${this._address.val()}`,
      [
        {
          text: 'I need to make changes'
        },
        {
          text: 'Confirm Booking',
          onPress: () => {
            Database.ref('bookings').push({
              createdBy: Firebase.auth().currentUser.uid,
              requestedTime: (new Date(
                this._date.val().getUTCFullYear(),
                this._date.val().getUTCMonth(),
                this._date.val().getUTCDate(),
                this._time.val().getUTCHours(),
                this._time.val().getUTCMinutes()
              )).valueOf(),
              occasion: this._occasion.val(),
              contributions: {
                [Firebase.auth().currentUser.uid]: {
                  budget: this._price.val() * this._party.val(),
                  party: this._party.val(),
                  exceptions: ''
                }
              }
            }, error => Actions.clientPlannerChoice());
          }
        }
      ]
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.input}>
            <View style={styles.body}>
              <Text style={Styles.Header}>
                Book a New Trip
              </Text>
              <Text style={Styles.BodyText}>
                Let us know where you are heading and the dates and
                we'll pair you up with a local trip planner to figure
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
                Strings.googlePlacePhotoURL + '?maxwidth=800&photoreference=' +
                this._city.detail().photos[
                  Math.floor(Math.random()*(this._city.detail().photos.length))
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
            <DatePicker
              ref={ref => this._date = ref}
              label="Date" />
            <DatePicker
              label="Start Time"
              ref={ref => this._time = ref}
              type="time" />
            <AutoCompleteInput
              ref={ref => this._address = ref}
              label="Pickup Address"
              defaultText="Enter"
              type="address"
              maxLength={25}
              failCondition={!this._city || !this._city.detail()}
              conditionMsg={'Select your destination'}
              location={this._city && this._city.detail() ?
                this._city.detail().geometry.location.lat + ','
                + this._city.detail().geometry.location.lng : ''}
              placeholder="Enter the pickup address"/>
            <NumberPicker
              isBottom
              number={3}
              min={1}
              ref={ref => this._party = ref}
              label="Expected Duration"
              subtitle="How many hours?" />
            <InputSectionHeader
              label="Party Details" />
            <NumberPicker
              isTop
              number={100}
              min={50}
              interval={10}
              label="Budget"
              ref={ref => this._price = ref}
              subtitle="For the party (in USD$)" />
            <NumberPicker
              number={2}
              min={1}
              ref={ref => this._party = ref}
              label="# of People" />
            <PickerField
              label="Language"
              ref={ref => this._occasion = ref}
              subtitle="Tell us what you are comfortable with"
              defaultVal="English">
              <Picker.Item label="English" value="English" />
              <Picker.Item label="French" value="French" />
              <Picker.Item label="Italian" value="Italian" />
              <Picker.Item label="Cantonese" value="Cantonese" />
              <Picker.Item label="Latin" value="Latin" />
            </PickerField>
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
    flex: 1,
    width: 400,
    height: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
