import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
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
            label="Date" />
          <DatePicker
            label="Time"
            type="time" />
          <SingleLineInput
            isBottom
            label="Occasion"
            subtitle="Tell us how we should plan your night" />

          <InputSectionHeader
            label="Party Details" />
          <NumberPicker
            isTop
            number={60}
            min={20}
            label="Price"
            subtitle="Per person (in CAD$)" />
          <NumberPicker
            number={2}
            min={1}
            label="# of People" />
          <SingleLineInput
            isBottom
            label="Dietary Restrictions & Allergies" />
        </View>
        <View style={styles.buttons}>
          <Button
            label=" " />
          <Button
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={Actions.clientPlannerChoice}
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
