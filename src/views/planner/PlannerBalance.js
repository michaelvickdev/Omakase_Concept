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

    let totalEarnings = 0;
    items.map(item => {
      totalEarnings += item.value;
    });

    this.state = {
      items: items,
      totalEarnings: totalEarnings
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={styles.text}>
            This week
          </Text>
          <Graph style={styles.graph} items={this.state.items}/>
          <View style={[styles.rowContainer, styles.earningContainer]}>
            <Text style={[styles.text]}>
              {'earnings: '}
            </Text>
            <Text style={[styles.text, styles.earningText]}>
              {'$' + this.state.totalEarnings}
            </Text>
          </View>
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

  rowContainer: {
    flexDirection: 'row',
  },

  earningContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: Sizes.InnerFrame
  },

  earningText: {
    fontSize: Sizes.H1,
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
})
