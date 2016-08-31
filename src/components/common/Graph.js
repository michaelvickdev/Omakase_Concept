import React, {
  Component
} from 'react'
import {
  View, Text, Animated, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';


/**
  * Show a graph
  */
export default class Graph extends Component {
  constructor () {
    super()
    const width = {pts: 5, ast:50, reb:40}
    this.state = {
      pts: new Animated.Value(width.pts),
      ast: new Animated.Value(width.ast),
      reb: new Animated.Value(width.reb),
    }
  }

  handeleAnimation () {
    const timing = Animated.timing
    const width = {pts: 10, ast:20, reb:15}
    const indicators = ['pts', 'ast', 'reb']
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], {toValue: width[item]})
    })).start()
  }

  render () {
   const {pts, ast, reb, stl, blk, tov, min} = this.state

   return (
      <View style={styles.container}>
       {pts &&
          <Animated.View style={[styles.bar, styles.points, {width: pts}]} />
        }
        {ast &&
          <Animated.View style={[styles.bar, styles.assists, {width: ast}]} />
        }
        {reb &&
          <Animated.View style={[styles.bar, styles.rebounds, {width: reb}]} />
        }
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
