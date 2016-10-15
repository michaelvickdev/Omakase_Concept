import React, {
  Component
} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import Camera from 'react-native-camera';

export default class FirebaseCamera extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => this.camera = cam}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}>
          <View style={styles.upperContainer}></View>
          <View style={styles.lowerContainer}></View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },

  camera: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },

  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  lowerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
});
