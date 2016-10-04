import React, {
  Component
} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Excitement extends Component {
  render() {
    return (
      <View style={[
        styles.container,
        this.props.style
      ]}>
        {
          [...Array(this.props.level)].map(i => (
            <Icon
              key={Math.random()}
              name="directions-run" />
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});
