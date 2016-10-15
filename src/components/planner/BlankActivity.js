import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import {
  styles
} from './Activity';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BlankActivity extends Component {
  render() {
    return (
      <View style={[
        styles.container,
        styles.thinContainer,
        blankStyles.container,
        this.props.style
      ]}>
        <View style={[
          styles.imageContainer,
          styles.thinImageContainer,
          blankStyles.imageContainer
        ]}>
          <Icon
            name="add-circle"
            size={70}
            color={Colors.LightText} />
        </View>
        <View style={blankStyles.textContainer}>
          <Text style={[
            styles.title,
            blankStyles.text
          ]}>
            Add a new activity to this itinerary
          </Text>
        </View>
      </View>
    );
  }
}

const blankStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Transparent,
    borderColor: Colors.LightText,
    borderStyle: 'dashed',
    borderWidth: 1
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: Sizes.InnerFrame
  },

  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: Colors.LightText
  }
})
