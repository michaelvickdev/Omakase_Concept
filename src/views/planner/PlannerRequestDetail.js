import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import ParallaxView from 'react-native-parallax-view';

export default class PlannerRequestDetail extends Component {
  render() {
    return (
      <ParallaxView
        backgroundSource={require('../../../res/img/profile_bg.jpg')}
        windowHeight={300}
        header={(
          <View>
            <Text>{this.props.bookingId}</Text>
          </View>
        )}>
        <View>
          <Text>Hello</Text>
        </View>
      </ParallaxView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
