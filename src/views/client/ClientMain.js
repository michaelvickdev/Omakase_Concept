import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, StatusBar, Platform
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import {
  Button
} from '../../components/common/Button';
import FacebookButton from '../../components/account/FacebookButton';
import SingleLineInput from '../../components/common/SingleLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import DatePicker from '../../components/common/DatePicker';

/**
 * Main screen for general users (Client)
 * can toggle to Planners view for registered planners
 */
export default class ClientMain extends Component {
  componentDidMount() {
    Platform.OS === 'ios' && StatusBar.setBarStyle('light-content', true);
    StatusBar.setHidden(false, 'slide');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
              You have no pending events
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <InputSectionHeader
            label="Testing Component" />
          <SingleLineInput
            label="Something"
            isTop={true} />
            <SingleLineInput
              label="message" />
              <SingleLineInput
                label="Something2" />
          <DatePicker
            label="Date"
            isBottom={true} />
          <Button
            label={"New Event"}
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={Actions.clientCreate} />
          <Button
            label={"Planners"}
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={Actions.plannerMain} />
          <FacebookButton />
        </View>
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
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
