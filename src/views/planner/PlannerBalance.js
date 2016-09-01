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
export default class PlannerBalance extends Component {
  constructor(props) {
    super(props);
    let items = [];
    let item = {};
    item.value = 38;
    item.label = 'Mon';
    items.push(item);
    let item2 = {};
    item2.value = 10;
    item2.label = 'Tue';
    items.push(item2);
    this.state = {
      items: items
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Graph style={styles.graph} items={this.state.items}/>
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
