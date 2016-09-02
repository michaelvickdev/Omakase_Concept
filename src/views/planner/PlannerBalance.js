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
    items.push({
      label: 'Sun',
      value: 189
    });
    items.push({
      label: 'Mon',
      value: 38
    });
    items.push({
      label: 'Tue',
      value: 10
    });
    items.push({
      label: 'Wed',
      value: 112
    });
    items.push({
      label: 'Thu',
      value: 43
    });
    items.push({
      label: 'Fri',
      value: 90
    });
    items.push({
      label: 'Sat',
      value: 170
    });

    this.state = {
      items: items
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={styles.text}>
            Recent Earnings
          </Text>
          <Graph style={styles.graph} items={this.state.items}/>
          <Text style={styles.text}>
            History
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

  subcontainer: {
    marginTop: Sizes.InnerFrame
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
