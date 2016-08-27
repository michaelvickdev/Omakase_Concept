import React, {
  Component
} from 'react';
import {
  View, Text, ScrollView, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'

// components
import {
  Button
} from '../../components/common/Button';

/**
  * Show the lists of requests available to plan.
  * Each request can be clicked to see the PlannerRequestDetail.
  */
export default class PlannerRequestPool extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.childContainer}>
          <Button
            label={"Request # 1"}
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={Actions.plannerRequestDetail}/>
        </View>
        <View style={styles.childContainer}>
          <Button
            label={"Request # 2"}
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={Actions.plannerRequestDetail} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 70
  },

  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
