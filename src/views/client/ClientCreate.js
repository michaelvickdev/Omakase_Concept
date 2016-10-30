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
  Colors, Sizes, Styles, Strings, Lists
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';
import GeoFire from 'geofire';
import MapView from 'react-native-maps';

// components
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
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
import MultiPicker from '../../components/common/MultiPicker';
import OutlineText from '../../components/common/OutlineText';
import CloseFullscreenButton from '../../components/common/CloseFullscreenButton';


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
      city: props.city,
      destination: props.city.detail
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

    let validDate = reqtime > (new Date()).getMilliseconds();

    if (this._address.val() && this._terms.val() && validDate){
      Alert.alert(
        'Please confirm this Booking',
        `You are authorizing $${this._price.val()} USD `
        + `on your credit card for your experience in `
        + `${this.state.city.name} on ${this._date.val().toDateString()} `
        + `for a party of ${this._party.val()}. Your pick up location is `
        + `${this._address.val()}`,
        [
          {
            text: 'I need to make changes'
          },
          {
            text: 'Confirm Booking',
            onPress: () => {
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
                  name: this.state.city.name,
                  placeId: this.state.city.detail.place_id
                },
                address: {
                  name: this._address.val(),
                  placeId: this._address.detail().place_id
                },
                contributions: {
                  [Firebase.auth().currentUser.uid]: {
                    budget: this._price.val() * this._party.val(),
                    party: this._party.val(),
                  }
                }
              }, error => Actions.clientPlannerChoice());
              let geoFire = new GeoFire(Database.ref('locations'));
              geoFire.set(bookingRef.key, [
                  this._address.detail().geometry.location.lat,
                  this._address.detail().geometry.location.lng
                ]).then(() => {
                console.log("Provided keys have been added to GeoFire");
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
    } else if (!validDate){
      Alert.alert(
        'Invalid Date',
        `Please double check your booking date. `
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
      <View style={styles.wrapper}>
      <ParallaxScrollView
        parallaxHeaderHeight={Sizes.height * 0.4}
        fadeOutForeground={false}
        contentBackgroundColor={Colors.Background}
        renderBackground={() => (
          this.state.city && this.state.city.detail
            && this.state.city.detail.photos ?
          <Image style={styles.primaryPhoto}
            source={{uri:
              Strings.googlePlaceURL + 'photo?maxwidth=800&photoreference=' +
              this.state.city.detail.photos[
                Math.floor(this.state.random
                *(this.state.city.detail.photos.length))
              ].photo_reference +
              '&key=' + Strings.googleApiKey}}/>
          :
          <View/>
        )}
        renderForeground={() => (
          <LinearGradient
            colors={[
              Colors.Transparent,
              Colors.Transparent,
              Colors.Background,
            ]}
            style={styles.overlay}>
            <OutlineText
              style={styles.location}
              text={this.state.city.name} />
          </LinearGradient>
        )}>
        <View style={styles.container}>
          <View style={styles.input}>
            <View style={styles.body}>
              <Text style={Styles.Header}>
                Book a New Experience
              </Text>
              <Text style={Styles.BodyText}>
                Let us know when and where to pick you up,
                we'll pair you up with a local planner to figure
                out the rest.
              </Text>
            </View>
            <InputSectionHeader
              label="Adventure Criteria" />
            {/*sample code to get city picture*/}

            <MapView
              style={styles.map}
              scrollEnabled={false}
              region={{
                latitude: this.state.destination.geometry.location.lat,
                longitude: this.state.destination.geometry.location.lng,
                latitudeDelta: this._address && this._address.detail()
                  ? 0.01 : 0.1,
                longitudeDelta: this._address && this._address.detail()
                  ? 0.01 : 0.1
              }}>
              {this._address && this._address.detail() && (
              <MapView.Marker
                coordinate={{
                  latitude: this.state.destination.geometry.location.lat,
                  longitude: this.state.destination.geometry.location.lng,
                }}
                pinColor={Colors.Primary}
              />
              )}
            </MapView>

            <AutoCompleteInput
              isTop
              ref={ref => this._address = ref}
              label="Pickup Address"
              defaultText="Enter"
              type="address"
              maxLength={25}
              onSelect={() => {
                this.setState({
                  destination: this._address.detail(),
                })
            //    this.forceUpdate()
              }}
              failCondition={!this.state.city || !this.state.city.detail}
              conditionMsg={'Select your destination'}
              location={this.state.city && this.state.city.detail ?
                this.state.city.detail.geometry.location.lat + ','
                + this.state.city.detail.geometry.location.lng : ''}
              placeholder="Enter the pickup address"/>
            <DatePicker
              delta = {1}
              ref={ref => this._date = ref}
              label="Adventure Date" />
            <SliderInput
              ref={ref => this._excitement = ref}
              values={['Peacful','Leisurely','Moderate'
                ,'Adventurous','Thrilled']}
              label="Excitement" />
            <NumberPicker
              isBottom
              label="# of guides"
              number={1}
              suffix={"Frrands"}
              suffixSingular={"Frrand"}
              min={1}
              ref={ref => this._space = ref} />


            <InputSectionHeader
              label="Party Details" />
            <NumberPicker
              isTop
              label="Budget per person"
              number={100}
              prefix={"$"}
              suffix={"USD"}
              min={50}
              interval={10}
              ref={ref => this._price = ref} />
            <NumberPicker
              label="# of participants"
              number={2}
              suffix={"Persons"}
              suffixSingular={"Person"}
              min={1}
              ref={ref => this._party = ref} />
            <MultiPicker
              label="Language"
              defaultVal="English"
              ref={ref => this._language = ref}
              subtitle="What do you prefer?"
              options={Lists.Language}/>
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
              fontColor={Colors.Text}
              onPress={this.submit}
              label="Book & View Planners" />
          </View>
        </View>
      </ParallaxScrollView>
      <CloseFullscreenButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    height: Sizes.height * 0.4,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  overlay:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  map: {
    alignSelf: 'stretch',
    height: Sizes.height * 0.35
  },

  location: {
    margin: Sizes.InnerFrame,
    alignSelf: 'flex-start'
  }
});
