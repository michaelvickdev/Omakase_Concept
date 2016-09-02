import React, {
  Component
} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
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
      totalEarnings: totalEarnings,
      totalPlans: 12,
      accuPlans: 53,
      lifetimeEarnings: 1938
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={[styles.titleContainer]}>
            <TouchableOpacity style={styles.titleButton}>
              <Text style={[styles.text, styles.titleText]}>
                {'<'}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.text, styles.titleText]}>
              This week
            </Text>
            <TouchableOpacity style={styles.titleButton}>
              <Text style={[styles.text, styles.titleText]}>
                {'>'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.graph}>
            <Graph items={this.state.items}/>
          </View>
          <View style={[styles.rowContainer, styles.earningContainer]}>
            <Text style={[styles.text, styles.titleText]}>
              {'earnings: '}
            </Text>
            <Text style={[styles.titleText, styles.valueText]}>
              {'$' + this.state.totalEarnings}
            </Text>
          </View>
        </View>
          <View style={styles.subcontainer}>
            <View style={[ styles.rowContainer]}>
              <Text style={styles.text}>
                {'Plans made this week: '}
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {this.state.totalPlans}
              </Text>
            </View>
            <View style={[styles.rowContainer]}>
              <Text style={styles.text}>
                {'Total plans made: '}
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {this.state.accuPlans}
              </Text>
            </View>
            <View style={[styles.rowContainer]}>
              <Text style={styles.text}>
                {'Lifetime earnings: '}
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {'$' + this.state.lifetimeEarnings.toFixed(2)}
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
    padding: Sizes.InnerFrame
  },

  graph: {
    marginTop: Sizes.InnerFrame,
    marginBottom: Sizes.InnerFrame,
    alignSelf: 'flex-start'
  },

  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },

  titleButton:{
    marginLeft: Sizes.OuterFrame*2,
    marginRight: Sizes.OuterFrame*2
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: Sizes.InnerFrame,
  },

  earningContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: Sizes.InnerFrame
  },

  earningText: {
    fontSize: Sizes.H1,
    color: Colors.Primary,
    fontWeight: '500',
  },

  titleText: {
    textAlign: 'center',
    color: Colors.Primary,
  },

  text: {
    fontSize: Sizes.H2,
    color: Colors.Text
  },

  valueText: {
    fontSize: Sizes.H1,
    fontWeight: '500',
  }

})
