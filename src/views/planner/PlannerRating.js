import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

//components

/**
  * Show the Rating of the planners
  */
export default class PlannerRating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Your Rating Level
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
})
