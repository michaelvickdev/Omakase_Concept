import React, {
  Component
} from 'react'
import {
  View, Text, Animated, Easing, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';


/**
  * Show a graph
  */
export default class Graph extends Component {
  constructor(props) {
    super(props)
    let width = {};
    if (props.items) {
      props.items.map((item, key) => {
        width[key] = new Animated.Value(0);
      });
    }
    this.state = {
      items: props.items,
      width: width
    }
  }

  handeleAnimation() {
    const timing = Animated.timing
    if (this.state.items){
      Animated.parallel(this.state.items.map((item, key) => {
        return timing(this.state.width[key], {
          toValue: item.width,
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
          <Animated.View
            style={[styles.bar, {width: this.state.width[key]}]}
            key={key}/>
        )
      })
    }
    this.handeleAnimation ();
    return(
      <View style={styles.container}>
        {barViews}
        <Text onPress={this.handeleAnimation.bind(this)}>Button</Text>
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
    marginBottom: 5
  }
})
