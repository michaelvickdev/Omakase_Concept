import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Alert
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes, Styles
} from '../../../res/Constants';

// components
import Button from '../../components/common/Button';
import DatePicker from '../../components/common/DatePicker';
import SingleLineInput from '../../components/common/SingleLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import NumberPicker from '../../components/common/NumberPicker';

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
    Alert.alert(
      'Please confirm this Booking',
      `You are authorizing $${this._price.val() * this._party.val()} `
      + `on your credit card for ${this._date.val().toLocaleDateString()}`
      + `, at ${this._time.val().toLocaleTimeString()} for a `
      + `party of ${this._party.val()}.`,
      [
        {
          text: 'I need to make changes'
        },
        {
          text: 'Confirm Booking',
          onPress: () => {
            Actions.clientPlannerChoice();
          }
        }
      ]
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <View style={styles.body}>
            <Text style={Styles.Header}>
              Book a new Event
            </Text>
            <Text style={Styles.BodyText}>
              Give us a little information about your event and
              we'll pair you up with a local event planner to figure
              out the rest.
            </Text>
          </View>
          <InputSectionHeader
            label="Schedule" />
          <DatePicker
            isTop
            ref={ref => this._date = ref}
            label="Date" />
          <DatePicker
            label="Time"
            ref={ref => this._time = ref}
            type="time" />
          <SingleLineInput
            isBottom
            label="Occasion"
            ref={ref => this._occasion = ref}
            subtitle="Tell us how we should plan your night" />

          <InputSectionHeader
            label="Party Details" />
          <NumberPicker
            isTop
            number={60}
            min={20}
            label="Price"
            ref={ref => this._price = ref}
            subtitle="Per person (in CAD$)" />
          <NumberPicker
            number={2}
            min={1}
            ref={ref => this._party = ref}
            label="# of People" />
          <SingleLineInput
            isBottom
            ref={ref => this._restrictions = ref}
            label="Dietary Restrictions & Allergies" />
        </View>
        <View style={styles.buttons}>
          <Button
            label=" " />
          <Button
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={this.submit}
            label="Book & View Assigned Planners" />
        </View>
      </View>
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
  }
});
