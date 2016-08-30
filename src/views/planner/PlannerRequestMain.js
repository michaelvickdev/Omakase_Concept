import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'

// components
import Button from '../../components/common/Button';
import InputSectionHeader from '../../components/common/InputSectionHeader';

/** Shows all kinds of request for planners including
  * Accepted, Unfinished and Finished
  */

export default class PlannerRequestMain extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.topContainer}>
          <ScrollView contentContainerStyle={styles.childContainer}>
            <InputSectionHeader
              label={"Deadline "} />
          </ScrollView>
          <ScrollView contentContainerStyle={styles.childContainer}>
            <InputSectionHeader
              label={"Accepted"} />
          </ScrollView>
          <ScrollView contentContainerStyle={styles.childContainer}>
            <InputSectionHeader
              label={"Finished"} />
          </ScrollView>
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Browse Requests"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.H2}
            onPress={Actions.plannerRequestDetail} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 70
  },

  topContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },

  botContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  childContainer: {
    padding: 10,
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
