import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ScrollView
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'

// components
import Button from '../../components/common/Button';

export default class Activity extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>

        </ScrollView>
        <Button
          squareBorders
          onPress={() => {
            this.props.select(this.props.activityId);
            Actions.pop({popNum: 3});
          }}
          style={styles.button}
          color={Colors.Green}
          fontColor={Colors.AlternateText}
          icon="check"
          label="Add to Itinerary" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.NearBlack
  },

  content: {
    flex: 1,
    alignSelf: 'stretch'
  },

  button: {
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
  }
});
