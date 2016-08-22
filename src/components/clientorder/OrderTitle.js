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
      <View style={styles.titlecontainer}>
        <Text style={styles.text}>
          Personalized Order
        </Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  titlecontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 80
  },
  text: {
    textAlign: 'center',
    fontSize: Sizes.H1,
    color: Colors.Primary
  }
});
