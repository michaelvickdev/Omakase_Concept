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
import Graph from '../../components/common/Graph'

/**
  * Show the Rating of the planners
  */
export default class PlannerRating extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Graph style={styles.graph}/>
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

  graph: {
    alignSelf: 'flex-start'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
})
