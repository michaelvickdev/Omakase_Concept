import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';


export default class OrderTitle extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Personalized Order
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
    padding: Sizes.outerFrame
  },
  text: {
    fontSize: Sizes.h1,
    color: Colors.Primary
  }
});
