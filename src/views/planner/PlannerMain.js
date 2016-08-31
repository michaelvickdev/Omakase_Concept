import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, StatusBar, Platform, Picker
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
import NumberPicker from '../../components/common/NumberPicker';
import PickerField from '../../components/common/PickerField';

/**
 * Main screen for planners onlu
 * can toggle to ClientMain
 */
export default class PlannerMain extends Component {
  componentDidMount() {
    Platform.OS === 'ios' && StatusBar.setBarStyle('light-content', true);
    StatusBar.setHidden(false, 'slide');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
              Some kind of dashboard like thangs
          </Text>
        </View>
        <PickerField
          label="A PICKER"
          select={'key0'}
          pickerLabel={'lick me'}>
          <Picker.Item label="Kenneth" value="key0" />
          <Picker.Item label="Terrence" value="key1" />
          <Picker.Item label="Baller Kenneth" value="so smart" />
          <Picker.Item label="Baller Terrence" value="so right" />
        </PickerField>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.outerFrame
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
