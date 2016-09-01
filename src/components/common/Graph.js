import React, {
  Component
} from 'react'
import {
  View, Text, Animated, Easing, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Dimensions from 'Dimensions';

/**
  * Show a graph with a list of items as props
  * each of the item contains a label and a value attribute
  * max line will be 80 percent
  */
export default class Graph extends Component {
  constructor(props) {
    super(props)
    let width = {};
    let maxValue = 0;
    if (props.items) {
      props.items.map((item, key) => {
        width[key] = new Animated.Value(0);
        if (maxValue < item.value) {
          maxValue = item.value;
        }
      });
    }
    let scale = 0.8 * (Dimensions.get('window').width
      - Sizes.InnerFrame*2 - 40) / maxValue;

    this.state = {
      items: props.items,
      width: width,
      scale: scale
    }
  }

  handeleAnimation() {
    const timing = Animated.timing
    if (this.state.items){
      Animated.parallel(this.state.items.map((item, key) => {
        return timing(this.state.width[key], {
          toValue: item.value * this.state.scale,
          easing: Easing.elastic(1),
          duration: 1000
        })
      })).start()
    }``
  }

  render() {
    let barViews = [];
    if (this.state.items){
      this.state.items.map((item, key) => {
        barViews.push(
          <View style={styles.rowWrapper} key={key}>
            <Animated.View
              style={[styles.bar, {width: this.state.width[key]}]}/>
            <Text>
              {'$' + item.value}
            </Text>
            <Text style={styles.labelText}>
              {item.label}
            </Text>
          </View>
        )
      })
    }
    this.handeleAnimation ();
    return(
      <View style={styles.container}>
        {barViews}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.InnerFrame
  },

  bar: {
    height: 20,
    backgroundColor: Colors.Primary,
    marginBottom: 5,
    marginLeft: 35,
    marginRight: 5
  },

  rowWrapper: {
    flex: 0.8,
    flexDirection: 'row',
  },

  labelText: {
    left: 0,
    position: 'absolute',
    fontStyle: 'italic'
  }
})
