import React, {
    Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

/**
  * Show the Rating of the planners
  */
export default class PlannerRating extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Your Rating Level
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
})
